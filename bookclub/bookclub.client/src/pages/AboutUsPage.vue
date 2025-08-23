<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 my-3">
        <div class="d-flex justify-content-center">
          <h1>About Jabb</h1>
        </div>
      </div>
      <div class="col-10 mx-auto">
        <div>
          <h2>Problem Statement</h2>
          <p>In the digital age, the joy of reading and meaningful book discussions are fading away. Traditional book clubs struggle to connect to a global community
            of book enthusiasits, leaving a void in the literary landscape.
          </p>
          <h2>Description and Concept</h2>
          <p>Our solution to this problem? Jabb, a cutting-edge online book club platform that unites readers worldwide. Our key features include personalized member profiles,
            allowing for tracking and rating of books, global book clubs, interactive discussions, and tailored book recommendations.
          </p>
          <h2>Target Audience</h2>
          <p>Jabb caters to passionate readers, busy professionals, global nomads, and anyone seeking an inclusive community to connect over shared literary interests.</p>
          <h2>Technologies Used</h2>
          <ul>
            <li>Google Books API</li>
            <li>MongoDB</li>
            <li>ExpressJS</li>
            <li>Vue</li>
            <li>NodeJS</li>
            <li>Auth0</li>
            <li>Github / Git</li>
            <li>Visual Studio Code</li>
            <li>JavaScript</li>
            <li>HTML and CSS</li>
            <li>Bootstrap 5</li>
          </ul>
          <h2 class="text-center">Contributors</h2>
            <section class="row">
              <div class="col-12 col-md-6">
                <AboutTeamCard :name="'Jared Carlson'"  :linkedin="'https://www.linkedin.com/in/jaredrcarlson/'" :github="'https://github.com/jaredrcarlson'" :picture="JaredPicture"/>
              </div>
              <div class="col-12 col-md-6">
                <AboutTeamCard :name="'Bailey Johnson'" :linkedin="'https://www.linkedin.com/in/bailey-johnson-bb28b86b/'" :github="'https://github.com/bjohnson93'" :picture="BaileyPicture"/>
              </div>
              <div class="col-12 col-md-6">
                <AboutTeamCard :name="'Rebecca VandeWater'" :linkedin="'https://www.linkedin.com/in/rebecca-a-vandewater/'" :github="'https://github.com/RebeccaVandeWater'" :picture="RebeccaPicture" />
              </div>
              <div class="col-12 col-md-6">
                <AboutTeamCard :name="'Arrington Mata'" :linkedin="'https://www.linkedin.com/in/arrington-mata/'" :github="'https://github.com/ArrMata'" :picture="MataPicture"/>
              </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import JaredPicture from '../assets/img/j-carlson.png'
import RebeccaPicture from '../assets/img/r-vande.png'
import BaileyPicture from '../assets/img/b-johnson.png'
import MataPicture from '../assets/img/a-mata.png'
import AboutTeamCard from '../components/AboutTeamCard.vue'
export default {
    setup() {
        return {
          RebeccaPicture,
          BaileyPicture,
          MataPicture,
          JaredPicture
        };
    },
    components: { AboutTeamCard }
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

</style>