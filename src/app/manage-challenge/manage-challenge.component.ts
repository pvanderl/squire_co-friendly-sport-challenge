import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { collection, collectionData, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Challenge, Participant, PATH_CHALLENGE, PATH_MEMBERS } from '../models';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'fsc-manage-challenge',
  imports: [
    MatTableModule,
    DatePipe
  ],
  templateUrl: './manage-challenge.component.html',
  standalone: true,
  styleUrl: './manage-challenge.component.scss'
})
export class ManageChallengeComponent implements OnInit {


  firestore: Firestore = inject(Firestore);

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
    // get participants from firestore
    collectionData(collection(this.firestore, PATH_CHALLENGE, id, PATH_MEMBERS)).subscribe({
      next: (participants: any) => {
        this.participants = participants as Participant[];
      }
    })
  }
}
