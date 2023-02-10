<template>
  <div class="row">
    <div class="col-12 text-center">
      <q-btn-toggle
        v-model="isBadGoal"
        class="bad-or-good-habit-toggle q-mx-auto"
        no-caps
        rounded
        unelevated
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="[
          { label: 'Create Good Habit', value: false },
          { label: 'Break Bad Habit', value: true }
        ]"
      />
    </div>
    <div class="col-12 text-center q-mt-md">
      <q-btn outline
             unelevated
             no-caps
             rounded
             style="max-width: 387px;"
             color="primary"
             class="full-width"
             @click="openYourOwnDialog"
             label="Create Your Own" />
    </div>

    <q-dialog
      transition-show="slide-left"
      transition-hide="slide-right"
      v-model="showAddYourOwnDialog"
      full-height
    >
      <q-card class="full-height relative-position" style="width: 500px; max-width: 95vw;">
        <dialog-header @clickCloseBtn="showAddYourOwnDialog = false"></dialog-header>
        <q-card-section class="scroll ">
          <div class="bg-deep-purple-1 q-pa-sm border-radius-10">
            <q-input filled
                     standout
                     outlined
                     dense
                     placeholder="Habit name"
                     v-model="newGoal.name"
                     :error="newGoalNameError"
                     @keyup="newGoalNameError = false"
                     @focus="newGoalNameError = false"
                     class="q-pa-xs">
              <template v-slot:before>
                <q-btn round
                       size="md"
                       class="text-white"
                       :style="`background-color: ${newGoal.color};`"
                       @click="showChooseIconDialog = true"
                       :icon="`las ${newGoal.icon}`" />
              </template>
            </q-input>
            <q-input
              filled
              standout
              outlined
              dense
              placeholder="Description (optional)"
              v-model="newGoal.description"
              class="q-pa-xs"
              autogrow
            />
          </div>
          <div class="row bg-deep-purple-1 q-pa-sm border-radius-10 q-mt-sm">
            <div class="col-4">
              <q-input filled
                       standout
                       outlined
                       dense
                       label="Goal"
                       v-model="newGoal.count"
                       class="q-pa-xs"></q-input>
            </div>
            <div class="col-8">
              <q-select
                filled
                standout
                outlined
                dense
                label="Unit"
                class="q-pa-xs"
                :options="units"
                v-model="newGoal.unit">
              </q-select>
            </div>
          </div>
          <div class="row bg-deep-purple-1 q-pa-sm border-radius-10 q-mt-sm">
              <div class="col-4">
                <q-toggle
                  label="Repeat"
                  class="q-pa-xs"
                  left-label
                  v-model="newGoal.isRepeat"
                />
              </div>
              <div class="col-8">
                <q-select
                  :disable="!newGoal.isRepeat"
                  :readonly="!newGoal.isRepeat"
                  filled
                  standout
                  outlined
                  dense
                  class="q-pa-xs"
                  v-model="newGoal.frequency"
                  option-label="label"
                  option-value="value"
                  emit-value
                  map-options
                  :options="[{
                    value: 0,
                    label: 'Daily'
                  }, {
                    value: 1,
                    label: 'Monthly'
                  }, {
                    value: 2,
                    label: 'Interval'
                  }]"
                />
              </div>
              <q-slide-transition>
                <div class="col-12" v-if="newGoal.isRepeat">
                  <div class="col-12 row q-pt-sm text-center
                  flex justify-end
                  content-center
                  items-center"
                       v-if="newGoal.frequency === 0">
                    <q-btn
                      dense
                      unelevated
                      round
                      no-caps
                      :key="`dayW${day}`"
                      @click="addOrRemoveDay(day)"
                      :class="newGoal.weekDays.indexOf(day) > -1 ? 'bg-primary text-white q-ma-xs'
                     : 'bg-default text-primary q-ma-xs'"
                      v-for="day in weekDays">
                      {{day}}
                    </q-btn>
                  </div>
                  <div class="col-12 row q-pt-sm
                  flex justify-start
                  content-center
                  items-center"
                       v-else-if="newGoal.frequency === 1">
                    <template :key="`mDate${mDate}`" v-for="(mDate, dateIndex) in 31">
                      <q-btn
                        dense
                        unelevated
                        round
                        no-caps
                        @click="addOrRemoveMonthDay(mDate)"
                        :class="newGoal.monthDays.indexOf(mDate) > -1 ? 'bg-primary text-white'
                     : 'bg-default text-primary'">
                        {{mDate}}
                      </q-btn>
                      <div class="full-width"
                           v-if="dateIndex === 6 || dateIndex ===  13
                            || dateIndex === 20 || dateIndex === 27"></div>
                    </template>
                    <sub class="text-grey-6">
                      * if you choose the 31st,
                      it will be displayed on the
                      last date of each month
                    </sub>
                  </div>
                  <div class="col-12 row q-pt-sm text-center flex justify-around items-center"
                       v-else-if="newGoal.frequency === 2">
                    <template :key="`intervalDays${intervalDaysIndex}`"
                              v-for="(intervalDays, intervalDaysIndex) in 7">
                      <q-btn
                        unelevated
                        rounded
                        no-caps
                        v-if="intervalDays >= 2"
                        @click="newGoal.intervalDays = intervalDays"
                        :class="newGoal.intervalDays === intervalDays
                     ? 'bg-primary text-white' : 'bg-default text-primary'">
                        Every {{intervalDays}} days
                      </q-btn>
                    </template>
                  </div>
                  <div class="col-12 row q-pt-md">
                    <div class="col-6">
                      <q-input
                        filled
                        standout
                        outlined
                        label="Start"
                        dense
                        v-model="newGoal.dateFrom"
                        class="q-mr-sm"
                        mask="date"
                        :rules="['date']">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="newGoal.dateFrom">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-input>
                    </div>
                    <div class="col-6">
                      <q-input
                        filled
                        standout
                        outlined
                        :label="newGoal.dateTill ? 'End' : 'No End'"
                        dense
                        v-if="!newGoal.dateTill"
                        v-model="newGoal.dateTill"
                        class="q-ml-sm">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="newGoal.dateTill">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-input>
                      <q-input
                        filled
                        standout
                        outlined
                        :label="newGoal.dateTill ? 'End' : 'No End'"
                        dense
                        v-else
                        v-model="newGoal.dateTill"
                        class="q-ml-sm"
                        mask="date"
                        clearable
                        :rules="['date']">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="newGoal.dateTill">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-input>
                    </div>
                  </div>
                </div>
              </q-slide-transition>
            </div>
        </q-card-section>
        <dialog-bottom>
          <q-btn rounded
                 class="q-mx-auto"
                 style="min-width: 200px;"
                 color="primary"
                 @click="addNewGoal"
                 label="Save"></q-btn>
        </dialog-bottom>
      </q-card>
    </q-dialog>
    <q-dialog
      transition-show="slide-left"
      transition-hide="slide-right"
      v-model="showChooseIconDialog"
      full-height
    >
      <q-card class="full-height relative-position" style="width: 500px; max-width: 95vw;">
        <dialog-header @clickCloseBtn="showChooseIconDialog = false"></dialog-header>
        <q-card-actions>
          <div class="row full-width q-mb-md">
            <div v-for="(color, colorIndex) in iconColors"
                 :key="`color${colorIndex}`"
                 class="col-2 text-center">
              <q-btn :style="`background-color: ${color};`"
                     @click="setIconColorSelected(color)"
                     class="text-white"
                     :icon="`${(color === iconColorSelected ? 'las la-circle' : '')}`"
                     round
              ></q-btn>
            </div>
          </div>
          <template
            :key="`icon${iconIndex}`"
            v-for="(icon, iconIndex) in icons">
            <div
              class="full-width text-left q-pa-xs"
              v-if="!icon"></div>
            <q-btn
              v-else
              :class="`full-width text-left
               ${(iconSelected === icon ? 'text-white' : '')}`"
              :style="`${(iconSelected === icon ? `background-color: ${iconColorSelected};` : '')}`"
              flat
              align="left"
              rounded
              size="md"
              no-caps
              @click="iconSelected = icon"
              :label="`${icon.replace('la-', '').replace('-', ' ')}`"
              :icon="`las ${icon}`"></q-btn>
          </template>
        </q-card-actions>
        <dialog-bottom>
          <q-btn rounded
                 class="q-mx-auto"
                 style="min-width: 190px;"
                 color="primary"
                 @click="applyIconAndColor"
                 label="Add"></q-btn>
        </dialog-bottom>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import { date } from 'quasar';
import DialogHeader from 'components/Dialogs/DialogHeader.vue';
import DialogBottom from 'components/Dialogs/DialogBottom.vue';
import { Tasks } from 'src/db/Tasks';
import { useTasksStore } from 'stores/tasksStore';

export default {
  name: 'AddDialogGoal',
  components: {
    DialogBottom,
    DialogHeader,
  },
  setup() {
    const tasksStore = useTasksStore();
    const isBadGoal = ref(false);
    const showChooseIconDialog = ref(false);
    const weekDays = ref(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);
    const iconColors = ref([
      '#3a11cc',
      '#ba00d9',
      '#ff0059',
      '#00b905',
      '#ff3000',
      '#0033ff',
    ]);
    const icons = ref([
      'la-bell',
      'la-bell-slash',
      'la-exclamation',
      'la-exclamation-circle',
      'la-exclamation-triangle',
      'la-skull-crossbones',
      'la-radiation',
      '',
      'la-cat',
      'la-crow',
      'la-frog',
      'la-dog',
      'la-horse',
      'la-paw',
      'la-dove',
      'la-fish',
      '',
      'la-car',
      'la-taxi',
      'la-car-side',
      'la-oil-can',
      'la-truck',
      'la-ambulance',
      'la-charging-station',
      'la-shuttle-van',
      'la-truck-monster',
      'la-bus',
      'la-car-battery',
      'la-gas-pump',
      'la-tachometer-alt',
      'la-motorcycle',
      'la-gas-pump',
      '',
      'la-wheelchair',
      'la-blind',
      'la-universal-access',
      'la-phone-volume',
      '',
      'la-apple-alt',
      'la-campground',
      'la-mountain',
      'la-hiking',
      '',
      'la-wine-bottle',
      'la-beer',
      'la-blender',
      'la-cocktail',
      'la-coffee',
      'la-mug-hot',
      'la-glass-martini-alt',
      'la-wine-glass',
      'la-glass-whiskey',
      '',
      'la-running',
      'la-baseball-ball',
      'la-basketball-ball',
      'la-biking',
      'la-bowling-ball',
      'la-dumbbell',
      'la-football-ball',
      'la-futbol',
      'la-golf-ball',
      'la-hockey-puck',
      'la-skating',
      'la-skiing',
      'la-snowboarding',
      'la-swimmer',
      'la-table-tennis',
      'la-volleyball-ball',
      'la-skating',
      'la-fire-alt',
      '',
      'la-broom',
      'la-archway',
      '',
      'la-smoking',
      'la-smoking-ban',
      'la-bed',
      'la-camera',
      'la-tint',
      'la-book',
      'la-award',
      'la-laptop-code',
      'la-music',
      'la-piggy-bank',
      'la-landmark',
      'la-coins',
      'la-money-bill',
      'la-credit-card',
      'la-wallet',
      '',
      'la-cookie',
      'la-hamburger',
      'la-candy-cane',
      'la-apple-alt',
      'la-bacon',
      'la-carrot',
      'la-drumstick-bite',
      'la-hotdog',
      'la-pizza-slice',
      'la-egg',
      'la-ice-cream',
      'la-bread-slice',
      'la-fish',
      'la-lemon',
      '',
      'la-chess',
      'la-dice-d6',
      // 'la-xbox',
      // 'la-steam',
      // 'la-playstation',
      'la-gamepad',
      'la-headset',
      'la-puzzle-piece',
      '',
      'la-broom',
      'la-toilet-paper',
      'la-spider',
      'la-hand-pointer',
      'la-hand-middle-finger',
      'la-thumbs-down',
      'la-hand-holding-usd',
      'la-handshake',
      'la-hand-paper',
      'la-allergies',
      '',
      'la-heartbeat',
      'la-stethoscope',
      'la-medkit',
      'la-h-square',
      'la-hospital',
      '',
      'la-record-vinyl',
      'la-music',
      'la-headphones-alt',
      'la-volume-off',
      'la-guitar',
      'la-microphone',
      '',
    ]);
    const iconColorSelected = ref(iconColors.value[0]);
    const iconSelected = ref(icons.value[0]);
    const units = ref([
      'count',
      'mins',
      'km',
      'yards',
      'miles',
      'hours',
      'kcal',
      'glass',
      'l',
      'page',
    ]);
    const timeStamp = Date.now();
    const newGoal = ref({
      isGoal: 1,
      isBadGoal: isBadGoal.value,
      name: null,
      icon: iconSelected.value,
      color: iconColorSelected.value,
      description: null,
      isRepeat: true,
      frequency: 0,
      dateFrom: date.formatDate(timeStamp, 'YYYY/MM/DD'),
      dateTill: null,
      count: 1,
      unit: 'count',
      weekDays: [...weekDays.value],
      monthDays: [1],
      intervalDays: 2,
    });
    const showAddYourOwnDialog = ref(false);
    const openYourOwnDialog = () => {
      showAddYourOwnDialog.value = true;
    };
    const addOrRemoveDay = (day) => {
      if (newGoal.value.weekDays.indexOf(day) > -1) {
        newGoal.value.weekDays.splice(newGoal.value.weekDays.indexOf(day), 1);
      } else {
        newGoal.value.weekDays.push(day);
      }
    };
    const addOrRemoveMonthDay = (day) => {
      if (newGoal.value.monthDays.indexOf(day) > -1) {
        newGoal.value.monthDays.splice(newGoal.value.monthDays.indexOf(day), 1);
      } else {
        newGoal.value.monthDays.push(day);
      }
    };
    const setIconColorSelected = (color) => {
      iconColorSelected.value = color;
    };
    const applyIconAndColor = () => {
      const goal = newGoal.value;
      goal.color = iconColorSelected.value;
      goal.icon = iconSelected.value;
      newGoal.value = { ...goal };
      showChooseIconDialog.value = false;
    };
    const newGoalNameError = ref(false);
    const addNewGoal = () => {
      let hasErrors = false;
      if (!newGoal.value.name) {
        hasErrors = true;
        newGoalNameError.value = true;
      }
      if (hasErrors) {
        return false;
      }
      const newTask = { ...newGoal.value };
      tasksStore.addNewTask(newTask);
      Tasks.addNew(newTask);
      return true;
    };
    return {
      isBadGoal,
      showAddYourOwnDialog,
      openYourOwnDialog,
      newGoal,
      weekDays,
      addOrRemoveDay,
      addOrRemoveMonthDay,
      units,
      showChooseIconDialog,
      icons,
      iconColors,
      iconColorSelected,
      setIconColorSelected,
      iconSelected,
      applyIconAndColor,
      addNewGoal,
      newGoalNameError,
    };
  },
};
</script>

<style scoped>

</style>
