<script setup lang="ts">
import { User } from '@/models/user'
import { useSelectedUserStore } from '@/stores/selectedUser'
import { reactive } from 'vue'

const props = defineProps({
  user: {
    type: User,
    required: true,
  },
})

const user = reactive(props.user)

const selectedUserStore = useSelectedUserStore()

function selectUser() {
  selectedUserStore.selectUser(user)
}
</script>

<template>
  <td>{{ user.name }}</td>
  <td>{{ user.address }}</td>
  <td>{{ user.email }}</td>
  <td>{{ user.telephone }}</td>
  <td>
    <button @click.prevent="selectUser">Edit</button
    ><span v-if="user === selectedUserStore.user" class="green">&nbsp;✎</span>
  </td>
</template>
