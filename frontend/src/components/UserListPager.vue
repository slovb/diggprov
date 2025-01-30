<script setup lang="ts">
import { usePageStore } from '@/stores/page'

const pageStore = usePageStore()

function decrement(): void {
  pageStore.setPageNumber(pageStore.pageNumber - 1)
}
function increment(): void {
  pageStore.setPageNumber(pageStore.pageNumber + 1)
}

function displayPageNumber(num: number) {
  return num + 1
}
</script>

<template>
  <ul class="pager">
    <li>
      <a href="#" v-if="pageStore.pagesBefore > 0" @click.prevent="decrement">&lt;</a>
      <span v-else>&lt;</span>
    </li>
    <li v-if="pageStore.pagesBefore > 0">
      <a href="#" @click.prevent="pageStore.setPageNumber(0)">{{ displayPageNumber(0) }}</a>
    </li>
    <li v-if="pageStore.pagesBefore > 2"><span>&hellip;</span></li>
    <li v-if="pageStore.pagesBefore > 1">
      <a href="#" @click.prevent="decrement">{{ displayPageNumber(pageStore.pageNumber - 1) }}</a>
    </li>
    <li class="active">
      <span>{{ displayPageNumber(pageStore.pageNumber) }}</span>
    </li>
    <li v-if="pageStore.pagesAfter > 1">
      <a href="#" @click.prevent="increment">{{ displayPageNumber(pageStore.pageNumber + 1) }}</a>
    </li>
    <li v-if="pageStore.pagesAfter > 2"><span>&hellip;</span></li>
    <li v-if="pageStore.pagesAfter > 0">
      <a href="#" @click.prevent="pageStore.setPageNumber(pageStore.pagesTotal - 1)">{{
        pageStore.pagesTotal
      }}</a>
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
  text-align: center;
  margin: 0 2px;
  padding: 0;
  vertical-align: middle;
}
.pager a,
.pager span {
  display: inline-block;
  box-sizing: border-box;
  border-radius: 3px;
  min-height: 32px;
  width: 100%;
  min-width: 32px;
  padding: 8px;
}
.pager .active {
  font-weight: bold;
}
</style>
