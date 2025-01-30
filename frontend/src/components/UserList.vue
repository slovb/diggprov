<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed, ref } from 'vue'

const props = defineProps({
  pageSize: {
    type: Number,
    default: 20,
  },
})

const userStore = useUserStore()
const pageNumber = ref(0)
const lastPage = computed(() => {
  return Math.ceil(userStore.users.length / props.pageSize) - 1
})

const page = computed(() => {
  const start = pageNumber.value * props.pageSize
  const end = start + props.pageSize
  return userStore.users.slice(start, end)
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
