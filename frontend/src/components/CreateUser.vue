<script setup lang="ts">
import { User } from '@/models/user'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const userStore = useUserStore()

const newUserName = ref('')
function createUser() {
  userStore.addUser(new User(newUserName.value))
  newUserName.value = ''
}
</script>

<template>
  <div>
    <label
      >Name:
      <input v-model="newUserName" @keyup.enter="createUser" />
    </label>
    <button @click="createUser">Create</button>
  </div>
</template>
