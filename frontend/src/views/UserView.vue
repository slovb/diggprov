<script setup lang="ts">
import UserList from '@/components/UserList.vue'
import CreateUser from '@/components/CreateUser.vue'
</script>

<template>
  <main>
    <UserList :page-size="2"></UserList>
    <CreateUser></CreateUser>
  </main>
</template>
