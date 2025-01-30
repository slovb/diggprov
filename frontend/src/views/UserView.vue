<script setup lang="ts">
import { User } from '@/models/user'
import { computed, ref } from 'vue'

const users = ref([new User('Alice'), new User('Bob'), new User('Lotta')])
const pageNumber = ref(0)
const pageSize = 4
const lastPage = computed(() => {
  return Math.ceil(users.value.length / pageSize) - 1
})

const page = computed(() => {
  const pos = pageSize * pageNumber.value
  return users.value.slice(pos, pos + pageSize)
})

const newUserName = ref('')
function addUser() {
  users.value.push(new User(newUserName.value))
  newUserName.value = ''
}
</script>

<template>
  <div>
    <ul>
      <li v-for="user in page" :key="user.name">
        {{ user.name }}
      </li>
    </ul>
  </div>
  <div>
    <button v-if="pageNumber > 0" @click="pageNumber--">-</button>
    <p>Page {{ pageNumber }}</p>
    <button v-if="pageNumber < lastPage" @click="pageNumber++">+</button>
  </div>
  <div>
    <input v-model="newUserName" />
    <button @click="addUser">Add User</button>
  </div>
</template>
