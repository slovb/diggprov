import type { User } from '@/models/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'

const userStore = useUserStore()

/**
 * Store for paging
 *
 * Chocies:
 * 1. Making a page its own store:
 *    The list view was only concerned with the current page so it made sense for that to have a concept of a page.
 *    Then for the pager to be its own thing this needed to be communicated and a pinia store felt like the neat option.
 *
 * 2. PagesBefore, PagesAfter:
 *    Addind these made the pager easier to think about.
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
   * Return the pageNumber at which page the user is at or undefined
   *
   * @param user
   * @returns pageNumber containing the user or undefined if unknown user
   */
  function findPageNumberOfUser(user: User): number | undefined {
    const index = userStore.users.findIndex((candidate) => candidate.uuid === user.uuid)
    if (index === -1) {
      return undefined
    }
    return Math.floor(index / pageSize.value)
  }

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
    findPageOfUser: findPageNumberOfUser,
    setPageNumber,
  }
})
