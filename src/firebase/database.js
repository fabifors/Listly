
const methods = {
  dude() {
    console.log('will this work?');
  }
};

class _Database {
  constructor(firebase) {
    this.db = firebase.database();
    this.refs = ['users', 'lists', 'todos', 'categories'];
  }

  listenForChanges () {
    let _uid;
    let listeners = {};
    const db = this.db;
    const refs = this.refs;

    function setUser(uid) {
      _uid = uid;
      if(_uid === null) {
        listeners = {};
      } else {
        refs.forEach(ref => {
          listeners[ref] = db.ref(`${ref}/${_uid}`);
        });
      }
    }

    function on(ref, callback) {
      const isValidRef = refs.some(r => r === ref);
      if (isValidRef) {
        listeners[ref].on('value', callback);
      }
    }

    function off() {
      refs.forEach(ref => {
        db.ref(`${ref}/${_uid}`).off();
      });
    }

    return { on, off, setUser };
  }

  createUser (data) {
    return this.db.ref(`users/${data.uid}`).set({
      ...data
    });
  }

  init (ref, {uid, data}) {
    const isValidRef = this.refs.some(r => r === ref);
    const isValidUid = typeof uid === 'string';
    if (isValidRef && isValidUid) {
      return this.db.ref(`${ref}/${uid}`).set({
        ...data
      });
    }
    return Error('init: No valid ref/key passed');
  }
  
  create (ref, { uid, data }) {
    const isValidRef = this.refs.some(r => r === ref);
    const isValidUid = typeof uid === 'string';
    if (isValidRef && isValidUid) {
      const key = this.db.ref().child(ref).push().key;
      return this.db.ref(`${ref}/${uid}/${key}`).set({
        ...data
      });
    }
    return Error('create: No valid ref/key passed');
  }

  update (ref, { uid, key, data}) {
    const isValidRef = this.refs.some(r => r === ref);
    const isValidKey = typeof key === 'string';
    if (isValidRef && isValidKey) {
      const update = {};
      update[`${ref}/${uid}/${key}`] = { ...data };
      return this.db.ref().update(update);
    }
    return Error('update: No valid ref passed');
  }

  updateAll (ref, { uid, updates}) {
    const isValidRef = this.refs.some(r => r === ref);
    if (isValidRef) {
      return this.db.ref(`${ref}/${uid}`).update(updates);
    }
    return Error('update: No valid ref passed');
  }

  deleteOne (ref, { uid, key }) {
    const isValidRef = this.refs.some(r => r === ref);
    const isValidKey = typeof key === 'string';
    if (isValidRef && isValidKey) {
      return this.db.ref(`${ref}/${uid}/${key}`).set(null);
    }
    return Error('deleteOne: No valid ref passed');
  }

  deleteAll (ref, { uid }) {
    const isValidRef = this.refs.some(r => r === ref);
    if (isValidRef) {
      return this.db.ref(`${ref}/${uid}`).set(null);
    }
    return Error('deleteAll: No valid ref passed');
  }
}

export default _Database;
