import { db } from './db';

export class Goals {
  static async getFirst() {
    let val;
    await db.goals.toCollection().first((res) => {
      val = res;
    });
    return val;
  }

  static async update(obj) {
    await db.goals.toCollection().first(async (row) => {
      if (!row) {
        await db.goals.add(obj);
      } else {
        await db.goals.update(row.id, obj);
      }
    });
  }

  static async addNew(newGoal) {
    const goal = { ...newGoal };
    goal.weekDays = goal.weekDays.join(',');
    goal.monthDays = goal.monthDays.join(',');
    await db.goals.add(goal);
  }
}
