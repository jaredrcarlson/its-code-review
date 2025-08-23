<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div v-if="book" class="row mt-4">
          <div class="col-12 col-md-5 d-flex justify-content-md-center">
            <img class="img-fluid book-img rounded elevation-2" :src="book.imgUrlLarge" alt="">
          </div>
          <div class="col-7 h-100">
            <div class="d-flex flex-column h-100">
              <div class="fs-4 fw-bold">{{book.title}}</div>
              <div class="fs-5 fw-bold">{{ book.subtitle }}</div>
              <div class="fs-5">By <span>{{ book.author }}</span></div>
              
              <!-- SECTION BOOK DETAILS -->
              <div class="mt-2 d-flex justify-content-between">
                <!-- BOOK SCORE -->
                <div class="text-center me-2 mb-2">
                  <div class="text-light light-blue-bg rounded px-2">Score</div>
                  <div class="fw-bold">{{ bookScore }}</div>
                  <small v-if="bookScoreUserCount == 1" class="text-muted">{{ bookScoreUserCount }} User</small>
                  <small v-else class="fw-bold text-muted">{{ bookScoreUserCount }} Users</small>
                </div>
                <!-- USER (SHOW / HIDE) <==> (LOGIN / LOGOUT) -->
                <div v-if="user.id">
                  <div class="d-flex justify-content-around">
                    <!-- USER > BOOK RATING -->
                    <div v-if="userHasThisBook" class="text-center pe-2">
                      <div class="text-light light-blue-bg rounded px-2">Rating</div>
                      <select @change="updateUserBookRating()" v-model="userBookData.rating" class="fw-bold form-select form-select-sm ghost-bg border-0 rounded-start shadow-none selectable" aria-label=".form-select-sm rating">
                        <option value="0">Not Rated</option>
                        <option v-for="option in ratingOptions" :key="option.rating" :value="option.rating">
                          {{ option.rating }} - {{ option.description }}
                        </option>  
                      </select>
                    </div>
                    <!-- USER > MY PROGRESS -->
                    <div v-if="userHasThisBook" class="text-center pe-2">
                      <div class="text-light light-blue-bg rounded px-2">Progress</div>
                      <select @change="updateUserBookStatus()" v-model="userBookData.status" class="fw-bold form-select form-select-sm ghost-bg border-0 rounded-start shadow-none selectable" aria-label=".form-select-sm status">
                          <option value="planned">Plan To Read</option>
                          <option value="reading">Currently Reading</option>
                          <option value="finished">Finished</option>
                      </select>
                    </div>
                    <!-- USER > [ADD TO, REMOVE FROM] BOOK LISTS -->
                    <div class="d-flex justify-content-around">
                      <div class="me-2">
                        <button @click="openBookListsModal()" type="button" class="btn orange-btn">
                          <div class="d-flex align-items-center">
                            <i class="mdi mdi-list-status fs-5 pe-2"></i>
                            <div>Lists</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- BOOK DESCRIPTION -->
              <div class="description-section">
                <div class="mt-2 fs-5 fw-bold">Description</div>
                <small v-html="book.description" class="pe-3"></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- SECTION NAVIGATION TABS -->
    <div class="row mt-3 g-1">
      <!-- CLUBS CURRENTLY READING BOOK -->
      <div class="col-3 text-center selectable">
        <div class="tab-text text-light px-2 pt-1 rounded-top" :class="{ 'bg-dark': selectedTab != 'reading', 'dark-blue-bg': selectedTab == 'reading'}" @click="selectTab('reading')">Clubs Currently Reading</div>
      </div>
      <!-- CLUBS PLANNING TO READ BOOK -->
      <div class="col-3 text-center selectable">
        <div class="tab-text text-light px-2 pt-1 rounded-top" :class="{ 'bg-dark': selectedTab != 'planned', 'dark-blue-bg': selectedTab == 'planned'}" @click="selectTab('planned')">Clubs Planning To Read</div>
      </div>
      <!-- CLUBS FINISHED READING BOOK -->
      <div class="col-4 text-center selectable">
        <div class="tab-text text-light px-2 pt-1 rounded-top" :class="{ 'bg-dark': selectedTab != 'finished', 'dark-blue-bg': selectedTab == 'finished'}" @click="selectTab('finished')">Clubs Finished Reading</div>
      </div>
      <!-- USER BOOK REVIEWS -->
      <div class="col-2 text-center selectable">
        <div class="tab-text text-light px-2 pt-1 rounded-top"  :class="{ 'bg-dark': selectedTab != 'reviews', 'dark-blue-bg': selectedTab == 'reviews'}" @click="selectTab('reviews')">User Reviews</div>
      </div>
    </div>


    <!-- SECTION NAVIGATION TAB CONTENT -->
    <div class="row">
      <div class="col-12">
        <div class="dark-blue-bg p-2">
          <!-- CLUBS CURRENTLY READING BOOK -->
          <div v-if="selectedTab == 'reading'" class="bg-dark">
            <div v-if="!clubsReading.length">
              <div class="p-2">There are no clubs currently reading this book.</div>
            </div>
            <div v-else class="row py-2">
              <div v-for="club in clubsReading" :key="club.id" class="col-4 card-height">
                <BookClubCard :clubProp="club" />
              </div>
            </div>
          </div>
          <!-- CLUBS PLANNING TO READ BOOK -->
          <div v-else-if="selectedTab == 'planned'" class="bg-dark">
            <div v-if="!clubsPlanned.length">
              <div class="p-2">There are no clubs planning to read this book.</div>
            </div>
            <div v-else class="row py-2">
              <div v-for="club in clubsPlanned" :key="club.id" class="col-4 card-height">
                <BookClubCard :clubProp="club" />
              </div>
            </div>
          </div>
          <!-- CLUBS FINISHED READING BOOK -->
          <div v-else-if="selectedTab == 'finished'" class="bg-dark">
            <div v-if="!clubsFinished.length">
              <div class="p-2">There are no clubs finished reading this book.</div>
            </div>
            <div v-else class="row py-2">
              <div v-for="club in clubsFinished" :key="club.id" class="col-4 card-height">
                <BookClubCard :clubProp="club" />
              </div>
            </div>
          </div>
          <!-- USER BOOK REVIEWS -->
          <div v-else-if="selectedTab == 'reviews'" class="bg-dark">
            <div v-if="user.id && userHasThisBook && !userReviewedStatus">
              <div class="px-3 py-2">
                <button class="btn btn-sm orange-btn" type="button" data-bs-toggle="collapse" data-bs-target="#bookReviewForm" aria-expanded="false" aria-controls="bookReviewForm">
                  Add Review
                </button>
              </div>             
              <div class="collapse" id="bookReviewForm">
                <div class="card mx-3">
                  <div class="card-body">
                    <form @submit.prevent="createReview()">
                      <div class="row mb-3">
                        <div class="col-3 d-flex align-items-center">
                          <img class="user-img" :src="account.picture || user.picture" :alt="account.name" :title="account.name">
                          <div class="ms-2 fw-bold">{{ account.name }}</div>
                        </div>
                        <div class="col-5">
                        </div>
                        <div class="col-4">
                          <!-- <div class="my-0 ps-2 form-text">Recommendation</div> -->
                          <div class="d-flex align-items-center justify-content-around">
                            <div class="me-2">
                              <select v-model="userReviewData.rating" class="form-select" aria-label="Rating" required>
                                <option value="Recommended">Recommend</option>
                                <option value="Mixed Feelings">Mixed Feelings</option>
                                <option value="Not Recommended">Not Recommended</option>
                              </select>
                            </div>
                            <div class="">
                              <button type="submit" class="py-0 px-2 btn btn-sm btn-success">
                                <i class="mdi mdi-send-circle-outline fs-4"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <textarea v-model="userReviewData.content" class="mb-2 pb-2 form-control" rows="3" placeholder="add review..." required></textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!userReviews.length">
              <div class="p-2">There are no reviews for this book.</div>
            </div>
            <div v-else class="pt-2">
              <div v-for="(review, index) in userReviews" :key="index" class="col-12 pb-2">
                <div class="mx-3 rounded dark-blue-bg">
                  <div class="p-3 text-light">
                      <div class="row mb-3">
                        <div class="col-3 d-flex align-items-center">
                          <img class="user-img" :src="review.creator.picture" :alt="review.creator.name" :title="review.creator.name">
                          <div class="ms-2">
                            <div class="fw-bold">{{ review.creator.name }}</div>
                            <small class="text-secondary">Posted {{ review.createdAt.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) }}</small>
                          </div>
                        </div>
                        <div class="col-9 d-flex flex-column align-items-end">
                          <div class="d-flex align-items-center">
                            <div v-if="reviewEditMode">
                                <div class="d-flex align-items-center">
                                  <div>
                                    <select v-model="userReviewData.rating" class="form-select form-control input-sm" aria-label="Rating" required>
                                      <option value="Recommended">Recommend</option>
                                      <option value="Mixed Feelings">Mixed Feelings</option>
                                      <option value="Not Recommended">Not Recommended</option>
                                    </select>
                                  </div>
                                  <div class="">
                                    <button class="mx-2 btn btn-sm btn-secondary py-0 px-2" @click="cancelEditReview()" title="Cancel Changes">
                                      <i class="mdi mdi-close-outline fs-4"></i>
                                    </button>
                                    <button class="btn btn-sm btn-success py-0 px-2 " @click="updateReview()" title="Save Changes">
                                      <i class="mdi mdi-check-outline fs-4"></i>
                                    </button>
                                  </div>
                                </div>
                            </div>
                            <div v-else>
                              <div v-if="review.rating == 'Recommended'">
                                <div class="px-2 d-flex align-items-center justify-content-center text-light light-blue-bg rounded">
                                  <i class="mdi mdi-star fs-4"></i>
                                  <div class="ms-1">{{ review.rating }}</div>
                                </div>
                              </div>
                              <div v-else-if="review.rating == 'Mixed Feelings'">
                                <div class="px-2 d-flex align-items-center justify-content-center text-light bg-secondary rounded">
                                  <i class="mdi mdi-star-half-full fs-4"></i>
                                  <div class="ms-1">{{ review.rating }}</div>
                                </div>
                              </div>
                              <div v-else-if="review.rating == 'Not Recommended'">
                                <div class="px-2 d-flex align-items-center justify-content-center text-dark bg-danger rounded">
                                  <i class="mdi mdi-star-outline fs-4"></i>
                                  <div class="ms-1">{{ review.rating }}</div>
                                </div>
                              </div>
                            </div>
                            <div v-if="!reviewEditMode">
                              <div v-if="user.id == review.creatorId" class="d-flex">
                                <div class="mx-2">
                                  <button class="btn btn-sm btn-secondary py-0 px-2" @click="editReview(review)" title="Edit Review">
                                    <i class="mdi mdi-pencil-outline fs-4"></i>
                                  </button>
                                </div>
                                <div class="">
                                  <button class="btn btn-sm btn-danger py-0 px-2" @click="deleteReview(review)" title="Delete Review">
                                  <i class="mdi mdi-trash-can-outline fs-4"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <div v-if="reviewEditMode" class="px-2">
                            <textarea v-model="userReviewData.content" class="mb-2 pb-2 form-control" rows="3" required></textarea>
                          </div>
                          <div v-else class="px-2 newline-break">
                            {{ review.content }}
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION MODAL - [ADD TO, REMOVE FROM] BOOK LISTS -->
  <ModalBasic :id="'bookLists'">
    <template v-slot:header>
      <div class="fw-bold fs-5">Book Lists</div>
    </template>
    <template v-slot:body>
      <div v-for="(optionValue, optionName, i) in bookListsOptions" :key="i" class="form-check">
        <div v-if="bookListsOptions[optionName].existsInBookList">
          <input :id="optionName" v-model="bookListsOptions[optionName].selected" type="checkbox" class="form-check-input" checked>
          <label :for="optionName" class="form-check-label">{{ optionName }} Books</label>
        </div>
        <div v-else>
          <input :id="optionName" v-model="bookListsOptions[optionName].selected" type="checkbox" class="form-check-input">
          <label :for="optionName" class="form-check-label">{{ optionName }} Books</label>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button @click="updateBookLists()" type="button" class="btn btn-primary">Submit</button>
    </template>
  </ModalBasic>
