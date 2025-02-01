<script setup lang="ts">
import { useSelectedUserStore } from '@/stores/selectedUser'
import UserListRow from './UserListRow.vue'
import { usePageStore } from '@/stores/page'

const pageStore = usePageStore()
const selectedUserStore = useSelectedUserStore()
</script>

<template>
  <table v-if="pageStore.page.length">
    <thead>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Email</th>
        <th>Telephone</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in pageStore.page"
        :key="user.uuid"
        :class="{ selected: user === selectedUserStore.user }"
      >
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

tr.selected {
  background-color: var(--color-background-soft);
}
</style>
