<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import '@fortawesome/fontawesome-free/css/all.css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const business_name = ref('');
const business_desc = ref('');
const business_province = ref('');
const business_regency = ref('');
const business_subdistrict = ref('');
const business_address = ref('');
const business_notelp = ref('');
const business_email = ref('');
const business_link_wa = ref('');

const teamMembers = ref([]);
const scopes = ref([]);
const galleryImages = ref([]);
const priceList = ref([]);

const getDetailUuid = async (uuidBisnis) => {
  try {
    const response = await axios.get(`http://localhost:9900/api/v1/business/${uuidBisnis}`);
    if (response && response.data && response.data.data) {
      const businessData = response.data.data;
      business_name.value = businessData.business_name;
      business_desc.value = businessData.business_desc;
      business_province.value = businessData.business_province;
      business_regency.value = businessData.business_regency;
      business_subdistrict.value = businessData.business_subdistrict;
      business_address.value = businessData.business_address;
      business_notelp.value = businessData.business_notelp;
      business_email.value = businessData.business_email;
      business_link_wa.value = businessData.business_link_wa;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const fetchScopeData = async (uuidBisnis) => {
  try {
    const response = await axios.get(`http://localhost:9900/api/v1/scope_business/${uuidBisnis}`);
    if (response && response.data && response.data.data) {
      scopes.value = response.data.data.data; // Log the response
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const fetchTeamsData = async (uuidBisnis) => {
  try {
    const response = await axios.get(`http://localhost:9900/api/v1/teams_business/${uuidBisnis}`);
    if (response && response.data && response.data.data) {
      teamMembers.value = response.data.data.map((team) => ({
        name: team.team_name,
        position: team.team_job_desc,
        image_url: team.team_media ? team.team_media.media_url : 'https://via.placeholder.com/150',
      }));
    }
  } catch (error) {
    console.error('Error fetching teams data:', error);
  }
};

const fetchTncData = async (uuidBisnis) => {
  try {
    const response = await axios.get(`http://localhost:9900/api/v1/tnc_business/${uuidBisnis}`);
    if (response && response.data && response.data.data) {
      priceList.value = response.data.data.map((price) => ({
        name: price.tnc_uuid_table.price_list_name,
        description: price.tnc_uuid_table.price_list_desc,
        price: price.tnc_uuid_table.price_list_price,
        media_url: price.tnc_uuid_table.price_list_media ? price.tnc_uuid_table.price_list_media.media_url : 'https://via.placeholder.com/150',
      }));
    }
  } catch (error) {
    console.error('Error fetching teams data:', error);
  }
};

const fetchGalleryData = async (uuidBisnis) => {
  try {
    const response = await axios.get(`http://localhost:9900/api/v1/galleries_business/${uuidBisnis}`);
    if (response && response.data && response.data.data) {
      galleryImages.value = response.data.data[0].gallery_media.map(media => ({
        url: media.media_url,
        title: media.media_name,
      }));
    }
  } catch (error) {
    console.error('Error fetching gallery data:', error);
  }
};

onMounted(async () => {
  const uuidBisnis = '97214164-920a-4ac7-8d53-538fd535f36a';
  await getDetailUuid(uuidBisnis);
  await fetchScopeData(uuidBisnis);
  await fetchTeamsData(uuidBisnis);
  await fetchTncData(uuidBisnis);
  await fetchGalleryData(uuidBisnis);

  AOS.init();

  console.log("data", scopes.value);
});


</script>

<template>
  <Navbar />
  <div class="container">
    <div id="home" v-scroll-to="'#home'" class="bisnis">
      <div class="text" data-aos="fade-right">
        <h1>Welcome to</h1>
        <h1>{{ business_name }}</h1>
        <p>{{ business_desc }}</p>
        <router-link to="/booking">
          <button class="button">BOOKING</button>
        </router-link>
        <a :href="business_link_wa" target="_blank">
          <button class="button-customer">
            <i class="fab fa-whatsapp"></i> Contact Us
          </button>
        </a>
      </div>
      <div id="employe" v-scroll-to="'#employe'" class="cakupan" data-aos="fade-right">
        <div class="judul-cakupan">
          <h1>Cakupan</h1>
        </div>
        <div class="item">
          <div v-for="scope in scopes" :key="scope.name" class="scope-item" data-aos="zoom-in">
            <h2>{{ scope.scope_name }}</h2>
            <p>{{ scope.scope_desc }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="teams" v-scroll-to="'#teams'" class="teams" data-aos="fade-left">
      <div class="content-teams">
        <h1>Daftar Pegawai</h1>
        <swiper class="swiper-container" :slides-per-view="3" :space-between="30" :breakpoints="{
          768: {
            slidesPerView: 1
          },
          1024: {
            slidesPerView: 4
          }
        }">
          <swiper-slide v-for="member in teamMembers" :key="member.name" data-aos="flip-up">
            <div class="team-card">
              <img :src="member.image_url" alt="Team Member" />
              <div class="team-info">
                <h3>{{ member.name }}</h3>
                <p>{{ member.position }}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div id="product" v-scroll-to="'#product'" class="daftar-harga" data-aos="fade-up">
      <div class="harga-content">
        <h1>Daftar Product</h1>
        <div class="price-cards">
          <div class="price-card" v-for="(price, index) in priceList" :key="index" data-aos="flip-up">
            <img :src="price.media_url" alt="Price Image" />
            <h2>{{ price.name }}</h2>
            <p>{{ price.description }}</p>
            <div class="price">
              <span>Rp {{ price.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="gallery" v-scroll-to="'#gallery'" class="gallery">
      <div class="gallery-content">
        <h1>Gambar</h1>
        <div class="gallery-grid">
          <a v-for="(image, index) in galleryImages" :key="index" :href="image.url" data-lightbox="gallery" :data-title="image.title">
            <img :src="image.url" :alt="image.title" />
          </a>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.bisnis {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: end;
  height: 114vh;
  background-image: url('/public/bg-rs.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}

.bisnis::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.bisnis .text {
  z-index: 2;
  color: white;
  margin-bottom: 0rem;
  padding: 20px;
}

.bisnis .cakupan {
  transform: translateY(50%);
  z-index: 10;
  color: white;
  background-color: rgb(93, 93, 247);
  height: 47%;
  width: 95%;
}

.teams {
  margin-top: 220px;
  margin-bottom: 70px;
  padding: 20px;
}

.button {
  background-color: blue;
  margin: 20px;
  height: 50px;
  width: 150px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
}

.button-customer {
  background-color: rgb(0, 166, 14);
  margin: 20px;
  height: 50px;
  width: 150px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
}

.content-teams {
  text-align: center;
}

.content-teams h1 {
  margin-bottom: 20px;
}

.team-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 250px;
  height: 350px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.team-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.judul-cakupan h1 {
  text-align: center;
}

.team-info {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.daftar-harga {
  text-align: center;
  padding: 50px 20px;
  background-color: rgb(93, 93, 247);
}

.harga-content {
  max-width: 1200px;
  margin: 0 auto;
}

.price-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.price-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 20px;
  width: 250px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.price-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
}

.price-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.price-card h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.price-card p {
  font-size: 1em;
  margin-bottom: 20px;
}

.price-card .price {
  font-size: 1.2em;
  font-weight: bold;
}

.team-info h3,
.team-info p {
  margin: 0;
}

.daftar-harga {
  text-align: center;
}

.cakupan-list {
  padding: 20px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.scope-item {
  margin: 20px;
  margin-bottom: 20px;
}

.scope-item h2 {
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 10px;
}


.gallery {
  text-align: center;
  padding: 50px 20px;
}

.gallery-content {
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.gallery-grid a {
  flex: 1 1 calc(25% - 20px);
  box-sizing: border-box;
  display: block;
  margin: 10px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.gallery-grid img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s, box-shadow 0.3s;
}

.gallery-grid a:hover img {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.scope-item p {
  font-size: 1em;
}


@media (max-width: 768px) {
  .bisnis {
    flex-direction: column;
    text-align: center;
  }

  .bisnis .text {
    max-width: 100%;
  }

  .cards {
    flex-direction: column;
    align-items: center;
  }
  .price-card {
    width: 100%;
    margin: 10px 0;
  }
}
</style>

