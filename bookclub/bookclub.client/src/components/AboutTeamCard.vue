<template>
  <section class="team-card justify-content-between align-items-center p-3 row me-md-1">
    <div class="col-12 col-md-3">
      <img :src="picture" :alt=name class="img-fluid avatar-img">
    </div>
    <div class="col-12 col-md-6">
      <h3>{{ name }}</h3>
    </div>
    <div class="d-flex col-12 col-md-3">
      <a class="text-light" :href=linkedin><i class="mdi mdi-linkedin icon-medium"></i></a>
      <a class="text-light" :href=github><i class="mdi mdi-github icon-medium"></i></a>
    </div>
  </section>
</template>

<script>
export default {
	props: {
		name: {type: String, required: true},
		linkedin: String,
		github: String,
    picture: String
	},
    setup(props) {
      return {
		};
    },
}
</script>



<style lang="scss" scoped>

  .icon-large {
    font-size: 4rem;
  }
  .icon-medium {
    font-size: 2.5rem;
  }

  .team-card {
    background-color: #1D3354;
    color: white;
    border-radius: 1rem;
    margin-bottom: 1rem;
  }

  .team-card h3 {
    margin-bottom: 0;
  }

  .avatar-img{
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }

</style>