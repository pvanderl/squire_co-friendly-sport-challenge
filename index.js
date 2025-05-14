import {
  onDocumentCreated, onDocumentUpdated
} from "firebase-functions/v2/firestore";
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp();
const db = getFirestore();

export const onActivityAdded = onDocumentCreated("challenges/{challengeId}/weeks/{weekId}/activities/{activityId}", async (event) => {
  const weekRef = db.doc(`challenges/${event.params.challengeId}/weeks/${event.params.weekId}`);
  const activitiesRef = weekRef.collection('activities');

  try {
    const activitiesSnapshot = await activitiesRef.get();
    const pointsPerParticipant = {};

    activitiesSnapshot.forEach(doc => {
      const activity = doc.data();
      if (activity.participantUid && activity.points) {
        pointsPerParticipant[activity.participantUid] = (pointsPerParticipant[activity.participantUid] || 0) + activity.points;
      }
    });

    await weekRef.update({
      summary: pointsPerParticipant
    });

  } catch (error) {
    console.error('Error processing activities:', error);
  }
});
