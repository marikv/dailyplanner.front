import { defineStore } from 'pinia';
import { Tools } from 'src/helpers/Tools';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),
  getters: {
    getGoals: (state) => state.tasks.filter((task) => task.isGoal),
    getHabit: (state) => state.tasks.filter((task) => task.isHabit),
    getTodos: (state) => state.tasks.filter((task) => task.isTodo),
  },
  actions: {
    setTasks(v) {
      this.tasks = v;
    },
    addNewTask(v) {
      if (!v.createdAt) {
        v.createdAt = Tools.dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
      }
      if (!v.updatedAt) {
        v.updatedAt = Tools.dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
      }
      // this.tasks = [v, ...this.tasks];
      this.tasks.push(v);
    },
  },
});
