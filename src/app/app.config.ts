import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const firebaseConfig = {
  apiKey: "AIzaSyDQINw1G9ECIJnY6ATiSwwOBoLvlAwVuDI",
  authDomain: "friendly-sport-challenge.firebaseapp.com",
  projectId: "friendly-sport-challenge",
  storageBucket: "friendly-sport-challenge.firebasestorage.app",
  messagingSenderId: "1080790374398",
  appId: "1:1080790374398:web:bf174b51dd33e51fbb52af",
  measurementId: "G-VTJLLCTCW4",
}


export const appConfig: ApplicationConfig = {
  providers: [
    {provide: FIREBASE_OPTIONS, useValue: firebaseConfig},
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
