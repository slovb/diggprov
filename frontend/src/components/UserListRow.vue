<script setup lang="ts">
import { User } from '@/models/user'
import { reactive } from 'vue'

const props = defineProps({
  user: {
    type: User,
    required: true,
  },
})

const user = reactive(props.user)
</script>

<template>
  <td>{{ user.name }}</td>
</template>
