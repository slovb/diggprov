import { getUsers } from '@/api'
import { User, userComparison } from '@/models/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getMessageStore } from './message'

const log = getMessageStore()

/**
 * Manage the list of users
 */
export const useUserStore = defineStore('user', () => {
  /**
   * List of all the users
   */
  const _users = ref<User[]>([])

  /**
   * Sorted list of all the users
   */
  const users = computed(() => {
    return _users.value.concat().sort(userComparison)
  })

  // internal loading counter
  const _loadingCounter = ref(0)

  /**
   * True if api requests are in progress
   */
  const loading = computed(() => _loadingCounter.value === 0)

  /**
   * Start loading
   */
  function startLoading() {
    _loadingCounter.value += 1
  }

  /**
   * Stop loading
   */
  function stopLoading() {
    _loadingCounter.value = Math.min(_loadingCounter.value - 1, 0)
  }

  /**
   * Add a user to users
   *
   * @param user
   */
  function addUser(user: User) {
    _users.value.push(user)
  }

  /**
   * Update first user with the same uuid as the given user
   *
   * @param user new user details
   */
  function updateUser(user: User) {
    const index = _users.value.findIndex((u) => u.uuid == user.uuid)
    if (index !== -1) {
      const toUpdate = _users.value[index]
      toUpdate.name = user.name
      toUpdate.address = user.address
      toUpdate.email = user.email
      toUpdate.telephone = user.telephone
    }
  }

  /**
   * Remove first user with the same uuid as the given user
   *
   * @param user user to remove
   */
  function removeUser(user: User) {
    const index = _users.value.findIndex((u) => u.uuid == user.uuid)
    if (index !== -1) {
      _users.value.splice(index, 1)
    }
  }

  /**
   * Initially load the users from the API
   */
  async function initialize() {
    startLoading()
    try {
      _users.value = await getUsers()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error)
        log.addError(error.message)
      } else {
        throw error
      }
    }
    stopLoading()
  }
  initialize() // no await

  return { users, loading, addUser, updateUser, removeUser, startLoading, stopLoading }
})
