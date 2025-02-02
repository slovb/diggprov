<script setup lang="ts">
import { useSelectedUserStore } from '@/stores/selectedUser'
import UserListRow from './UserListRow.vue'
import { usePageStore } from '@/stores/page'

/**
 * List of users
 *
 * Choices:
 * 1. Extracting the row into its own component:
 *    This made the code neater, but I always find it a bit treacherous with tables as this parent component
 *    imposes that the child component has to contain <td>s and they have to be in the order of the table head.
 *    That sounds too strongly coupled, but for now it is the simple solution.
 *
 * 2. Not displaying a loading spinner:
 *    I did not get around to designing one and felt like that bit of UX was maybe not a part of the task at hand.
 *    Thus it had a low priority for me.
 */

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
