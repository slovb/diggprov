<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useSelectedUserStore } from '@/stores/selectedUser'
import { User } from '@/models/user'
import { deleteUser, getUser, putUser } from '@/api'
import { getMessageStore } from '@/stores/message'

/**
 * Edit user dialog
 */

const userStore = useUserStore()
const selectedUserStore = useSelectedUserStore()
const log = getMessageStore()

const name = ref('')
const address = ref('')
const email = ref('')
const telephone = ref('')
const uuid = ref('')
const isDisabled = computed(() => {
  return uuid.value === undefined || uuid.value === ''
})

/**
 * Update the state for the inputs depending on what user is being edited.
 */
function updateState(user?: User) {
  if (user === undefined) {
    name.value = ''
    address.value = ''
    email.value = ''
    telephone.value = ''
    uuid.value = ''
  } else {
    name.value = user.name
    address.value = user.address
    email.value = user.email
    telephone.value = user.telephone
    uuid.value = user.uuid
  }
}

/**
 * IF a new user is selected, update the state
 */
watch(
  () => selectedUserStore.user,
  (user?: User) => {
    updateState(user)
  },
)

/**
 * Save changes and update the state with what is returned from the backend
 */
async function save() {
  const candidate = new User(name.value, address.value, email.value, telephone.value, uuid.value)
  try {
    await putUser(candidate)
    const user = await getUser(candidate.uuid)
    if (user !== undefined) {
      userStore.updateUser(user)
      updateState(user)
    }
  } catch (error) {
    log.handleError(error)
  }
}

/**
 * Remove the user and unselect it
 */
async function remove() {
  const user = selectedUserStore.user
  if (user !== undefined) {
    try {
      await deleteUser(user)
      unselect()
      userStore.removeUser(user)
    } catch (error) {
      log.handleError(error)
    }
  }
}

/**
 * Stop selecting the user
 */
function unselect() {
  selectedUserStore.unselectUser()
}
</script>

<template>
  <div class="form-widget">
    <h2 class="title">Edit user</h2>
    <div class="input-grid">
      <label for="edit-name">Name:</label>
      <input id="edit-name" v-model="name" placeholder="Name" :disabled="isDisabled" />
      <label for="edit-address">Address:</label>
      <input id="edit-address" v-model="address" placeholder="Address" :disabled="isDisabled" />
      <label for="edit-email">Email:</label>
      <input id="edit-email" v-model="email" placeholder="Email" :disabled="isDisabled" />
      <label for="edit-telephone">Telephone:</label>
      <input
        id="edit-telephone"
        v-model="telephone"
        placeholder="Telephone"
        :disabled="isDisabled"
      />
    </div>
    <div class="button-group">
      <button @click.prevent="unselect" :disabled="isDisabled">Cancel</button>
      <button @click.prevent="remove" :disabled="isDisabled">Delete</button>
      <button @click.prevent="save" :disabled="isDisabled">Save</button>
    </div>
  </div>
</template>
