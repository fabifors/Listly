
// Firebase imports
import * as firebase from 'firebase/app';
import firebaseConfig from '../firebase.config';

/**
 * Firebase Setup
 */

class Firebase {
  constructor(config) {
    this.config = config;
  }
  
  init() {
    firebase.initializeApp(this.config);
  }

  logInWithGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then((res) => {
      const { user: { providerData: [usr] } } = res;
      const { displayName, email, photoURL, uid } = usr;

      return { user: { displayName, email, photoURL, uid } };
    }).catch(error => {
      console.error(error.code, error.message);
      return Error(error);
    });
  }

  signOutUser () {
    return new Promise( async (resolve, reject) => {
      const response = await firebase.auth().signOut();
      resolve(response);
    });
  }

  getCurrentAuthStatus () {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  };
}

const _Firebase = new Firebase(firebaseConfig);
_Firebase.init();


export default _Firebase;