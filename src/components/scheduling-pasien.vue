<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import '/public/style/schedule-pasien.css';

const route = useRoute();
const practiceUuid = ref(route.params.practice_uuid);
const antrianData = ref([]);
const serviceName = ref('');
const serviceStart = ref('');
const serviceFinish = ref('');
const loading = ref(''); // Loading state

const currentPageAntrian = ref(1);
const itemsPerPage = 5;
const searchQuery = ref('');

const filteredAntrianData = computed(() => {
  return antrianData.value.filter(item =>
    item.schedule_name_pasien && item.schedule_name_pasien.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const fetchAntrianData = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:9900/api/v1/schedule_practice/${practiceUuid.value}`);
    console.log('hahaha', response);

    if (response) {
      antrianData.value = response.data.data;
      serviceName.value = response.data.data[0]?.schedule_practice.service.service_name || '';
      serviceStart.value = response.data.data[0]?.schedule_practice.practice_start || '';
      serviceFinish.value = response.data.data[0]?.schedule_practice.practice_end || '';
      loading.value = false;
    }
  } catch (error) {
    console.error('Error fetching antrian data:', error);
    loading.value = false;
  }
};

onMounted(() => {
  fetchAntrianData();
});

const paginatedAntrianData = computed(() => {
  const start = (currentPageAntrian.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredAntrianData.value.slice(start, end);
});

const totalPagesAntrian = computed(() => {
  return Math.ceil(filteredAntrianData.value.length / itemsPerPage);
});

const changePageAntrian = (page) => {
  if (page > 0 && page <= totalPagesAntrian.value) {
    currentPageAntrian.value = page;
  }
};

const prevPageAntrian = () => {
  if (currentPageAntrian.value > 1) {
    currentPageAntrian.value--;
  }
};

const nextPageAntrian = () => {
  if (currentPageAntrian.value < totalPagesAntrian.value) {
    currentPageAntrian.value++;
  }
};
</script>

<template>
  <div class="container">
    <div class="nav">
      <span>USAHAMIRO<span class="site">SITE</span></span>
      <div class="button">
        <router-link to="/booking">
          <button><i class="fas fa-arrow-left"></i> Back</button>
        </router-link>
      </div>
    </div>
    <div class="main">
      <h1>Daftar Antrian {{ serviceName }}</h1>
      <h1>Pukul {{ serviceStart }} - {{ serviceFinish }}</h1>
      <div class="search-container">
        <input type="text" placeholder="Search" v-model="searchQuery">
      </div>
      <div v-if="loading" class="loading">Loading...</div> <!-- Loading Animation -->
      <table v-else>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Layanan</th>
            <th>Dokter</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedAntrianData" :key="index">
            <td>{{ item.schedule_queue }}</td>
            <td>{{ item.schedule_name_pasien }}</td>
            <td>{{ item.schedule_practice.service.service_name }}</td>
            <td>{{ item.schedule_doctor.team_name }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <span @click="prevPageAntrian" :class="{ disabled: currentPageAntrian === 1 }"><i
            class="fas fa-chevron-left"></i></span>
        <span v-for="page in totalPagesAntrian" :key="page" @click="changePageAntrian(page)"
          :class="{ active: page === currentPageAntrian }">{{ page }}</span>
        <span @click="nextPageAntrian" :class="{ disabled: currentPageAntrian === totalPagesAntrian }"><i
            class="fas fa-chevron-right"></i></span>
      </div>
    </div>
  </div>
</template>

<style>
.loading {
  text-align: center;
  font-size: 1.5em;
  margin: 20px 0;
}
</style>
