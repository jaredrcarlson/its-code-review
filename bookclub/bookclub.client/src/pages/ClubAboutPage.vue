  <template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 mt-3 dark-blue-bg rounded elevation-3 text-light">
        <div class="p-3">
          <p class="fs-3 fw-bold" id="v-step-0">About us</p>
          <form @submit.prevent="editClub()">
            <input placeholder="club name..." v-model="editable.name" class="form-control mb-2" v-if="isEditing" type="text" required maxlength="40" minlength="3">
            <input placeholder="club cover photo..." v-model="editable.coverImg" class="form-control mb-2" v-if="isEditing" type="url" maxlength="300" minlength="3"  required>
            <textarea class="form-control mb-2" minlength="3" maxlength="750" required v-if="isEditing" v-model="editable.description" rows="10"></textarea>
            <p v-else class="fs-4 club-description">
              {{ selectedClub.description }}
            </p>
            <button type="submit" v-if="isEditing" class="btn light-blue-btn">Save Changes</button>
          </form>
          <div v-if="currentBooks.length >= 1">
            <p class="fs-4">
              <span class="pe-2 fw-semibold">Currently Reading:</span>
              <span v-for="(b, index) in currentBooks" :key="b.id" class="pe-2">
                <router-link :to="{name: 'Book Details', params:{gbId: b.gbId}}">
                  <span class="text-light">
                    {{ b.title }} by {{ b.author }} <span v-if="index != currentBooks.length-1">,</span>
                  </span>
                </router-link>
              </span>
            </p>
          </div>
          <div id="v-step-1" class="d-flex justify-content-between mt-5 align-items-end">
            
            <p class="fs-3">
              <i class="mdi mdi-account"></i> {{ selectedClub.memberCount }}
            </p>
            <p class="fw-light fs-5">
              <span class="pe-5">
                Created on: {{ selectedClub.createdAt.toLocaleDateString() }}
              </span>
            </p>

            <div v-if="loadingRef == false && account.id && Array.isArray(myMemberships) && (selectedClub.creatorId != account.id)">
              <button class="btn orange-btn fs-3" @click="leaveClub()" title="Leave Club" v-if="inClub.status == 'joined'">
                <i class="mdi mdi-account-minus"></i> Leave Club
              </button>
              <button class="btn orange-btn fs-3" title="You've been blocked!" disabled v-else-if="inClub.status == 'blocked'">
                <i class="mdi mdi-cancel"></i> Blocked from Club
              </button>
              <button class="btn orange-btn fs-3" @click="removeRequest()" title="Remove request to join Club" v-else-if="inClub.status == 'pending'">
                <i class="mdi mdi-account-minus"></i> Remove Request
              </button>
              <button class="btn light-blue-btn fs-3" @click="addRequest()" title="Request to join club" v-else-if="selectedClub.private">
                <i class="mdi mdi-account-plus"></i> Request to Join
              </button>
              <button class="btn light-blue-btn fs-3" @click="becomeMember()" title="Join Club" v-else>
                <i class="mdi mdi-account-plus"></i> Join Club
              </button>
            </div>

            <div v-if="selectedClub.creatorId == account.id">
              <button @click="enableEditing()"  class="btn light-blue-btn fs-3 me-2">Edit Club</button>
              <button @click="deleteClub()" class="btn orange-btn fs-3">Delete Club</button>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
  <Tour v-if="account.needsTour" :steps="steps" :callbacks="tourCallBacks" />
</template>


<script>
import { computed, ref, watchEffect} from 'vue';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';
import { membersService } from '../services/MembersService.js';
import Pop from '../utils/Pop.js';
import { router } from '../router.js';
import { clubsService } from "../services/ClubsService.js";
import { booksService } from '../services/BooksService.js';
import { accountService } from "../services/AccountService.js";

export default {
  setup(){
    const route = useRoute()

    const isEditing = ref(false)
    const editable = ref({})

    let loadingRef = ref(false)

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
      steps: [
        {
          target: '#v-step-0',
          header: {
            title: "Here's a section About the club here to gain user interest"
          },
          content: "This includes buttons for a user to join or leave the club, or if you're the creator of the club, you can Edit or Delete your club.",
          params: {
                placement: 'bottom',
                originalPlacement: 'bottom',
              }
        },
        {
          target: '#v-step-1',
          content: "To the left you'll find navigation for the club- you can see their members, announcements and discussions, and their book list.",
          params: {
                placement: 'right',
                originalPlacement: 'right',
              }
        },
      ],
      tourCallBacks: {
        onSkip: (() => accountService.editAccount({needsTour: false}))
      },
      editable,
      isEditing,
      currentBooks: computed(() => {
        let currentBooks = AppState.books.filter(b => b.status == 'reading');
        return currentBooks;
      }),
      selectedClub: computed(() => AppState.selectedClub),
      inClub: computed(() => {
        const foundClub = AppState.myMemberships.find(c => c.clubId == route.params.clubId)
        // logger.log(foundClub)
        // logger.log(AppState.myMemberships)
        return foundClub ? foundClub : {}
      }),
      account: computed(() => AppState.account),
      myMemberships: computed(() => AppState.myMemberships),
      loadingRef,
      route,
      enableEditing(){
        isEditing.value = true
        editable.value = {...AppState.selectedClub}
      },
      async editClub(){
        try {
          // logger.log('did the submit button submit?')
          const clubData = editable.value
          // logger.log('club data...', clubData)
          await clubsService.editClub(clubData)
          isEditing.value = false
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async becomeMember(){
        try {

          loadingRef.value = true

          const clubId = route.params.clubId

          const memberData = {clubId: clubId}

          await membersService.becomeMember(memberData)
          AppState.selectedClub.memberCount++

          Pop.success('You are now a member of this club.')

          loadingRef.value = false
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async addRequest(){
        try {

          loadingRef.value = true

          const clubId = route.params.clubId

          const memberData = {clubId: clubId}

          await membersService.becomeMember(memberData)
          
          Pop.toast('You have requested to join this club.', 'success', 'bottom-end')
          
          loadingRef.value = false
        } catch (error) {
          Pop.error(error.message)
        }
      },

      async leaveClub(){
        try {
          const removeConfirm = await Pop.confirm('Are you sure you want to leave this club?')

          if(!removeConfirm){
            return
          }

          loadingRef.value = true
          
          const memberToRemove = AppState.myMemberships.find(m => m.clubId == route.params.clubId)
          const memberId = memberToRemove.id

          // logger.log(memberId)

          await membersService.leaveClub(memberId)
          AppState.selectedClub.memberCount--

          Pop.success('You have left this club.')

          loadingRef.value = false

          router.push({name: 'Home'})
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async removeRequest(){
        try {
          const removeConfirm = await Pop.confirm('Are you sure you want to remove this request?')

          if(!removeConfirm){
            return
          }

          loadingRef.value = true

          const memberToRemove = AppState.myMemberships.find(m => m.clubId == route.params.clubId)
          const memberId = memberToRemove.id

          // logger.log(memberId)

          await membersService.leaveClub(memberId)
          Pop.toast('Your request has been removed', 'success', 'bottom-end')
          loadingRef.value = false
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async deleteClub(){
        try {
          const wantsToDelete = await Pop.confirm('Deleting your club is permanent, are you sure you want to let down your members?')
          if(!wantsToDelete){
            return
          }
          const clubId = route.params.clubId
          await clubsService.deleteClub(clubId)
          router.push({name: 'Home'})
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

  .club-description {
    white-space: pre-line;
  }

</style>