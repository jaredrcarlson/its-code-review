<template>
  <div class="container-fluid">
    
    <section class="row">
      <div class="col-12 p-0">
        <div class="image-container">
          <img class="img-fluid account-img me-4" :src=account.picture :alt=account.name>
          <img v-if="!account.coverImg" class="coverImg-style img-fluid" src="https://images.unsplash.com/photo-1551043047-1d2adf00f3fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" :alt=account.name>
          <img v-else class="coverImg-style img-fluid" :src="account.coverImg" :alt=account.name>
        </div>
      </div>
    </section>

    <section class="row mt-5 pt-5">
      <div class="col-10 mx-auto">
        <p class="fs-1">
          Edit Your Account
        </p>
      </div>
    </section>

    <section class="row justify-content-center">
      <div class="col-10">
          <form class="row justify-content-between" @submit.prevent="editAccount()">
            <div class="col-md-6 col-12">
              <div class="mb-3">
                <label for="name">Name</label>
                <input v-model="editable.name" type="text" id="name" name="name" title="Name" class="form-control" maxlength="100" minlength="1" required>
              </div>
              <div class="mb-3">
                <label for="coverImg">Cover Image</label>
                <input v-model="editable.coverImg" type="url" id="coverImg" name="coverImg" title="Cover Image" class="form-control" maxlength="700" minlength="1">
              </div>
              <div class="mb-3">
                <label for="picture">Profile Picture</label>
                <input v-model="editable.picture" type="url" id="picture" name="picture" title="Profile Picture" class="form-control" maxlength="400" minlength="1">
              </div>
            </div>
            <div class="col-md-6 col-12">
              <div class="mb-3">
                <label for="bio">Bio</label>
                <textarea v-model="editable.bio" type="text" id="bio" name="bio" title="bio" class="form-control" maxlength="700" minlength="1"></textarea>
              </div>
              <div>
                <button class="btn soft-blue-btn">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import { accountService } from '../services/AccountService.js';
import Pop from '../utils/Pop.js';
import { useRouter } from 'vue-router';

export default {
  setup(){
    const editable = ref({})
    const router = useRouter()

    editable.value = {...AppState.account}

    return {
      editable,

      account: computed(() => AppState.account),

      async editAccount(){
        try {
          const accountData = editable.value

          await accountService.editAccount(accountData)

          Pop.toast('Saved Changes', 'success', 'bottom-end')
          router.push({name: 'Account'})
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
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

.image-container {
  height: 30vh;
  position: relative;
}

.account-info-style{
  top: -6.5vh;
  margin-bottom: -6.5vh;
  position: relative;
}

@media(min-width: 768px){
  .account-info-style{
  top: -6.5vh;
  margin-bottom: -6.5vh;
  position: relative;
}
}
</style>