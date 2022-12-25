<template>
  <NuxtLayout name="single">
    <v-sheet :class="$style.wrapper" color="transparent">
      <v-card class="mx-auto px-6" elevation="0" max-width="300" color="transparent">
        <div class="text-center pb-6">
          <h3>BINANCE TRADE</h3>
        </div>

        <v-form
            @submit.prevent="onSubmit"
        >
          <v-text-field
              v-model="email"
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              clearable
              :disabled="loading"
              label="Email"
          ></v-text-field>

          <v-text-field
              v-model="password"
              :readonly="loading"
              :rules="[required]"
              clearable
              :disabled="loading"
              label="Пароль"
          ></v-text-field>

          <br>

          <v-btn
              :disabled="!email && !password"
              :loading="loading"
              block
              color="success"
              size="large"
              type="submit"
              variant="elevated"
          >
            Авторизация
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </NuxtLayout>
</template>


<script setup lang="ts">
import { useAuth } from '~/stores/auth';
const auth = useAuth();

const email = ref('kopbox@gmail.com');
const password = ref('181089kpp');
const loading = ref(false);
const form = computed(() => !!email.value && !!password.value);

const required = (v: any) => {
  return !!v || 'Обязательно для заполнения'
};

const onSubmit = async () => {
  if (!form.value) return

  loading.value = true

  setTimeout(() => (loading.value = false), 1000)

  auth.login({
    email: email.value,
    password: password.value
  });
}

</script>


<style module lang="scss">
.wrapper {
  padding-top: 10rem;
}
</style>