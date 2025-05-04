import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addDoc, collection, collectionData, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Challenge, Participant, PATH_CHALLENGE, PATH_MEMBERS } from '../models';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { map } from 'rxjs';

@Component({
  selector: 'fsc-manage-challenge',
  imports: [
    MatTableModule,
    DatePipe,
    MatIconModule,
    MatMiniFabButton
  ],
  templateUrl: './manage-challenge.component.html',
  standalone: true,
  styleUrl: './manage-challenge.component.scss'
})
export class ManageChallengeComponent implements OnInit {


  firestore: Firestore = inject(Firestore);
  readonly dialog = inject(MatDialog);

  challenge?: Challenge;
  participants: Participant[] = [];
  displayedColumns: Iterable<string> = ['name', 'vo2max'];

  constructor(
    private readonly route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    // get token parameter from route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        return;
      }
      this.getChallenge(id).then();
    });
  }

  private async getChallenge(id: string) {
    // get challenge from firestore
    const docRef = doc(this.firestore, PATH_CHALLENGE, id);
    this.challenge = (await getDoc(docRef)).data() as Challenge;
    if (!this.challenge) {
      return;
    }
    this.challenge.uid = id;
    // get participants from firestore
    collectionData(collection(this.firestore, PATH_CHALLENGE, id, PATH_MEMBERS))
      .pipe(
        map((data: any) => data as Participant[]),
        // Sort by name
        map((participants: Participant[]) => participants.sort((a, b) => a.name.localeCompare(b.name))),
      )
      .subscribe({
      next: (participants: any) => {
        this.participants = participants as Participant[];
      }
    })
  }

  openDialog() {

    const dialogRef = this.dialog.open(AddParticipantComponent);

    dialogRef.afterClosed().subscribe((participant: undefined | Participant) => {
      if (participant !== undefined) {
        addDoc(collection(this.firestore, PATH_CHALLENGE, this.challenge?.uid!, PATH_MEMBERS), {
          name: participant.name,
          vo2max: +participant.vo2max,
        });
      }
    });
  }
}
