<script setup lang="ts">
import CreateUser from '@/components/CreateUser.vue'
import EditUser from '@/components/EditUser.vue'
import UserList from '@/components/UserList.vue'
import UserListPager from '@/components/UserListPager.vue'
</script>

<template>
  <header>
    <h1>Users</h1>
  </header>
  <main class="main">
    <div>
      <UserListPager></UserListPager>
      <UserList></UserList>
      <UserListPager></UserListPager>
    </div>
    <div>
      <CreateUser></CreateUser>
      <EditUser></EditUser>
    </div>
  </main>
</template>

<style>
.main > div {
  padding-top: 2em;
}

@media (min-width: 1024px) {
  .main {
    display: grid;
    gap: 4em;
    grid-template-columns: 4fr 1fr;
    padding: 0 2rem;
  }
}
</style>
