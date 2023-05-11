import Dexie, { Table } from 'dexie';

export interface DbDay {
  date: string;
  activities: string[];
}

// export const db = new Dexie('activeDatabase');
// db.version(1).stores({
//   days: '++id, activities',
// })

export class MySubClassedDexie extends Dexie {
  days!: Table<DbDay>;

  constructor() {
    super('activeDb');
    this.version(1).stores({
      days: 'date',
    });
  }
}

export const db = new MySubClassedDexie();
