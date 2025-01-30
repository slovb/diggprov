<script setup lang="ts">
import { User } from '@/models/user'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const userStore = useUserStore()

const newUserName = ref('')
function addUser() {
  userStore.addUser(new User(newUserName.value))
  newUserName.value = ''
}
</script>

<template>
  <div>
    <input v-model="newUserName" />
    <button @click="addUser">Add User</button>
  </div>
</template>
