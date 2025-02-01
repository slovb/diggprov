import { User, userComparison } from '@/models/user'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

const API_URL = 'http://localhost:8080/digg/user/'

/**
 * Manage the list of users
 */
export const useUserStore = defineStore('user', () => {
  /**
   * List of all the users
   */
  const users: Ref<User[]> = ref([])

  /**
   * True if api requests are in progress
   */
  const loading = ref(false)

  /**
   * Send a GET request to the API, interpret the data and sort it
   */
  async function refreshData() {
    loading.value = true
    const newUsers: User[] = await (await fetch(API_URL)).json()
    newUsers.sort(userComparison)
    users.value = newUsers
    loading.value = false
  }

  /**
   *
   * @param user
   */
  function addUser(user: User) {
    const newUsers = users.value.concat([user])
    newUsers.sort(userComparison)
    users.value = newUsers
  }

  /**
   * Send a POST request with the user data to the backend trying to create a user.
   *
   * If successful return true and add the user to users
   *
   * @param name
   * @param address
   * @param email
   * @param telephone
   * @returns true if successful
   */
  async function createUser(
    name: string,
    address: string,
    email: string,
    telephone: string,
  ): Promise<boolean> {
    loading.value = true

    // Make POST
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

    // Deal with the response
    // Error messaging is done through alerts, may develop Message component later
    if (response.status == 201) {
      const location = response.headers.get('Location')
      const parts = location?.split('/')
      const uuid = parts?.pop()
      if (uuid === undefined) {
        alert('Error, got empty UUID from backend')
        return false
      }

      // May consider refetching this User later
      addUser(new User(name, address, email, telephone, uuid))
      console.log(uuid)
    } else if (response.status == 400) {
      // TODO handle errors
      alert('Bad request, did you forget a parameter?')
      return false
    } else if (response.status == 403) {
      // TODO handle errors
      alert('Error, user already exists')
      return false
    } else {
      alert('Error, unknown cause')
      return false
    }
    return true
  }

  // Immediately refresh data, should possibly be handled in a watcher exposing an
  // interface for requesting refreshes that is not async
  refreshData()

  return { users, loading, createUser }
})
