
// Firebase imports
import * as firebase from 'firebase';
import firebaseConfig from '../firebase.config';
import _Database from './database';

/**
 * Firebase Setup
 */
firebase.initializeApp(firebaseConfig);

class _Firebase {
  constructor(firebase) {
    this.firebase = firebase;
  }

  logInWithGoogle () {
    const provider = new this.firebase.auth.GoogleAuthProvider();
    return this.firebase.auth().signInWithPopup(provider).then((res) => {
      console.log(res);
      const { user: { providerData: [usr], uid }, additionalUserInfo: { isNewUser } } = res;
      const { displayName, email, photoURL } = usr;

      return { user: { displayName, email, photoURL, uid }, isNewUser };
    }).catch(error => {
      console.error(error.code, error.message);
      return Error(error);
    });
  }

  signOutUser () {
    return new Promise( async (resolve, reject) => {
      const response = await this.firebase.auth().signOut();
      resolve(response);
    });
  }

  getCurrentAuthStatus () {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.firebase.auth().onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  };
}

const Database = new _Database(firebase);
const Firebase = new _Firebase(firebase);

export { Firebase, Database };