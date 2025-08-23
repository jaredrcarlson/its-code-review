<template>
  <td>
      <router-link :to="{name: 'Book Details', params:{gbId: bookProp.gbId}}">
        <span class="large-text-style text-dark">
          {{ bookProp.title }}
        </span> <br>
        <span class="author-text-style text-dark">
          by {{ bookProp.author }}
        </span>
      </router-link>
    </td>
    <td class="text-center" v-if="inClub && (inClub?.role == 'admin' || inClub?.role =='creator')">
      <select @change="editClubBook" v-model="progressSelect">
        <option value="reading">Currently Reading</option>
        <option value="planned">Plan to Read</option>
        <option value="finished">Finished</option>
      </select>
    </td>
    <td class="text-center" v-else-if="bookProp.status == 'finished'">
      <span class="large-text-style">
        Finished
      </span>
    </td>
    <td class="text-center" v-else-if="bookProp.status == 'planned'">
      <span class="status-text-style">
        Planning to Read
      </span>
    </td>
    <td class="text-center" v-else>
      <span class="status-text-style">
        Currently Reading
      </span>
    </td>
    <td class="text-center" v-if="inClub && (inClub?.role == 'admin' || inClub?.role =='creator')">
      <select @change="editClubBook" v-model="ratingSelect">
        <option value="0">Not Rated</option>
        <option v-for="option in ratingOptions" :key="option.rating" :value="option.rating">
          {{ option.rating }} - {{ option.description }}
        </option>
      </select>
    </td>
    <td v-else class="text-center">
      <span v-if="bookProp.rating == 0" class="large-text-style">Unrated</span>
      <span v-else class="large-text-style">{{ bookProp.rating }}/10</span>
    </td>
    <td>
      <p v-if="progressSelect == 'finished'" class="mb-0 text-end sub-text-style"> 
        completed {{ bookProp.updatedAt.toLocaleDateString() }}
      </p>
      <p v-else class="mb-0 text-end sub-text-style">
        added {{ bookProp.createdAt.toLocaleDateString() }}
      </p>
    </td>
    <!-- <td v-if="inClub && (inClub?.role == 'admin' || inClub?.role =='creator')">
      <div class="dropdown">
        <button class="btn dropdown-toggle fs-4 orange-text" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="mdi mdi-dots-vertical"></i>
        </button>
        <ul class="dropdown-menu">
          <li class="px-3 fw-semibold">Change Progress</li>
          <li class="px-3 selectable" @click="changeClubBookProgress('reading')">Reading</li>
          <li class="px-3 selectable" @click="changeClubBookProgress('planned')">Planning to Read</li>
          <li class="px-3 selectable" @click="changeClubBookProgress('finished')">Finished</li>
        </ul>
      </div>
    </td> -->
    <td v-if="inClub && (inClub?.role == 'admin' || inClub?.role =='creator')">
      <i @click="deleteClubBook" class="trash mdi mdi-trash-can fs-3"></i>
    </td>
</template>


<script>
import { computed, ref } from 'vue';
import { Book } from '../models/Book.js';
import { booksService } from '../services/BooksService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';

export default {
  props:{
    bookProp: {type: Book, required: true}
  },

  setup(props){
    
    const progressSelect = ref(props.bookProp.status)
    const ratingSelect = ref(props.bookProp.rating)
    const route = useRoute()
    return {
      progressSelect,
      ratingSelect,
      route,
      selectedClub: computed(()=>AppState.selectedClub),
      myMemberships: computed(() => AppState.myMemberships),
      inClub: computed(() => {
        const foundClub = AppState.myMemberships?.find(c => c.clubId == route.params.clubId)
        logger.log(foundClub)
        logger.log(AppState.myMemberships)
        return foundClub
      }),

      ratingOptions : [
      {rating: 1, description : 'Horrendous'},
      {rating: 2, description : 'Terrible'},
      { rating: 3, description : 'Bad'},
      { rating: 4, description : 'Meh'},
      { rating: 5, description : 'Average'},
      { rating: 6, description : 'Good'},
      { rating: 7, description : 'Very Good'},
      { rating: 8, description : 'Great'},
      { rating: 9, description : 'Outstanding'},
      { rating: 10, description : 'Masterpiece'}],
      async editClubBook(){
        try {
          const bookData = {status: progressSelect.value, rating: ratingSelect.value}
          const clubBookId = props.bookProp.id
          await booksService.changeClubBookProgress(bookData, clubBookId)
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async deleteClubBook(){
        try {
          const confirmation = await Pop.confirm('Are you sure you want to delete this user books?')
          if (confirmation) {
            const userBookId = props.bookProp.id
            await booksService.deleteClubBook(userBookId)
          }
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
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

.trash {
  color: red;
}
.trash:hover {
  color: rgb(180, 1, 1);
  cursor: pointer;
}
</style>