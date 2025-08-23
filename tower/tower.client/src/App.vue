<template>
  <header>
  </header>
  <main class="container-fluid bg-dark">
    <div class="row mb-5">
      <div class="col-10">
        <div class="row">
          <div class="col-12">
            <div class="my-3">
              <router-link :to="{ name: 'Home' }">
                <img src="./assets/img/Logo.png" class="logo img-fluid">
              </router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <router-view />
          </div>
        </div>
      </div>
      <div class="col-2 nav-col">
        <NavBar />
      </div>
    </div>
    
    <div class="row">
      <div class="col-12">
        <div class="modal fade" id="createEventModal" tabindex="-1" aria-labelledby="createEventModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content text-tw-light bg-tw-secondary">
              <div class="modal-header text-tw-dark bg-tw-green">
                
                <h1 class="modal-title fs-5" id="createEventModalLabel">Create New Event</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form @submit.prevent="createEvent">
                <div class="modal-body">
                  
                  <div class="mb-2">
                    <div class="my-0 ps-2">Category</div>
                    <select v-model="formData.type" class="form-select" aria-label="type">
                      <option v-for="type in eventTypes.slice(1)" :key="type" :value="type.toLowerCase()">{{ type }}</option>
                    </select>
                    </div>
                    
                    <div class="mb-2">
                    <div class="my-0 ps-2">Name</div>
                    <input v-model="formData.name" type="text" class="form-control" aria-describedby="name" required>
                  </div>
                  
                  <div class="mb-2">
                    <div class="my-0 ps-2">Description</div>
                    <textarea v-model="formData.description" class="form-control" aria-describedby="description" required></textarea>
                  </div>
                  
                  <div class="mb-2">
                    <div class="my-0 ps-2">Cover Image</div>
                    <input v-model="formData.coverImg" type="url" class="form-control" aria-describedby="coverImg" required />
                  </div>
                  
                  <div class="mb-2">
                    <div class="my-0 ps-2">Location</div>
                    <input v-model="formData.location" type="text" class="form-control" aria-describedby="location" required>
                  </div>
                  
                  <div class="mb-2">
                    <div class="my-0 ps-2">Seating Capacity</div>
                    <input v-model="formData.capacity" type="number" class="form-control" aria-describedby="capacity" required>
                  </div>
                  
                  <div class="mb-2">
                    <div class="my-0 ps-2">Date</div>
                    <input v-model="formData.startDate" type="datetime-local" class="form-control" aria-describedby="startDate" required>
                  </div>
      
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-green">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
  <footer>
  </footer>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from './AppState'
import NavBar from './components/Navbar.vue';
import { eventsService } from './services/EventsService.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
import Pop from './utils/Pop.js';

export default {
  setup() {
    const router = useRouter()
    const formData = ref({})
    
    async function createEvent() {
      try {
        const event = await eventsService.createEvent(formData.value)
        formData.value = {}
        Pop.toast('Created Event Successfully', 'success')
        Modal.getOrCreateInstance('#createEventModal').hide()
        router.push({ name: 'EventDetails', params: { eventId: event.id}})
      } catch (error) {
        Pop.error(error.message)
      }
    }

    return {
      appState: computed(() => AppState),
      eventTypes: computed(() => AppState.eventTypes),
      formData,
      createEvent
    }
  },
  components: { NavBar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  //--main-height: calc(100vh - 32px - 64px);
  --tw-dark: #2A2D3A;
  --tw-secondary: #474c61;
  --tw-light: #CCF3FD;
  --tw-light-blue: #56C7FB;
  --tw-green: #79E7AB;
  --tw-green-hover:  #79e7ab88;
  --tw-red: #FF5977;
  --tw-red-hover: #ff597789;
  --tw-yellow: #FFD464;
  --tw-yellow-hover: #ffd36488;
}

// footer {
//   display: grid;
//   place-content: center;
//   height: 32px;
// }

main {
  // height: 100vh;
  background: linear-gradient(#2A2D3A, #474c617a);
}

.logo {
  height: 4dvh;
}

.nav-col {
  // height: 100vh;
  background: linear-gradient(#474c61c4 45%, #2a2d3a88);  
}

.text-tw-light {
  color: var(--tw-light)
}

.text-tw-dark {
  color: var(--tw-dark)
}

.text-tw-green {
  color: var(--tw-green);
}

.text-tw-secondary {
  color: var(--tw-secondary);
}

.text-tw-light-blue {
  color: var(--tw-light-blue);
}

.bg-tw-light {
  background-color: var(--tw-light);
}

.bg-tw-dark {
  background-color: var(--tw-dark);
}

.bg-tw-red {
  background-color: var(--tw-red);
}

.bg-tw-green {
  background-color: var(--tw-green);
}

.bg-tw-yellow {
  background-color: var(--tw-yellow);
}

.bg-tw-secondary {
  background-color: var(--tw-secondary);
}

.btn-green {
  cursor: pointer;
  font-weight: bold;
  background-color: var(--tw-green);
}

.btn-green:hover {
  cursor: pointer;
  background-color: var(--tw-green-hover);
}

.btn-yellow {
  cursor: pointer;
  font-weight: bold;
  background-color: var(--tw-yellow);
}

.btn-yellow:hover {
  cursor: pointer;
  background-color: var(--tw-yellow-hover);
}

.btn-red {
  cursor: pointer;
  font-weight: bold;
  background-color: var(--tw-red);
}

.btn-red:hover {
  cursor: pointer;
  background-color: var(--tw-red-hover);
}
</style>
