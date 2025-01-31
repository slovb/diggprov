<script setup lang="ts">
import UserListRow from './UserListRow.vue'
import { usePageStore } from '@/stores/page'

const pageStore = usePageStore()
</script>

<template>
  <table v-if="pageStore.page.length">
    <thead>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Email</th>
        <th>Telephone</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in pageStore.page" :key="user.name">
        <UserListRow :user="user"></UserListRow>
      </tr>
    </tbody>
  </table>
  <p v-else>No users found here</p>
</template>

<style>
table {
  border-top: 2px solid var(--vt-c-indigo);
  border-radius: 3px;
}

th {
  border-bottom: 2px solid var(--color-border-hover);
}

td {
  border-bottom: 1px solid var(--color-border);
}

th,
td {
  min-width: 120px;
  padding: 2px 1em;
}
</style>
