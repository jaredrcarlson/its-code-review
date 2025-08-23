<template>
    <div class="container-fluid" v-if="account.id">
        <section class="row h-100">
            <div class="col-md-7 col-12">
                <div class="px-2">
                    <form id="v-step-0" @submit.prevent="searchBooks">
                        <div class="my-3">
                            <label for="searchBooks" class="fs-3 form-label">Add books to your club!</label>
                            <div class="d-flex me-5">
                                <input v-model="searchQuery" required type="text" id="searchBooks" minlength="2"
                                    maxlength="50" class="form-control" placeholder="Search books...">
                                <button class="btn orange-btn">
                                    <i class="mdi mdi-magnify"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                    <div v-if="books.length > 0" class="search-list d-flex flex-wrap">
                        <img @click="selectBook(index)" v-for="(book, index) in books" class="m-1" :key="book.gbid"
                            :src="book.imgUrl" alt="">
                    </div>
                </div>
            </div>
            <div class="details-section col-md-5 col-12">
                <section v-if="selectedBook" class="row h-100 py-5">
                    <div class="col-5">
                        <img class="img-fluid" :src="selectedBook.imgUrlLarge" alt="">
                    </div>
                    <div class="col-7 h-100">
                        <div class="d-flex flex-column h-100">
                            <h2>{{ selectedBook.title }} {{ selectedBook.subtitle }}</h2>
                            <h3>By <span v-for="author in selectedBook.authors" :key="author">{{ author }}</span></h3>
                            <p class="book-description">{{ selectedBook.description }}</p>
                            <p class="mb-0">{{ selectedBook.pageCount }} Pages</p>
                            <p class="mb-0">Published {{ selectedBook.publishedDate.toLocaleDateString() }}</p>
                            <!-- <p class="mb-0">Clubs that have read this book: 10</p>
                        <p class="mb-0">Clubs reading this book: 3</p> -->
                            <button id="v-step-1" v-if="!booksToAdd.includes(selectedBook)" @click="addBookToList"
                                class="btn orange-btn ms-auto">Add To List</button>
                            <button v-else @click="removeBookFromList" class="btn orange-btn ms-auto">Remove From
                                List</button>
                        </div>
                    </div>
                </section>
            </div>

            <div class="col-12 p-3 form-section text-white dark-blue-bg h-100">
                <section class="row">
                    <div class="col-12 form-header flex-shrink-1">
                        <h2 id="v-step-2">Create a Club</h2>
                    </div>
                    <div class="col-md-5 col-12 px-4">
                        <h4 class="mb-2">Current Book List</h4>
                        <div class="list-section ghost-bg">
                            <ul v-if="booksToAdd.length > 0" class="book-list">
                                <li v-for="(book, index) in booksToAdd" :key="book.gbid + book.title"
                                    class="d-flex justify-content-between align-items-center">
                                    <p @click="selectBook(index)" class="selectable"><span>{{ book.title }} {{
                                        book.subtitle }}</span> by <span v-for="author in book.authors" :key="author">{{
        author }}</span></p>
                                    <i @click="removeBookFromList(index)" class="mdi trash mdi-trash-can-outline fs-3"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-7 col-12 py-4">
                        <form @submit.prevent="createClub" class="d-flex flex-column">
                            <div class="mb-3">
                                <label for="clubName" class="form-label">Club Name</label>
                                <input v-model="editable.name" type="text" required minlength="3" maxlength="40"
                                    class="form-control" id="" aria-describedby="helpId" placeholder="Club Name">
                            </div>
                            <div class="mb-3">
                                <label for="clubImageURL" class="form-label">Club Cover Image</label>
                                <input v-model="editable.coverImg" type="url" required minlength="3" maxlength="300"
                                    class="form-control" id="clubImageURL" aria-describedby="helpId"
                                    placeholder="Club Image URL">
                            </div>
                            <div class="mb-3">
                                <label for="clubDescription" class="form-label">Club Description</label>
                                <textarea v-model="editable.description" type="text" required minlength="3" maxlength="750"
                                    class="form-control" id="clubDescription" aria-describedby="helpId"
                                    placeholder="Club Description"></textarea>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div class="form-check">
                                    <input v-model="editable.private" class="form-check-input" type="checkbox"
                                        id="clubPrivate">
                                    <label class="form-check-label" for="clubPrivate">
                                        Is this a Private Club?
                                    </label>
                                </div>
                                <button type="submit" class="ms-auto btn orange-btn">Create Club</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </section>
    </div>
    <div class="container-fluid" v-else>
        <section class="row">
            <div class="col-12 text-center my-3">
                <div class="dark-blue-bg text-light p-2 rounded elevation-3">
                    <h2>
                        Please log in or sign up to create a book club!
                    </h2>
                </div>
            </div>
        </section>
    </div>
    <Tour v-if="account.needsTour" :steps="steps" :callbacks="tourCallBacks" />
