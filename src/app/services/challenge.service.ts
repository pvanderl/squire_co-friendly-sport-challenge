import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Activity, PATH_ACTIVITIES, PATH_CHALLENGE, PATH_WEEKS } from '../models';
import { getWeekNumber } from '../utils/date';

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

}
