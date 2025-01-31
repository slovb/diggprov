<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const userStore = useUserStore()

const newUserName = ref('')
const newUserAddress = ref('')
const newUserEmail = ref('')
const newUserTelephone = ref('')
async function createUser() {
  await userStore.createUser(
    newUserName.value,
    newUserAddress.value,
    newUserEmail.value,
    newUserTelephone.value,
  )
  newUserName.value = ''
  newUserAddress.value = ''
  newUserEmail.value = ''
  newUserTelephone.value = ''
}
</script>

<template>
  <div>
    <h2>Create user</h2>
    <ul>
      <li>
        <label
          >Name:
          <input v-model="newUserName" />
        </label>
      </li>
      <li>
        <label
          >Address:
          <input v-model="newUserAddress" />
        </label>
      </li>
      <li>
        <label
          >Email:
          <input v-model="newUserEmail" />
        </label>
      </li>
      <li>
        <label
          >Telephone:
          <input v-model="newUserTelephone" />
        </label>
      </li>
      <button @click="createUser">Create</button>
    </ul>
  </div>
</template>
