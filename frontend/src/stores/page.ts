import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'

const userStore = useUserStore()

export const usePageStore = defineStore('page', () => {
  // Hide the actual page number to limit the interface
  const _pageNumber = ref(0)
  const pageNumber = computed(() => {
    return _pageNumber.value
  })

  const pageSize = ref(20)

  const pagesTotal = computed(() => {
    return Math.ceil(userStore.users.length / pageSize.value)
  })

  const pagesBefore = computed(() => {
    // clamp between 0 and pagesTotal
    return Math.max(0, Math.min(pageNumber.value, pagesTotal.value))
  })

  const pagesAfter = computed(() => {
    // clamp between 0 and pagesTotal
    return Math.max(0, Math.min(pagesTotal.value - pageNumber.value - 1, pagesTotal.value))
  })

  const page = computed(() => {
    const start = pageNumber.value * pageSize.value
    const end = start + pageSize.value
    return userStore.users.slice(start, end)
  })

  function setPageNumber(num: number) {
    _pageNumber.value = num
  }

  return {
    page,
    pageNumber,
    pageSize,
    pagesAfter,
    pagesBefore,
    pagesTotal,
    setPageNumber,
  }
})
