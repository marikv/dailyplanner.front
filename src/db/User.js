import { useAuthStore } from 'stores/authStore';
import { db } from './db';

export class User {
  static async getFirst() {
    let val;
    const authStore = useAuthStore();
    await db.user.toCollection().first((res) => {
      val = res;
      authStore.setCurrentUser(val);
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
