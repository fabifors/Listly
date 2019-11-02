import hash from '@/utilities/hash';

export default {
  theme: {
    color: 70,
    dark_mode: false
  },
  currentList: '',
  categories: {
    'kas2d-ad-a2d-a2d-2ad': {
      id: 'kas2d-ad-a2d-a2d-2ad',
      name: 'Daily',
      lists: ['as2-asd2-asd3-k2-asd2']
    },
    'kas2d-ad-a2d-a2d-2ae': {
      id: 'kas2d-ad-a2d-a2d-2ae',
      name: 'Lök',
      lists: ['as2-asd2-asd3-k2-asd4']
    }
  },
  lists: {
    'as2-asd2-asd3-k2-asd2': {
      id: 'as2-asd2-asd3-k2-asd2',
      title: 'An Awesome List',
      category: 'kas2d-ad-a2d-a2d-2ad',
      todos: [
        {
          content: 'Code like a monkey',
          done: false,
          editing: false,
          id: hash()
        }, 
        {
          content: 'Pet the cat',
          done: false,
          editing: false,
          id: hash()
        },
        {
          content: 'Take a dump',
          done: false,
          editing: false,
          id: hash()
        },
        { 
          content: 'Make something useless',
          done: true,
          editing: false,
          id: hash()
        }
      ],
      created: new Date().getTime(),
      updated: new Date().getTime()
    },
    'as2-asd2-asd3-k2-asd4': {
      id: 'as2-asd2-asd3-k2-asd4',
      title: 'An Awesome List',
      category: 'kas2d-ad-a2d-a2d-2ae',
      todos: [
        {
          content: 'Code like a monkey',
          done: false,
          editing: false,
          id: hash()
        }, 
        {
          content: 'Pet the cat',
          done: false,
          editing: false,
          id: hash()
        },
        {
          content: 'Take a dump',
          done: false,
          editing: false,
          id: hash()
        },
        { 
          content: 'Make something useless',
          done: true,
          editing: false,
          id: hash()
        }
      ],
      created: new Date().getTime(),
      updated: new Date().getTime()
    },
    'as2-asd2-asd3-k2-asd1': {
      id: 'as2-asd2-asd3-k2-asd1',
      title: 'An Awesome List',
      category: '',
      todos: [
        {
          content: 'Code like a monkey',
          done: false,
          editing: false,
          id: hash()
        }, 
        {
          content: 'Pet the cat',
          done: false,
          editing: false,
          id: hash()
        },
        {
          content: 'Take a dump',
          done: false,
          editing: false,
          id: hash()
        },
        { 
          content: 'Make something useless',
          done: true,
          editing: false,
          id: hash()
        }
      ],
      created: new Date().getTime(),
      updated: new Date().getTime()
    }
  }
};