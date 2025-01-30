<script setup lang="ts">
import { usePageStore } from '@/stores/page'
import { computed } from 'vue'

// When the number of pages is below this number, display all pages.
const displayAllLimit = 7 // Must be 7 or greater

const pageStore = usePageStore()

function decrement(): void {
  pageStore.setPageNumber(pageStore.pageNumber - 1)
}
function increment(): void {
  pageStore.setPageNumber(pageStore.pageNumber + 1)
}

function displayPageNumber(num: number): string {
  return String(num + 1)
}

// counter incremented on item creation
let itemId = 0

/**
 * an item will represent either:
 * 1. a link to a page displaying the pagenumber
 * 2. a text containing an ellipsis
 * 3. a text containing the currently active page
 */
class Item {
  // text to display to the user
  text: string

  // page number if it is a link
  pageNumber?: number

  // true if it is a link
  isLink: boolean

  // active if it is representing the currently active page
  active: boolean = false

  // key for the display loop
  id: number

  constructor(text: string, pageNumber?: number) {
    this.text = text
    this.pageNumber = pageNumber
    this.isLink = pageNumber !== undefined
    this.id = itemId++
  }
}

/**
 * Represents a link to a page dispalying the pagenumber
 */
class PageItem extends Item {
  constructor(pageNumber: number) {
    super(displayPageNumber(pageNumber), pageNumber)
  }
}

/**
 * Represetns an ellipsis for when there are big gaps in the range
 */
class EllipsisItem extends Item {
  constructor() {
    super('…')
  }
}

/**
 * Represents the currently active page as an item
 */
class CurrentItem extends Item {
  constructor() {
    super(displayPageNumber(pageStore.pageNumber))
    this.active = true
  }
}

// Make a list of all pages as items without any ellipsis such as 1 2 3 4
const allItems = computed(() => {
  const items: Item[] = []
  for (let i = 0; i < pageStore.pagesTotal; i++) {
    if (i != pageStore.pageNumber) {
      items.push(new PageItem(i))
    } else {
      items.push(new CurrentItem())
    }
  }
  return items
})

// Make a truncated list of items such as 1 ... 6 7 8 ... 19
const truncatedItems = computed(() => {
  // This was written assuming to be able to display 7 items and will be assembled as prefix.concat(middle).concat(postfix)
  const prefix: Item[] = []
  const middle: Item[] = []
  const postfix: Item[] = []

  /**
   * Prefix
   */
  if (pageStore.pagesBefore > 1) {
    // start if not current
    prefix.push(new PageItem(0))
    if (pageStore.pagesBefore > 3) {
      // ... if big gap
      prefix.push(new EllipsisItem())
    } else if (pageStore.pagesBefore == 3) {
      // start + 1 if precisely gap of 3
      prefix.push(new PageItem(1))
    }
  }

  /**
   * Postfix
   */
  if (pageStore.pagesAfter > 1) {
    // end if not current
    postfix.push(new PageItem(pageStore.pagesTotal - 1))
    if (pageStore.pagesAfter > 3) {
      // ... if big gap
      postfix.push(new EllipsisItem())
    } else if (pageStore.pagesAfter == 3) {
      // end - 1 if precisely gap of 3
      postfix.push(new PageItem(pageStore.pagesTotal - 2))
    }
    postfix.reverse()
  }

  /**
   * Middle
   */
  if (pageStore.pagesBefore > 0) {
    // current - 1 if able
    middle.push(new PageItem(pageStore.pageNumber - 1))
  }
  // current
  middle.push(new CurrentItem())
  if (pageStore.pagesAfter > 0) {
    // current + 1 if able
    middle.push(new PageItem(pageStore.pageNumber + 1))
  }

  // padding middle to make uniform length
  if (prefix.length < 2) {
    // short prefix
    let num = pageStore.pageNumber + 2
    while (prefix.length + middle.length < 5) {
      middle.push(new PageItem(num))
      num++
    }
  }
  if (postfix.length < 2) {
    // short postfix
    let num = pageStore.pageNumber - 2
    while (postfix.length + middle.length < 5) {
      middle.unshift(new PageItem(num))
      num--
    }
  }

  return prefix.concat(middle).concat(postfix)
})

// pick the truncated list of items if there would be too many otherwise
const items = computed(() => {
  if (pageStore.pagesTotal > displayAllLimit) {
    return truncatedItems.value
  }
  return allItems.value
})
</script>

<template>
  <ul class="pager">
    <li>
      <a href="#" v-if="pageStore.pagesBefore > 0" @click.prevent="decrement">&lt;</a>
      <span v-else>&lt;</span>
    </li>
    <li v-for="item in items" :key="item.id" :class="{ active: item.active }">
      <a v-if="item.isLink" href="#" @click.prevent="pageStore.setPageNumber(item.pageNumber!)">{{
        item.text
      }}</a>
      <span v-else>{{ item.text }}</span>
    </li>
    <li>
      <a href="#" v-if="pageStore.pagesAfter > 0" @click.prevent="increment">&gt;</a>
      <span v-else>&gt;</span>
    </li>
  </ul>
</template>

<style>
.pager {
  font-family: 'Consolas', 'Courier New', Courier, monospace;
  font-size: 20px;
  line-height: 26px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.pager li {
  display: inline-block;
  margin: 0 2px;
  padding: 0;
  text-align: center;
  vertical-align: middle;
}
.pager a,
.pager span {
  border-radius: 3px;
  box-sizing: border-box;
  display: inline-block;
  min-height: 32px;
  min-width: 32px;
  padding: 8px;
  user-select: none;
  width: 100%;
}
.pager .active {
  font-weight: bold;
}
</style>
