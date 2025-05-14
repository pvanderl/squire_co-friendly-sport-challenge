import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChallengeService } from '../services/challenge.service';
import { Challenge } from '../models';

@Component({
  selector: 'fsc-add-activity',
  imports: [],
  templateUrl: './add-activity.component.html',
  styleUrl: './add-activity.component.scss'
})
export class AddActivityComponent implements OnInit {
  protected challenge?: Challenge;


  constructor(
    private readonly route: ActivatedRoute,
    private readonly challengeService : ChallengeService,
  ) {

  }

  ngOnInit(): void {
    // get token parameter from route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        return;
      }
      this.challengeService.getChallenge(id).subscribe({
        next: (challenge) => {
          this.challenge = challenge;
        },
        error: (error) => {
          // todo: Handle the error here
        }
      });
    });
  }
}
