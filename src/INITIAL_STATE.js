import hash from '@/utilities/hash';

export default {
  theme: {
    color: 70,
    dark_mode: false
  },
  
  currentList: '',
  categories: {
    'kas2d-ad-a2d-a2d-2ad': {
      name: 'Daily',
      lists: {
        'as2-asd2-asd3-k2-asd1': true
      }
    },
  },
  lists: {
    'as2-asd2-asd3-k2-asd1': {
      id: 'as2-asd2-asd3-k2-asd1',
      title: 'An Awesome List',
      category: 'kas2d-ad-a2d-a2d-2ad',
      todos: {
        'adwa-awd-a-2-2d-4': true,
        'adwa-awd-a-2-2d-2': true,
        'adwa-awd-a-2-2d-1': true,
        'adwa-awd-a-2-2d-3': true
      },
      created: new Date().getTime(),
      updated: new Date().getTime()
    },
  },
  todos: {
    'adwa-awd-a-2-2d-4': {
      content: 'Code like a monkey',
      list_id: 'as2-asd2-asd3-k2-asd1',
      done: false,
      editing: false
    },
    'adwa-awd-a-2-2d-2': {
      content: 'Pet the cat',
      list_id: 'as2-asd2-asd3-k2-asd1',
      done: false,
      editing: false
    },
    'adwa-awd-a-2-2d-1': {
      content: 'Take a dump',
      list_id: 'as2-asd2-asd3-k2-asd1',
      done: false,
      editing: false
    },
    'adwa-awd-a-2-2d-3': {
      content: 'Make something useless',
      list_id: 'as2-asd2-asd3-k2-asd1',
      done: true,
      editing: false
    }
  }
};