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
    <td v-if="bookProp.creatorId == account?.id">
      <select  @change="editUserBook" v-model="progressSelect">
        <option value="reading">Currently Reading</option>
        <option value="planned">Plan to Read</option>
        <option value="finished">Finished</option>
      </select>
    </td>
    <td v-else-if="bookProp.status == 'finished'">
      <span class="large-text-style"> 
        Finished
      </span>
    </td>
    <td v-else-if="bookProp.status == 'planned'">
      <span class="status-text-style">
        Planning to Read
      </span>
    </td>
    <td v-else>
      <span class="status-text-style">
        Currently Reading
      </span>
    </td>
    <td v-if="bookProp.creatorId == account?.id">
      <select @change="editUserBook" v-model="ratingSelect">
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
    <!-- <td>
      <div class="dropdown">
        <button class="btn dropdown-toggle fs-4 orange-text" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="mdi mdi-dots-vertical"></i>
        </button>
        <ul class="dropdown-menu">
          <li class="px-3 fw-semibold">Change Progress</li>
          <li class="px-3 selectable" @click="changeUserBookProgress('reading')">Reading</li>
          <li class="px-3 selectable" @click="changeUserBookProgress('planned')">Planning to Read</li>
          <li class="px-3 selectable" @click="changeUserBookProgress('finished')">Finished</li>
        </ul> 
      </div>
    </td> -->
    <td v-if="bookProp.creatorId == account?.id">
      <i @click="deleteUserBook" class="trash mdi mdi-trash-can fs-3" title="Delete Book from List"></i>
    </td>
</template>


<script>
import { computed, ref } from 'vue';
import { Book } from '../models/Book.js';
import { booksService } from '../services/BooksService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState';

export default {
  props:{
    bookProp: {type: Book, required: true}
  },


  setup(props){

    const progressSelect = ref(props.bookProp.status)
    const ratingSelect = ref(props.bookProp.rating)

    return {
      progressSelect,
      ratingSelect,
      account: computed(() => AppState.account),
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
      async editUserBook(){
        try {
          const bookData = {status: progressSelect.value, rating: ratingSelect.value}
          const userBookId = props.bookProp.id
          await booksService.changeUserBookProgress(bookData, userBookId)
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async deleteUserBook(){
        try {
          const confirmation = await Pop.confirm('Are you sure you want to delete this user books?')
          if (confirmation) {
            const userBookId = props.bookProp.id
            await booksService.deleteUserBook(userBookId)
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