<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
          <p class="fs-1 fw-semibold mt-2">
          Club's Booklist
        </p>
        <router-link v-if="inClub && (inClub?.role == 'admin' || inClub?.role =='creator')" :to="{name:'Book Search'}">
          <button class="btn orange-btn" title="Add a Book to My List">
            <i class="mdi mdi-book-plus"></i> Add a Book to My List
          </button>
        </router-link>
      </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div style="overflow-x: auto;">
          <table id="books">
            <tr>
              <th class="ps-2">
                Title
              </th>
              <th class="ps-2 text-center">
                Progress
              </th>
              <th class="ps-2 text-center">
                Rating
              </th>
              <th class="ps-2 text-end">
                Timestamp
              </th>
              <th class="ps-2" v-if="inClub && inClub?.role == 'admin' || inClub?.role =='creator'">
              </th>
            </tr>
            <tr>
              <td class="large-text-style fs-4 orange-text">Currently Reading</td>
              <td></td>
              <td></td>
              <td></td>
              <td v-if="inClub && inClub?.role == 'admin' || inClub?.role =='creator'"></td>
            </tr>
            <tr v-for="book in currentBooks" :key="book.id">
              <ClubBookListItem :bookProp="book" />
            </tr>
            <tr>
              <td class="large-text-style fs-4 orange-text">Planning to Read</td>
              <td></td>
              <td></td>
              <td></td>
              <td v-if="inClub && inClub?.role == 'admin' || inClub?.role =='creator'"></td>
            </tr>
            <tr v-for="book in plannedBooks" :key="book.id">
              <ClubBookListItem :bookProp="book" />
            </tr>
            <tr>
              <td class="large-text-style fs-4 orange-text">Finished Books</td>
              <td></td>
              <td></td>
              <td></td>
              <td v-if="inClub && inClub?.role == 'admin' || inClub?.role =='creator'"></td>
            </tr>
            <tr v-for="book in finishedBooks" :key="book.id">
              <ClubBookListItem :bookProp="book" />
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { booksService } from '../services/BooksService.js';
import ClubBookListItem from './ClubBookListItem.vue';
import { logger } from '../utils/Logger.js';

export default {
    setup() {
        const route = useRoute();
        async function getBooksByClubId() {
            try {
                const clubId = route.params.clubId;
                await booksService.getBooksByClubId(clubId);
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        watchEffect(() => {
            getBooksByClubId(route.params.clubId);
        });
        return {
            route,
            selectedClub: computed(() => AppState.selectedClub),
            myMemberships: computed(() => AppState.myMemberships),
            inClub: computed(() => {
              const foundClub = AppState.myMemberships?.find(c => c.clubId == route.params.clubId)
              logger.log(foundClub)
              logger.log(AppState.myMemberships)
              return foundClub
            }),
            books: computed(() => AppState.books),
            finishedBooks: computed(() => {
                let finishedBooks = AppState.books.filter(b => b.status == 'finished');
                return finishedBooks;
            }),
            plannedBooks: computed(() => {
                let plannedBooks = AppState.books.filter(b => b.status == 'planned');
                return plannedBooks;
            }),
            currentBooks: computed(() => {
                let currentBooks = AppState.books.filter(b => b.status == 'reading');
                return currentBooks;
            }),
        };
    },
    components: { ClubBookListItem }
}
</script>


<style lang="scss" scoped>
table{
  width: 95%;
}

#books th{
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: lighter;
}

#books th, #books td{
  border-bottom: 1px solid #8f8f8f;
  padding: 7px;
}

.sub-text-style{
  font-weight: 100;
  font-size: smaller;
}

.large-text-style{
  font-size:large;
  font-weight: 600;
}

.status-text-style{
  font-size: large;
}

.author-text-style{
  font-size: smaller;
  font-weight: 500;
}
</style>