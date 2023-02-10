import { db } from './db';

export class Tasks {
  static async getFirst() {
    let val;
    await db.tasks.toCollection().first((res) => {
      val = res;
    });
    return val;
  }

  static async update(obj) {
    await db.tasks.toCollection().first(async (row) => {
      if (!row) {
        await db.tasks.add(obj);
      } else {
        await db.tasks.update(row.id, obj);
      }
    });
  }

  static async addNew(newTask) {
    const task = { ...newTask };

    task.weekDays = task.weekDays && Array.isArray(task.weekDays) ? task.weekDays.join(',') : null;
    task.monthDays = task.monthDays && Array.isArray(task.monthDays) ? task.monthDays.join(',') : null;

    await db.tasks.add(task);
  }
}
