// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  envName: 'dev',
  production: false,
  backendUrl: 'https://api.finerio.mx/api',
  newBackendUrl: 'https://api-v2.finerio.mx',
  apiUrl: 'https://api.finerio.mx',
  xuangaUrl: 'http://10.147.18.3:8080/api',
  firebase: {
    apiKey: 'AIzaSyC3dN2i9Sy2aSxR0Q0bW7G0238PvQPq-lI',
    authDomain: 'finerio-android.firebaseapp.com',
    databaseURL: 'https://finerio-android.firebaseio.com',
    projectId: 'finerio-android',
    storageBucket: 'finerio-android.appspot.com',
    messagingSenderId: '864285526097',
    appId: '1:864285526097:web:068e863c8ffac6a4549070'
  },
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
