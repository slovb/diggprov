import type { User } from '@/models/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { usePageStore } from './page'

const pageStore = usePageStore()

export const useSelectedUserStore = defineStore('selectedUser', () => {
  const _user = ref<User | undefined>(undefined)

  const user = computed(() => {
    return _user.value
  })

  const isSelected = computed(() => {
    return _user.value !== undefined
  })

  function selectUser(user: User) {
    _user.value = user

    // flip to that users page
    const pageNumber = pageStore.findPageOfUser(user)
    if (pageNumber !== undefined) {
      pageStore.setPageNumber(pageNumber)
    }
  }

  function unselectUser() {
    _user.value = undefined
  }

  return { isSelected, user, selectUser, unselectUser }
})
