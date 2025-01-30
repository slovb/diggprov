<script setup lang="ts">
import CreateUser from '@/components/CreateUser.vue'
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
    </div>
    <div>
      <CreateUser></CreateUser>
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
    grid-template-columns: 3fr 1fr;
    padding: 0 2rem;
  }
}
</style>
