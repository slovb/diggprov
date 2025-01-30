<script setup lang="ts">
import CreateUser from '@/components/CreateUser.vue'
import UserList from '@/components/UserList.vue'
import UserListPager from '@/components/UserListPager.vue'
</script>

<template>
  <main>
    <h1>Users</h1>
    <UserListPager></UserListPager>
    <UserList></UserList>
    <CreateUser></CreateUser>
  </main>
</template>
