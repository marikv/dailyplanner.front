import { db } from './db';

export class User {
  static async getFirst() {
    let val;
    await db.user.toCollection().first((res) => {
      val = res;
    });
    return val;
  }

  static async update(obj) {
    await db.user.toCollection().first(async (userRow) => {
      if (!userRow) {
        await db.user.add(obj);
      } else {
        await db.user.update(userRow.id, obj);
      }
    });
  }
}
