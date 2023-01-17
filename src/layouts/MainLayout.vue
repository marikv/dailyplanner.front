<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-if="isAdmin"
      :model-value="showLeftDrawer"
      :bordered="false"
      @update:model-value="leftDrawerChangedValue"
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <FooterComponent></FooterComponent>
  </q-layout>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import FooterComponent from 'components/FooterComponent.vue';
import { useGlobalStore } from 'stores/globalStore';
import { useQuasar } from 'quasar';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    FooterComponent,
    EssentialLink,
  },

  setup() {
    const $q = useQuasar();
    const isAdmin = ref(false);
    const globalStore = useGlobalStore();
    const showLeftDrawer = computed(() => globalStore.getShowLeftDrawer);
    const leftDrawerChangedValue = (v) => {
      if (!v) {
        globalStore.setShowLeftDrawer(v);
      }
    };

    globalStore.setShowLeftDrawer($q.screen.gt.md);

    return {
      essentialLinks: linksList,
      showLeftDrawer,
      leftDrawerChangedValue,
      isAdmin,
    };
  },
});
</script>