</template>

<script>
import { useRoute } from 'vue-router';
import { booksService } from '../services/BooksService.js';
import { computed, onUnmounted, ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { bookReviewsService } from '../services/BookReviewsService.js';
import { clubsService } from '../services/ClubsService.js';
import BookClubCard from '../components/BookClubCard.vue';
import ModalBasic from '../components/ModalBasic.vue';
import { Modal } from 'bootstrap';

export default {
  components: { BookClubCard, ModalBasic },
  setup(){
    const route = useRoute()
    let gbId = route.params.gbId
    
    const userBookData = ref({rating: 0, status: 'planned'})
    const selectedTab = ref('reviews')
    const userReviewData = ref({gbId: gbId})
    const reviewEditMode = ref(false)
    const userReviewedStatus = ref(true)
    const bookListsOptions = ref({})
    
    const account = computed(() => AppState.account)
    const user = computed(() => AppState.user)
    const book = computed(() => AppState.bookDetailsPage.book)
    const userBook = computed(() => AppState.bookDetailsPage.userBook)
    const userHasThisBook = computed(() => AppState.bookDetailsPage.userBook ? true : false)
    const userCreatorAdminClubs = computed(() => AppState.bookDetailsPage.userCreatorAdminClubs)
    const userReviews = computed(() => AppState.bookDetailsPage.userReviews)
    const clubsPlanned = computed(() => AppState.bookDetailsPage.clubs.planned)
    const clubsReading = computed(() => AppState.bookDetailsPage.clubs.reading)
    const clubsFinished = computed(() => AppState.bookDetailsPage.clubs.finished)
    const bookScore = computed(() => Number(AppState.bookDetailsPage.bookScore).toFixed(2))
    const bookScoreUserCount = computed(() => AppState.bookDetailsPage.bookScoreUserCount)
    const userBookRating = computed(() => AppState.bookDetailsPage.userBook ? AppState.bookDetailsPage.userBook.rating : 0)
    const userBookStatus = computed(() => AppState.bookDetailsPage.userBook ? AppState.bookDetailsPage.userBook.status : 'planned')

    const ratingOptions = [
      {rating: 1, description : 'Horrendous'},
      {rating: 2, description : 'Terrible'},
      { rating: 3, description : 'Bad'},
      { rating: 4, description : 'Meh'},
      { rating: 5, description : 'Average'},
      { rating: 6, description : 'Good'},
      { rating: 7, description : 'Very Good'},
      { rating: 8, description : 'Great'},
      { rating: 9, description : 'Outstanding'},
      { rating: 10, description : 'Masterpiece'}
    ]
    
    // SECTION BOOK DATA
    async function initBookData() {
      try {
        await booksService.setBookDetailsPageBook(gbId)
        await setBookScore()
        await setBookReviews()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    async function setBookScore() {
      try {
        await booksService.setBookScore(gbId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    async function setBookReviews() {
      try {
        await bookReviewsService.setBookDetailsPageReviews(gbId)
        setUserReviewedStatus()
      } catch (error) {
        Pop.error(error.message)
      }
    }


    // SECTION USER DATA
    async function initUserData() {
      await setUserBooks()
      await setUserBook()
      await setUserClubs()
      setUserReviewedStatus()
    }

    async function setUserBooks() {
      try {
        await booksService.setBookDetailsPageUserBooks()
        await setUserBook()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    async function setUserBook() {
      try {
        booksService.setBookDetailsPageUserBook(gbId)
        userBookData.value.rating = userBook.value ? userBook.value.rating : 'null'
        userBookData.value.status = userBook.value ? userBook.value.status : 'null'
      } catch (error) {
        Pop.error(error.message)
      }
    }

    async function setUserClubs() {
      try {
        await clubsService.setBookDetailsPageUserClubs(user.value.id)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    function setUserReviewedStatus() {
      if (!('id' in user.value)) { return }
      try {
        const userReview = userReviews.value.filter(review => review.gbId == gbId && review.creatorId == user.value.id)
        userReviewedStatus.value = userReview.length ? true : false        
      } catch (error) {
        Pop.error(error.message)
      }
    }

    // --- UPDATE USER [RATING, STATUS]
    async function updateUserBookRating() {
      try {
        await booksService.updateUserBook(userBook.value.id, {rating: userBookData.value.rating})
        setBookScore()
        Pop.toast('Rating updated successfully', 'success')
      } catch (error) {
        Pop.error(error.message)
      }
    }
    
    async function updateUserBookStatus() {
      try {
        await booksService.updateUserBook(userBook.value.id, {status: userBookData.value.status})
        Pop.toast('Progress updated successfully', 'success')
      } catch (error) {
        Pop.error(error.message)
      }
    }

    // --- [ADD TO, REMOVE FROM] BOOK LISTS
    async function openBookListsModal() {
      // ------ ADD OPTION FOR USER'S PERSONAL BOOK LIST
      bookListsOptions.value['My'] = {
        bookListType: 'user',
        bookId: userHasThisBook.value ? userBook.value.id : '',
        existsInBookList: userHasThisBook.value,
        selected: userHasThisBook.value
      }
      // ------ ADD OPTION FOR CLUB BOOK LISTS where USER MEMBERSHIP ROLE is [CREATOR, ADMIN]
      userCreatorAdminClubs.value.forEach(async(club) => {
        const book = await getBookInClubBookList(club)
        bookListsOptions.value[club.name] = {
          bookListType: 'club',
          bookId: book ? book.id : '',
          clubId: club.id,
          existsInBookList: book ? true : false,
          selected: book ? true : false
        }
      })
      Modal.getOrCreateInstance('#bookLists').show()
    }

    async function getBookInClubBookList(club) {
      const clubBooks = await booksService.getBooksByClubId(club.id)
      if (!clubBooks) {
        return null
      }
      const book = clubBooks.find(book => book.gbId == gbId)
      return book ? book : null
    }

    async function updateBookLists() {
      for (const [name, option] of Object.entries(bookListsOptions.value)) {
          try {
            switch (option.bookListType) {
              case 'user': 
                if (option.selected && !option.existsInBookList) {  
                  await booksService.createUserBook(book.value)
                  Pop.toast(`Added to ${name} Books successfully`, 'success')
                }
                else if (!option.selected && option.existsInBookList) {
                  const confirmed = await Pop.confirm(`Are you sure you want to remove this book from ${name} Books?`)
                  if (confirmed) {
                    await booksService.deleteUserBook(option.bookId)
                    Pop.toast(`Removed from ${name} Books successfully`, 'success')
                  } else {
                    option.selected = true
                  }
                }
                await setUserBooks()
                break;
              case 'club':
                if (option.selected && !option.existsInBookList) {
                  const bookData = {
                    clubId: option.clubId,
                    gbId: book.value.gbId,
                    title: book.value.title,
                    imgUrl: book.value.imgUrl,
                    author: book.value.author,
                    rating: 0,
                    status: 'planned'
                  }
                  await booksService.createClubBook(bookData)
                  Pop.toast(`Added to ${name} Books successfully`, 'success')
                }
                else if (!option.selected && option.existsInBookList) {
                  const confirmed = await Pop.confirm(`Are you sure you want to remove this book from ${name} Books?`)
                  if (confirmed) {
                    await booksService.deleteClubBook(option.bookId)
                    Pop.toast(`Removed from ${name} Books successfully`, 'success')
                  } else {
                    option.selected = true
                  }
                }
                break;
            }
          } catch (error) {
            Pop.error(error.message)            
          }
      }
      Modal.getOrCreateInstance('#bookLists').hide()
    }

    // --- [ADD, EDIT, DELETE] USER BOOK REVIEW
    async function createReview() {
      try {
        const newBookReview = await bookReviewsService.createBookReview(userReviewData.value)
        userReviewData.value = newBookReview
        setUserReviewedStatus()
      } catch (error) {
        Pop.error(error.message)
      }
    }

    function editReview(review) {
      userReviewData.value = {...review}
      reviewEditMode.value = true
    }

    function cancelEditReview() {
      reviewEditMode.value = false
    }

    async function updateReview() {
      try {
        await bookReviewsService.updateBookReview(userReviewData.value)
        reviewEditMode.value = false
        Pop.toast('Book Review updated successfully', 'success')
      } catch (error) {
        Pop.error(error.message)
      }
    }
    
    async function deleteReview(review) {
      try {
        const confirmed = await Pop.confirm('Are you sure you want to delete this review?')
        if (!confirmed) {
          return
        }
        await bookReviewsService.deleteBookReview(review.id)
        setUserReviewedStatus()
      } catch (error) {
        Pop.error(error.message)
      }
    }


    // SECTION NAVIGATION TABS [CLUBS READING, CLUBS PLANNED, CLUBS FINISHED, USER REVIEWS]
    async function selectTab(clubBookStatus) {
      selectedTab.value = clubBookStatus
      if (selectedTab.value == 'reviews') {
        await setBookReviews()
      } else {
        await setClubsTab(clubBookStatus)
      }
    }

    async function setClubsTab(status) {
      try {
        await clubsService.setBookDetailsPageClubs(gbId, status)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    
    // SECTION CLEANUP
    function clearBooks() {
        try {
            booksService.clearBooks()
        } catch (error) {
            Pop.error(error.message)
        }
    }

    watchEffect(async() => {
      user
      if(user.value.id) {
        await initUserData()
      }
    })

    watchEffect(async() => {
      gbId = route.params.gbId
      await initBookData()
      await selectTab('reviews')
    })

    onUnmounted(() => {
        clearBooks()
    })
    
    
    return {
      book,
      account,
      user,
      userBook,
      userBookRating,
      userBookStatus,
      userHasThisBook,
      bookScore,
      bookScoreUserCount,
      userBookData,
      userReviews,
      userReviewedStatus,
      clubsPlanned,
      clubsReading,
      clubsFinished,
      selectedTab,
      userReviewData,
      bookListsOptions,
      reviewEditMode,
      ratingOptions,
      updateUserBookRating,
      updateUserBookStatus,
      openBookListsModal,
      updateBookLists,
      createReview,
      editReview,
      cancelEditReview,
      updateReview,
      deleteReview,
      selectTab
    }
  }
}
</script>

<style lang="scss" scoped>
.book-img {
  max-height: 40dvh;
  @media screen and (max-width: 768px) {
    max-height: 30dvh;  
  }
}

.description-section {
  max-height: 50dvh;
  overflow-y: scroll;
}

.user-img {
  height: 8vh;
  width: 8vh;
  // border-style: solid;
  // border-width: 2px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.tab-text {
  font-size: 1em;
  @media screen and (max-width: 768px) {
    font-size: .4em;  
  }
}

.card-height{
  height: 40vh;
}

.newline-break {
  white-space: pre-line;
}
</style>