<template>
  <v-app :theme="theme.getThem">
<!--    <v-system-bar >-->
<!--      <v-icon icon="mdi-wifi-strength-4"></v-icon>-->
<!--      <v-icon icon="mdi-signal" class="ml-2"></v-icon>-->
<!--      <v-icon icon="mdi-battery" class="ml-2"></v-icon>-->
<!--      <span class="ml-2">3:13PM</span>-->
<!--    </v-system-bar>-->
    <v-app-bar density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
      </template>
      <v-app-bar-title>BINANCE</v-app-bar-title>
      <template v-slot:append>
        <v-btn icon="mdi-dots-vertical" />
        <v-spacer></v-spacer>
        <v-btn icon="mdi-logout" @click="auth.logout()" />
        <v-btn :icon="theme.getIcon" @click="theme.setTheme(theme.type === 'light' ? 'dark' : 'light')" />
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer"  />
    <v-main @mousemove="cursor($event)"  v-touch="{ end: () => swipe('end'), down: () => swipe('down'), move: ($event) => cursor($event) }">
      <TouchUpdaterPage :height="height" :theme="theme.getThem" />
      <v-container>
        <slot />
      </v-container>
    </v-main>
    <v-bottom-navigation>
      <v-btn v-for="btn in navigation" :key="btn.url" :to="{ name: btn.url }" :prepend-icon="btn.icon" exact>
        {{ btn.txt }}
      </v-btn>
    </v-bottom-navigation>
<!--    <v-footer app bottom absolute padless color="grey-lighten-2">-->
<!--      {{ new Date().getFullYear() }}-->
<!--    </v-footer>-->
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from '~/stores/theme';
import { useAuth } from "~/stores/auth";
const theme = useTheme();
const auth = useAuth();


const drawer = ref(null);
const navigation = [
  {
    url: 'index',
    txt: 'Торговля',
    icon: 'mdi-chart-line-variant',
  },
  {
    url: 'settings',
    txt: 'Настройки',
    icon: 'mdi-cog',
  },
];


const end = ref(false);
const down = ref(false);
const move = ref(false);
const height = ref(0);
const start = ref(0);
const position = ref(0);

const changeTouchEnd = computed(() => end.value && !drawer.value);

const cursor = ($event: any) => {
  if (!$event?.originalEvent?.touches?.length) {
    return;
  }

  const { clientY } = $event.originalEvent.touches[0];

  if (position.value < clientY) {
    if (!start.value) start.value = clientY
    height.value = Number(position.value - start.value)
  }

  if (position.value > clientY) {
    if (!start.value) start.value = clientY
    height.value = Number(position.value - start.value)
  }

  position.value = clientY;
}

const swipe = function (type: string) {
  switch (type) {
    case 'end':
      end.value = true;
      break;
    case 'down':
      down.value = true;
      break;
  }
}

watch(changeTouchEnd, (value) => {
  if (value && height.value >= 100) {
    location.reload();
  }
  end.value = false;
  down.value = false;
  start.value = 0;
  height.value = 0;
  position.value = 0;
})

</script>