<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const userStore = useUserStore()

const name = ref('')
const address = ref('')
const email = ref('')
const telephone = ref('')

/**
 * Request to create the user and if successful clear the form
 */
async function createUser() {
  const success = await userStore.createUser(
    name.value,
    address.value,
    email.value,
    telephone.value,
  )
  if (success) {
    name.value = ''
    address.value = ''
    email.value = ''
    telephone.value = ''
  }
}
</script>

<template>
  <div class="form-widget">
    <h2 class="title">Create user</h2>
    <div class="input-grid">
      <label for="new-name">Name:</label>
      <input id="new-name" v-model="name" placeholder="Name" />
      <label for="new-address">Address:</label>
      <input id="new-address" v-model="address" placeholder="Address" />
      <label for="new-email">Email:</label>
      <input id="new-email" v-model="email" placeholder="Email" />
      <label for="new-telephone">Telephone:</label>
      <input id="new-telephone" v-model="telephone" placeholder="Telephone" />
    </div>
    <div class="button-group">
      <button @click.prevent="createUser">Create</button>
    </div>
  </div>
</template>
