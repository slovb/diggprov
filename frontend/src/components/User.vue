<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed, ref } from 'vue'

const userStore = useUserStore()
const pageNumber = ref(0)
const pageSize = 4
const lastPage = computed(() => {
  return Math.ceil(userStore.users.length / pageSize) - 1
})

const page = computed(() => {
  const pos = pageSize * pageNumber.value
  return userStore.users.slice(pos, pos + pageSize)
})
</script>

<template>
  <div>
    <ul>
      <li v-for="user in page" :key="user.name">
        {{ user.name }}
      </li>
    </ul>
  </div>
  <div>
    <button v-if="pageNumber > 0" @click="pageNumber--">-</button>
    <p>Page {{ pageNumber }}</p>
    <button v-if="pageNumber < lastPage" @click="pageNumber++">+</button>
  </div>
</template>
