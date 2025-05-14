import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Activity, Challenge, Participant, PATH_ACTIVITIES, PATH_CHALLENGE, PATH_MEMBERS, PATH_WEEKS } from '../models';
import { getWeekNumber } from '../utils/date';
import { combineLatest, filter, from, map, mergeMap, mergeWith, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor() { }

  firestore: Firestore = inject(Firestore);

  async addActivityToDB(challengeId: string, activity: Activity) {
    const weekId = this.getWeekId(activity.date as Date);
    await addDoc(
      collection(this.firestore, PATH_CHALLENGE, challengeId, PATH_WEEKS, weekId, PATH_ACTIVITIES),
      activity
    );
  }

  getWeekId(date: Date): string {
    const weekNumber = getWeekNumber(date);
    return date.getFullYear() + '-' + weekNumber;
  }

  getChallenge(id: string): Observable<Challenge> {
    // get challenge from firestore
    const docRef = doc(this.firestore, PATH_CHALLENGE, id);
    let challengeData: Challenge = {} as Challenge;
    return from(getDoc(docRef))
      .pipe(
        map((doc) => {
          if (!doc.exists()) {
            throw new Error('Challenge not found');
          }
          challengeData = doc.data() as Challenge;
        }),
        switchMap(() => collectionData(collection(this.firestore, PATH_CHALLENGE, id, PATH_MEMBERS))),
        map(participants => participants as Participant[]),
        // Sort by name
        map((participants: Participant[]) => {
          participants = participants.sort((a, b) => a.name.localeCompare(b.name))
          return {
            ...challengeData,
            uid: id,
            members: participants,
          };
        })
      );
  }

}
