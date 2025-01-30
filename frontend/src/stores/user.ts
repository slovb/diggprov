import { User } from '@/models/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref([new User('Alice'), new User('Bob'), new User('Lotta')])

  function addUser(user: User) {
    users.value.push(user)
  }

  return { users, addUser }
})
