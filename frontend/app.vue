<template>
  <div>
<!--    <NuxtWelcome />-->
    <h1>Привет</h1>
    <Button label="Get" @click="onClick" />
    <Button label="Clear" @click="onClear" />
    <br>
    {{ data }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";

const data = ref('');

const onClear = () => data.value = '';

const host = 'http://localhost:1000'
// const host = 'http://141.144.240.101:1000'

const onClick = () => {
  return fetch(host,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log('res', res)
        data.value = res;
      })
}
</script>