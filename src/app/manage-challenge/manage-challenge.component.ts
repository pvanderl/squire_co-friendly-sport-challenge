import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'fsc-manage-challenge',
  imports: [],
  templateUrl: './manage-challenge.component.html',
  styleUrl: './manage-challenge.component.scss'
})
export class ManageChallengeComponent implements OnInit {


  firestore: Firestore = inject(Firestore);

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
      this.getChallenge(id);
    });
  }

  private getChallenge(id: string) {

  }
}
