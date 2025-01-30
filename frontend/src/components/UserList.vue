<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed, ref } from 'vue'
import UserListRow from './UserListRow.vue'

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
  <table v-if="page.length">
    <thead>
      <tr>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in page" :key="user.name">
        <UserListRow :user="user"></UserListRow>
      </tr>
    </tbody>
  </table>
  <p v-else>No users found</p>
  <div>
    <button v-if="pageNumber > 0" @click="pageNumber--">-</button>
    <p>Page {{ pageNumber }}</p>
    <button v-if="pageNumber < lastPage" @click="pageNumber++">+</button>
  </div>
</template>
