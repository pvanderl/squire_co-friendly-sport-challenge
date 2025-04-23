export const PATH_CHALLENGE = 'challenges';
export const PATH_MEMBERS = 'members';
export const PATH_ACTIVITIES = 'activities';

export interface Challenge {
  uid: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export interface Member {
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
