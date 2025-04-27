export const PATH_CHALLENGE = 'challenges';
export const PATH_MEMBERS = 'members';
export const PATH_ACTIVITIES = 'activities';

interface TimeStamp extends Date {
  seconds: number;
  nanoseconds: number;
  toDate: () => Date;
}

export interface Challenge {
  uid: string;
  name: string;
  description: string;
  startDate: TimeStamp;
  endDate: TimeStamp;
}

export interface Participant {
  uid: string;
  name: string;
  vo2max: number;
}

export interface Activity {
  selection: string[];
  date: string;
  duration: number; // in seconds
  METs: number; // Metabolic Equivalent of Task
  memberUid: string;
}