</template>

<script>
import { ref, computed, onUnmounted, onMounted } from 'vue';
import { booksService } from '../services/BooksService'
import { clubsService } from '../services/ClubsService'
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { accountService } from "../services/AccountService.js";
import { useRouter } from 'vue-router';

export default {
    setup() {
        const searchQuery = ref("")
        const router = useRouter()
        const editable = ref({})
        const booksToAdd = computed(() => AppState.booksToAdd)
        function clearBooks() {
            try {
                booksService.clearBooks()
                booksService.clearSelectedBook()
            } catch (error) {
                logger.log(error)
                Pop.error(error.message)
            }
        }

        onMounted(() => {
            clearBooks()
        })

        onUnmounted(() => {
            clearBooks()
        })
        return {
            steps: [
                {
                    target: '#v-step-0',
                    header: {
                        title: "Let's get started making a bookclub!"
                    },
                    content: "First, search through books and select one to add to your club, the details will appear on the right"
                },
                {
                    target: '#v-step-1',
                    content: "Next, click here to add the first book to the list"
                },
                {
                    target: '#v-step-2',
                    content: "Finally, fill out the details below to make your club official."
                },
            ],
            tourCallBacks: {
                onSkip: (() => accountService.editAccount({ needsTour: false }))
            },
            async searchBooks() {
                try {
                    booksService.searchBooks({ q: searchQuery.value })
                } catch (error) {
                    logger.log(error)
                    Pop.error(error.message)
                }
            },
            async selectBook(index) {
                try {
                    booksService.selectBook(index)
                } catch (error) {
                    logger.log(error)
                    Pop.error(error.message)
                }
            },
            addBookToList() {
                try {
                    booksService.addBookToList()
                } catch (error) {
                    logger.log(error)
                    Pop.error(error.message)
                }
            },
            removeBookFromList(index) {
                try {
                    booksService.removeBookFromList(index)
                } catch (error) {
                    logger.log(error)
                    Pop.error(error.message)
                }
            },
            async createClub() {
                try {
                    const club = await clubsService.createClub(editable.value)
                    for (let i = 0; i < booksToAdd.value.length; i++) {
                        const bookData = { ...booksToAdd.value[i], author: booksToAdd.value[i].authors[0], clubId: club._id }
                        booksService.createClubBook(bookData)
                    }
                    editable.value = {}
                    await clubsService.getMyClubs()
                    router.push({ name: 'Club About Page', params: { clubId: club.id } })
                } catch (error) {
                    logger.log(error)
                    Pop.error(error.message)
                }
            },
            searchQuery,
            editable,
            books: computed(() => AppState.books),
            selectedBook: computed(() => AppState.selectedBook),
            booksToAdd,
            account: computed(() => AppState.account)
        }
    }
}
</script>

<style lang="scss" scoped>
.book-description {
    height: 50%;
    overflow-y: scroll;
}

.details-section {
    height: 80dvh;
}

.form-section {
    height: 75dvh;
}

.list-section {
    height: 55dvh;
    border-radius: 1.25rem;
    padding: .75rem;
    overflow-y: scroll;
}

.book-list {
    padding: 0;
    list-style: none;
    color: black;
}

.search-list {
    height: 55dvh;
    overflow-y: scroll;
}

textarea {
    resize: none;
    height: 25dvh;
}

.trash {
    color: red;
}

.trash:hover {
    color: rgb(180, 1, 1);
    cursor: pointer;
}</style>