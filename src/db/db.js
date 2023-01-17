import Dexie from 'dexie';

const dbName = 'DP_IndexedDB';
const dbVersion = 1;

export const db = new Dexie(dbName);

db.version(dbVersion).stores({
  user: '++id, name, email, token, hash',
  goals: '++id, isBadGoal, name, icon, color, description, isRepeat, frequency, dateFrom, dateTill, count, unit, weekDays, monthDays, intervalDays',
});
