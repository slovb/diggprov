<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useSelectedUserStore } from '@/stores/selectedUser'
import { createUser, getUser } from '@/api'
import { getMessageStore } from '@/stores/message'

/**
 * Create user dialog
 *
 * Choices:
 * 1. Not extracting the input grid into its own component:
 *    I thought this component and the edit component would be more different until I actually wrote it.
 *    Both component would be simpler if it was extracted.
 *
 * 2. Create starts and stops loading:
 *    As create should modify the user store it should be triggering a load. Start loading could possibly
 *    have been async though and create awaiting it.
 */

const userStore = useUserStore()
const selectedUserStore = useSelectedUserStore()
const log = getMessageStore()

const name = ref('')
const address = ref('')
const email = ref('')
const telephone = ref('')

/**
 * Request to create the user and if successful select them and clear the form
 */
async function create() {
  userStore.startLoading()
  try {
    const uuid = await createUser(name.value, address.value, email.value, telephone.value)
    const user = await getUser(uuid)
    if (user !== undefined) {
      userStore.addUser(user)
      selectedUserStore.selectUser(user)

      name.value = ''
      address.value = ''
      email.value = ''
      telephone.value = ''
    } else {
      log.addError('Created user was not found on server, very confusing')
    }
  } catch (error) {
    log.handleError(error)
  }
  userStore.stopLoading()
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
      <button @click.prevent="create">Create</button>
    </div>
  </div>
</template>
