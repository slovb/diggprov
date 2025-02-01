import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'

const userStore = useUserStore()

/**
 * Store for paging
 */
export const usePageStore = defineStore('page', () => {
  // Hide the actual page number to limit the interface
  // Excessive in retrospect, but I was considering experimenting with debounce and spinning loaders
  const _pageNumber = ref(0)

  /**
   * Page number, computed to limit the interactions
   */
  const pageNumber = computed(() => {
    return _pageNumber.value
  })

  /**
   * Size of a page
   */
  const pageSize = ref(20)

  /**
   * Total number of pages
   */
  const pagesTotal = computed(() => {
    return Math.ceil(userStore.users.length / pageSize.value)
  })

  /**
   * Number of pages before the current one
   */
  const pagesBefore = computed(() => {
    // clamp between 0 and pagesTotal
    return Math.max(0, Math.min(pageNumber.value, pagesTotal.value))
  })

  /**
   * Number of pages after the current one
   */
  const pagesAfter = computed(() => {
    // clamp between 0 and pagesTotal
    return Math.max(0, Math.min(pagesTotal.value - pageNumber.value - 1, pagesTotal.value))
  })

  /**
   * Page is a list of at most pageSize number of users, jumping pageNumber of pages into the list
   */
  const page = computed(() => {
    const start = pageNumber.value * pageSize.value
    const end = start + pageSize.value
    return userStore.users.slice(start, end)
  })

  /**
   * Set the page number
   *
   * @param num new page number
   */
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
