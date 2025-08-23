<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 d-md-flex justify-content-between">
          <div class="flex-grow-1 ms-md-3 mt-2 mt-md-3">
            <div class="ms-1 text-muted">
              <div v-if="searchType == 'isbn'">International Standard Book Number</div>
              <div v-else-if="searchType == 'lccn'">Library of Congress Control Number</div>
              <div v-else-if="searchType == 'oclc'">Online Computer Library Center Number</div>
              <div v-else>Book Search</div>
            </div>
            <form class="d-flex" @submit.prevent="search()">
              <select v-model="searchType" class="px-2 rounded-start rounded-end-0 dark-blue-bg text-light">
                <option selected value="keyword">Keyword</option>
                <option value="isbn">ISBN</option>
                <option value="lccn">LCCN</option>
                <option value="oclc">OCLC</option>
              </select>
              <input v-model="query" class="border-end-0 rounded-start-0 rounded-end-0 form-control shadow-none" type="text" placeholder="Search" required>
              <div @click="search()" class="selectable border-0 rounded-end d-flex align-items-center text-light orange-bg"><i class="mdi mdi-magnify fs-4 mx-3"></i></div>
            </form>
          </div>
          <div v-if="searchType == 'keyword'" class="flex-grow-1 mt-2 mt-md-3 mx-md-4">
            <div class="ms-1 text-muted">Narrow Your Search</div>
            <form class="d-flex" @submit.prevent="addQueryTerm()">
              <select v-model="queryTermType" class="rounded-start px-2 dark-blue-bg text-light">
                <option v-for="opt in queryTermTypeOptions" :key="opt.key" :value="opt.key">{{ opt.label }}</option>
              </select>
              <input v-model="queryTerm" class="border-end-0 rounded-start-0 rounded-end-0 form-control shadow-none" type="text" placeholder="includes ..." required>
              <div @click="addQueryTerm()" class="selectable border-0 rounded-end d-flex align-items-center text-light light-blue-bg"><i class="mdi mdi-plus fs-4 mx-3"></i></div>
            </form>
          </div>
          <div class="d-flex mt-2 mt-md-3 align-items-center">
            <div class="me-3">
              <div class="ms-1 text-muted">Print Type</div>
              <select @change="search()" v-model="queryParams.printType" class="px-1 rounded dark-blue-bg text-light pt-1 pb-1">
                <option value="books">Books</option>
                <option value="magazines">Magazines</option>
                <option value="all">All</option>
              </select>
            </div>
            <div class="me-md-3">
              <div class="ms-1 text-muted">Order By</div>
              <select @change="search()" v-model="queryParams.orderBy" class="px-1 rounded dark-blue-bg text-light pt-1 pb-1">
                <option value="newest">Newest</option>
                <option value="relevance">Relevance</option>
              </select>
            </div>
        </div>
      </div>
    </section>
    <section v-if="searchType == 'keyword'" class="row">
      <div class="col-12 d-md-flex align-items-center">
        <div v-for="(termString, termType, i) in queryTerms" :key="`a${i}`" class="ms-md-3 d-flex mt-2 mt-md-3">
          <div @click="removeQueryTermType(termType)" class="selectable rounded-start bg-danger text-light px-2 d-flex align-items-center"><i class="mdi mdi-trash-can-outline"></i></div>
          <div class="rounded-end dark-blue-bg text-light px-2">
            <div class="d-flex py-2">
              <div class="mx-1">{{ termType }}</div>
              <div class="rounded fw-bold mx-1">
                <i class="mdi mdi-arrow-right-bold"></i>
              </div>
              <div v-for="(term, i) in termString.split(`+${getTermTypeKey(termType)}:`)" :key="`b${i}`">
                <div v-if="i != 0" class="d-flex">
                  <div class="rounded-start light-blue-bg text-light ms-1 px-2">{{ term }}</div>
                  <div @click="removeQueryTerm(termType, term)" class="selectable rounded-end bg-danger text-light me-1 px-1"><i class="mdi mdi-close-thick"></i></div>
                  <div v-if="i+1 != termString.split(`+${getTermTypeKey(termType)}:`).length" class="mx-1">
                    <i class="mdi mdi-plus-thick"></i>
                  </div>
                </div>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="row mt-2 p-md-3">
      <div v-for="book in books" :key="book.id" class="col-md-1 col-6 my-1">
        <router-link :to="{name: 'Book Details', params: { gbId: book.gbId }}">
          <img class="img-fluid book-img rounded elevation-2" :src="book.imgUrl" :title="book.title">
        </router-link>           
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onUnmounted, ref } from 'vue';
import { booksService } from '../services/BooksService.js';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
  setup(){
    const searchType = ref('keyword')
    const queryParams = ref({
      printType: 'books',
      orderBy: 'newest'
    })
    const queryString = ref('')
    const query = ref('')
    const queryTermTypeOptions = [
      {key: 'intitle', label: 'Title'},
      {key: 'inauthor', label: 'Author'},
      {key: 'inpublisher', label: 'Publisher'},
      {key: 'subject', label: 'Category'},
    ]
    const queryTermType = ref('intitle')
    const queryTerm = ref('')
    const queryTerms = ref({})
    
    const queryFields = computed(() => {
      let queryFieldItems = []
      for (const term of Object.values(queryTerms.value)) {
        queryFieldItems.push(term)
      }
      return queryFieldItems
    })

    function getTermTypeKey(termTypeLabel) {
      const option = queryTermTypeOptions.find(option => option.label == termTypeLabel)
      return option.key
    }
    
    function addQueryTerm() {
      queryTerm.value = queryTerm.value.trim()
      queryTerm.value.replace(' ', '+')
      const queryTermTypeOption = queryTermTypeOptions.find(option => option.key == queryTermType.value)
      const label = queryTermTypeOption.label
      if (label in queryTerms.value) {
        queryTerms.value[label] += `+${queryTermType.value}:${queryTerm.value}`
      } else {
        queryTerms.value[label] = `+${queryTermType.value}:${queryTerm.value}`
      }
      queryTerm.value = ''
      search()
    }

    function removeQueryTerm(termType, term) {
      let terms = queryTerms.value[termType].split(`+${getTermTypeKey(termType)}:`)
      terms = terms.filter(splitTerm => splitTerm != term).join(`+${getTermTypeKey(termType)}:`)
      if (terms != '') {
        queryTerms.value[termType] = terms
        search()
      } else {
        removeQueryTermType(termType)
      }
    }

    function removeQueryTermType(termType) {
      delete queryTerms.value[termType]
      search()
    }

    function updateQueryString() {
      queryString.value = query.value
      queryFields.value.forEach(term => queryString.value += term)
    }

    async function search() {
      clearBooks()
      updateQueryString()
      try {
        if (queryString.value == '') { return }
        if (searchType.value != 'keyword') {
          queryString.value = `+${searchType.value}:${query.value}`
        }
        const params = { q: queryString.value, printType: queryParams.value.printType, orderBy: queryParams.value.orderBy }
        await booksService.searchBooks(params)
        if (!AppState.books.length) {
          Pop.toast('No Results', 'info')
        } 
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }

    const activeBook = ref({})
    function setActiveBook(book) {
      activeBook.value = book
    }

    function clearBooks() {
      try {
        booksService.clearBooks()
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }

    onUnmounted(() => {
      clearBooks()
    })

    return {
      searchType,
      queryString,
      queryFields,
      queryTermType,
      queryTermTypeOptions,
      queryTerm,
      queryTerms,
      queryParams,
      query,
      books: computed(() => AppState.books),
      activeBook,
      setActiveBook,
      addQueryTerm,
      removeQueryTerm,
      removeQueryTermType,
      getTermTypeKey,
      search
    }
  }
}
</script>


<style lang="scss" scoped>
.book-img {
  width: 100%;
  height: 100%;
}
</style>
