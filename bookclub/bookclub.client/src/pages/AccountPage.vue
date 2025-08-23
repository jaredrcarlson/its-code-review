<template>
  <div  v-if="account.id" class="container-fluid">
    <section class="row">
      <div class="col-12 p-0">
        <div class="image-container">
          <img class="img-fluid account-img me-4" :src=account.picture :alt=account.name>
          <div class="account-name">
            <p class="fs-2 pe-2 m-0">
              {{ account.name }}
            </p>
          </div>
          <img v-if="!account.coverImg" class="coverImg-style img-fluid" src="https://images.unsplash.com/photo-1551043047-1d2adf00f3fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" :alt=account.name>
          <img v-else class="coverImg-style img-fluid" :src="account.coverImg" :alt=account.name>
        </div>
      </div>
    </section>

    <section class="row mt-5">
      <div class="col-12 mt-5">
        <p class="m-3">
          <span id="v-step-0" class="fs-2">
            About Me:
          </span>
          <span class="fs-4">
            {{ account.bio }}
          </span>
        </p>
      </div>
    </section>

    <section class="row">
      <div class="col-12">
        <p class="m-3 fs-1">
          My Clubs
        </p>
      </div>
    </section>

    <section class="row mb-4" v-if="Array.isArray(myMemberships) && account.id">
      <div  class="col-md-4 col-12 my-3" v-for="membership in myMemberships" :key="membership.id" >
          <div  class="membership-card mx-3">
            <router-link :to="({name: 'Club About Page', params: {clubId: membership.club.id}})">
                <img class="img-fluid card-img" :src=membership.club.coverImg alt="card img">
            </router-link>

            <div class="dark-blue-bg p-3 text-light card-description">
              <p class="fs-5">
                {{ membership.club.name }}
              </p>
              <p v-if="width > 1350">
                {{ computedDescription(membership.club.description, 75) }}
              </p>
              <p v-else>
                {{ computedDescription(membership.club.description, 25) }}
              </p>
              <div class="mt-auto" v-if="loadingRef == false && membership.role != 'creator'">
                <button class="btn orange-btn" @click="leaveClub(membership.id)" title="Leave Club">
                  <i class="mdi mdi-account-minus"></i> Leave Club
                </button>
              </div>
            </div>
          </div>
      </div>
    </section>

    <section class="row mb-4">
      <div id="v-step-1" class="col-12">
        <p class="m-3 fs-1">
          <span class="pe-3">
            My Booklist
          </span>
          <span class="fs-3 pe-4">
            <i class="mdi mdi-book-multiple"></i> {{ myBooks?.length }}
          </span>
          <span>
            <router-link :to="{name:'Book Search'}">
              <button class="btn orange-btn" title="Add a Book to My List">
                <i class="mdi mdi-book-plus"></i> Add a Book to My List
              </button>
            </router-link>
          </span>
        </p>
      </div>
    </section>

    <section class="row mb-4">
      <div class="col-12">
        <div style="overflow-x: auto;" class="ms-3">
          <table id="books">
            <tr>
              <th class="ps-2">
                Title
              </th>
              <th class="ps-2">
                Progress
              </th>
              <th class="ps-2 text-center">
                Rating
              </th>
              <th class="ps-2 text-end">
                Timestamp
              </th>
              <th></th>
            </tr>
            <tr>
              <td class="large-text-style fs-4 orange-text">Currently Reading</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="book in currentBooks" :key="book.id">
              <UserBookListItem :bookProp="book" />
            </tr>
            <tr>
              <td class="large-text-style fs-4 orange-text">Planning to Read</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="book in plannedBooks" :key="book.id">
              <UserBookListItem :bookProp="book" />
            </tr>
            <tr>
              <td class="large-text-style fs-4 orange-text">Finished Books</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="book in finishedBooks" :key="book.id">
              <UserBookListItem :bookProp="book" />
            </tr>
          </table>
        </div>
      </div>
    </section>

    <section class="row justify-content-center">
      <div class="col-10 my-3">
      </div>
    </section>
  </div>

  <Tour v-if="account.needsTour" :steps="steps" :callbacks="tourCallBacks" />

</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { membersService } from '../services/MembersService.js';
import { accountService } from "../services/AccountService.js";
export default {
    setup() {
        let loadingRef = ref(false);
        const width = ref(null);
        function resize() {
          width.value = window.innerWidth;
        }

        onMounted(() => {
          resize()
          window.addEventListener("resize", resize);
        });

        onUnmounted(() => {
          window.removeEventListener("resize", resize);
        });

        return {
          steps: [
        {
            target: '#v-step-0',
            header: {
            title: "Welcome to the Profile Page!"
            },
            content: "Here, you'll find a bio about the user, and a list of the clubs that the user is in"
        },
        {
            target: '#v-step-1',
            content: "Down here, the user's added books will be listed, and they can rate their book, remove from the list, and mark their progress"
          },
        ],
        tourCallBacks: {
          onFinish: (() => accountService.editAccount({needsTour: false})),
          onSkip: (() => accountService.editAccount({needsTour: false}))
        },
            loadingRef,
            computedDescription(str, length) {
              if (str.length > 100) {
                return str.substring(0,length) + "..."
              }
              return str
            },
            width,
            account: computed(() => AppState.account),
            myMemberships: computed(() => {
                if (AppState.myMemberships)
                    return AppState.myMemberships.filter(m => m.club && m.status == 'joined');
                return [];
            }),
            myBooks: computed(() => AppState.myBooks),
            finishedBooks: computed(() => {
                let finishedBooks = AppState.myBooks?.filter(b => b.status == 'finished');
                return finishedBooks;
            }),
            plannedBooks: computed(() => {
                let plannedBooks = AppState.myBooks?.filter(b => b.status == 'planned');
                return plannedBooks;
            }),
            currentBooks: computed(() => {
                let currentBooks = AppState.myBooks?.filter(b => b.status == 'reading');
                return currentBooks;
            }),

            async leaveClub(memberId) {
                try {
                    const removeConfirm = await Pop.confirm('Are you sure you want to leave this club?');
                    if (!removeConfirm) {
                        return;
                    }
                    loadingRef.value = true;
                    logger.log(memberId);
                    await membersService.leaveClub(memberId);
                    Pop.success('You have left this club.');
                    loadingRef.value = false;
                }
                catch (error) {
                    Pop.error(error.message);
                }
            }
        };
    },
}
</script>

<style lang="scss" scoped>
.coverImg-style{
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.account-img{
  height: 17vh;
  width: 17vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  bottom: -8vh;
  left: 5vw;
  position: absolute;
}

.account-name {
  position: absolute;
  bottom: -8vh;
  left: 40vw;

  @media (min-width: 768px) {
    bottom: -7vh;
    left: 14vw;
  } 
}

.account-info-style{
  position: relative;
}

.card-img{
  height: 40%;
  object-fit: cover;
  object-position: center;
}
.card-description{
  height: 60%;
  display: flex;
  flex-direction: column;
}

.membership-card{
  height: 40vh;
}

.image-container {
  height: 30vh;
  position: relative;
}


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
