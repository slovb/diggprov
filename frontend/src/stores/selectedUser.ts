import type { User } from '@/models/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { usePageStore } from './page'

const pageStore = usePageStore()

/**
 * Store for the selected user
 *
 * This is needed for edits and deletes to know what to operate on
 */
export const useSelectedUserStore = defineStore('selectedUser', () => {
  // internal data
  const _user = ref<User | undefined>(undefined)

  /**
   * The user as computed so that no direct changes can be made
   */
  const user = computed(() => {
    return _user.value
  })

  /**
   * Return true if something is selected
   */
  const isSelected = computed(() => {
    return _user.value !== undefined
  })

  /**
   * Select the given user and set the page number to their page
   *
   * @param user
   */
  function selectUser(user: User) {
    _user.value = user

    // flip to that users page
    const pageNumber = pageStore.findPageOfUser(user)
    if (pageNumber !== undefined) {
      pageStore.setPageNumber(pageNumber)
    }
  }

  /**
   * Unselect the user
   */
  function unselectUser() {
    _user.value = undefined
  }

  return { isSelected, user, selectUser, unselectUser }
})
