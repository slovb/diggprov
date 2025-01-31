import { User } from '@/models/user'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

const API_URL = 'http://localhost:8080/digg/user/'

function userComparison(a: User, b: User) {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  if (a.address < b.address) {
    return -1
  }
  if (a.address > b.address) {
    return 1
  }
  return 0
}

export const useUserStore = defineStore('user', () => {
  const users: Ref<User[]> = ref([])
  const loading = ref(false)

  async function refreshData() {
    loading.value = true
    const newUsers: User[] = await (await fetch(API_URL)).json()
    newUsers.sort(userComparison)
    users.value = newUsers
    loading.value = false
  }
  refreshData()

  function addUser(user: User) {
    const newUsers = users.value.concat([user])
    newUsers.sort(userComparison)
    users.value = newUsers
  }

  async function createUser(name: string, address: string, email: string, telephone: string) {
    loading.value = true
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        address: address,
        email: email,
        telephone: telephone,
      }),
    })
    if (response.status == 201) {
      const location = response.headers.get('Location')
      const parts = location?.split('/')
      const uuid = parts?.pop()
      // May consider refetching this User later
      addUser(new User(name, address, email, telephone, uuid))
      console.log(uuid)
    } else if (response.status == 403) {
      // TODO handle errors
      alert('Error, duplicate user')
    } else {
      alert('Error, unknown cause')
    }
  }

  return { users, loading, createUser }
})
