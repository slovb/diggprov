import { User } from '@/models/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref([new User('Alice'), new User('Bob'), new User('Lotta')])

  // TEMP: Blast in some data to test the pager
  for (let i = 0; i < 200; ++i) {
    users.value.push(new User('Name ' + i))
  }

  function addUser(user: User) {
    users.value.push(user)
  }

  return { users, addUser }
})
