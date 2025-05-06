import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Activity, Participant, PATH_ACTIVITIES, PATH_CHALLENGE, PATH_MEMBERS, PATH_WEEKS } from '../models';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { firstValueFrom, map, Observable } from 'rxjs';
import { MatProgressBar, ProgressBarMode } from '@angular/material/progress-bar';
import { getWeekNumber } from '../utils/date';
import { ChallengeService } from '../services/challenge.service';

@Component({
  selector: 'fsc-upload',
  imports: [
    MatButton,
    MatProgressBar
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  file: File | null = null;

  fileLines: string[] = [];

  entries: Activity[] = [];
  challengeUid = '0JXXQf3kuKwQYZhNpxH3';

  onFileSelected($event: any) {
    this.file = $event.target.files[0];
    let reader: FileReader = new FileReader();
    reader.readAsText(this.file!);
    reader.onload = (e) => {
      this.fileLines = (reader.result as string).split('\n');
      // remove the first line
      this.fileLines.shift();
      // change all the comas to dots in the double quotes and remove the quotes
      this.fileLines = this.fileLines.map(line => {
        return line.replace(/"(.*?)"/g, (match, p1) => {
          return p1.replace(/,/g, '.');
        });
      });
      // print each line
      for (let line of this.fileLines) {
        console.log(line);
      }
      this.createEntries().then();
    }
  }

  /*
  0 = upload
  1 = parsing
  2 = uploading
   */
  step: number = 0;
  done: number = 0;

  /*
  0  Horodateur
  1  Bébou
  2  Sport
  3  Durée de l'activité
  4  Date différente d'aujourd'hui?
  5  Nom de l'activité
  6  METs de l'activité
  7  Intensité moyenne
  8  Distance parcourue (km)
  // when extract from page 2
  9  Date
  10 Facteur B
  11 Vitesse
  12 MET
  13 min MET
  14 max MET
  15 Points
   */

  private async createEntries() {
    this.step = 1;
    this.done = 0;
    // load memberUid from the DB
    const participants = await this.loadParticipants();
    console.log(participants);
    const participantMap = new Map<string, string>();
    for (let participant of participants) {
      participantMap.set(participant.name, participant.uid);
    }
    for (let line of this.fileLines) {
      const columns = line.split(',');
      let date;
      if (columns[4] !== '') {
        date = columns[4];
      } else {
        date = columns[0];
      }
      let dateParts = date.split('/');
      date = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));

      const selection = [columns[2]];
      if (columns[2] === 'Autre') {
        selection.push(columns[5]);
      }
      // 0:40:55
      const time = columns[3].split(':');
      const duration = parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2]);
      const participantUid = participantMap.get(columns[1]) ?? 'undefined';
      const entry: Activity = {
        selection: selection,
        date: date,
        duration: duration,
        points: parseFloat(columns[15]),
        participantUid: participantUid,
      };
      this.entries.push(entry);
      this.done++;
    }
    this.addEntriesToDB();
  }


  firestore: Firestore = inject(Firestore);
  progressBarMode: ProgressBarMode = 'determinate';
  async loadParticipants() {
      return await firstValueFrom(collectionData(
        collection(this.firestore, PATH_CHALLENGE, this.challengeUid, PATH_MEMBERS),
        { idField: 'uid' }
      )
      .pipe(
        map((data: any) => data as Participant[]),
        // Sort by name
        map((participants: Participant[]) => participants.sort((a, b) => a.name.localeCompare(b.name))),
      ));
  }

  challengeService: ChallengeService = inject(ChallengeService);
  private async addEntriesToDB() {
    this.step = 2;
    this.done = 0;
    for (let entry of this.entries) {
      this.challengeService.addActivityToDB(this.challengeUid, entry).then(() => {
        this.done++;
      });
    }
  }

  getWeekId(date: Date): string {
    const weekNumber = getWeekNumber(date);
    return date.getFullYear() + '-' + weekNumber;
  }
}
