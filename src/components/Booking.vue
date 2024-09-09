<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import '/public/style/booking.css'

const showModal = ref(false);
const scheduleData = ref([]);
const antrianData = ref([]);
const businessCustomers = ref('');

const uuid_business = ref('');
const uuid_layanan = ref('');
const uuid_dokter = ref('');
const DataBusiness = ref([]);
const DataLayanan = ref([]);
const DataDokter = ref([]);
const DataDate = ref([]);
const DataTime = ref([]);
const businessOptions = ref([]);
const layananOptions = ref([]);
const dokterOptions = ref([]);
const dateOptions = ref([]);
const multiselectOptionsTime = ref([]);
const uuid_practices = ref([]);
const schedule_name_pasien = ref('');
const schedule_noHp_pasien = ref('');
const schedule_address = ref('');
const schedule_status = ref('');
const schedule_date = ref(null);
const schedule_start_practice = ref('');

const currentPageSchedule = ref(1);
const currentPageAntrian = ref(1);
const itemsPerPage = 5;

const searchQuery = ref('');

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  schedule_name_pasien.value = '';
  schedule_noHp_pasien.value = '';
  schedule_address.value = '';
  schedule_date.value = null;
  schedule_start_practice.value = '';
  uuid_practices.value = [];
  uuid_business.value = '';
  uuid_dokter.value = '';
  uuid_layanan.value = '';
  DataLayanan.value = [];
  layananOptions.value = [{ label: 'Pilih Layanan', value: null }];
  updateOptions();
};


const updateOptions = () => {
  businessOptions.value = [{ label: 'Pilih Tujuan', value: null }, ...DataBusiness.value.map((index) => ({ label: index.business_name, value: index.business_uuid }))];
  layananOptions.value = [{ label: 'Pilih Layanan', value: null }, ...DataLayanan.value.map((index) => ({ label: index.service_name, value: index.service_uuid }))];
  dokterOptions.value = [{ label: 'Pilih Dokter', value: null }, ...DataDokter.value.map((index) => ({ label: index.teams_practice_as.team_name, value: index.doctor_name }))];
  dateOptions.value = [{ label: 'Pilih Date', value: null }, ...DataDate.value.map((index) => ({ label: index.practice_date, value: index.practice_date }))];

  multiselectOptionsTime.value = [...DataTime.value.map((index) => ({ label: index.practice_start, value: index.practice_start }))];
};

const fetchDataOption = async () => {
  try {
    const getBusines = await axios.get(`http://localhost:9900/api/v1/business_customer/23644b20-f4fc-4000-9762-047c976897bc`);
    DataBusiness.value = getBusines.data.data;
    const getTime = await axios.get(`http://localhost:9900/api/v1/practice/get_all`);
    DataBusiness.value = getBusines.data.data;
    // DataDate.value = getDate.data.data;
    DataTime.value = getTime.data.data;
    updateOptions();
  } catch (error) {
    console.error('Error mengambil data:', error);
  }
};

const aa = async () => {
  const getLayanan = await axios.get(`http://localhost:9900/api/v1/layanan_business/${uuid_business.value}`);
  DataLayanan.value = getLayanan.data;
  updateOptions();
};
const bb = async () => {
  const getDokter = await axios.get(`http://localhost:9900/api/v1/practice_layanan/${uuid_layanan.value}`);
  DataDokter.value = getDokter.data.data;
  updateOptions();
};
const cc = async () => {
  const getDate = await axios.get(`http://localhost:9900/api/v1/practice_dokter/${uuid_dokter.value}`);
  DataDate.value = getDate.data.data;
  updateOptions();
};

const fetchScheduleData = async () => {
  const params = new URLSearchParams();
  if (searchQuery.value.trim()) {
    params.append('keyword', searchQuery.value.trim());
  }
  
  try {
    const response = await axios.get(`http://localhost:9900/api/v1/practice_business/97214164-920a-4ac7-8d53-538fd535f36a`, {
      params: params
    });
    scheduleData.value = response.data.data;

    console.log(response.data.data);
  } catch (error) {
    console.error('Error fetching schedule data:', error);
  }
};


const fetchBookingData = async () => {
  try {
    const response = await axios.get('http://localhost:9900/api/v1/schedule_business/97214164-920a-4ac7-8d53-538fd535f36a');
    antrianData.value = response.data.data;
  } catch (error) {
    console.error('Error fetching booking data:', error);
  }
};

const addSchedule = async () => {
  try {
    const payload = {
      schedule_name_pasien: schedule_name_pasien.value,
      schedule_noHp_pasien: schedule_noHp_pasien.value,
      schedule_address: schedule_address.value,
      schedule_date: schedule_date.value,
      schedule_start_practice: schedule_start_practice.value,
      schedule_practice: uuid_practices.value[0].value,
      schedule_business: uuid_business.value,
      schedule_doctor: uuid_dokter.value
    };

    const response = await axios.post('http://localhost:9900/api/v1/schedule', payload);

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: response.data.message
      });
      fetchBookingData();
      closeModal();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: response.data.message
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response ? error.response.data.message : 'Internal server error'
    });
  }
};

onMounted(() => {
  fetchScheduleData();
  fetchBookingData();
  fetchDataOption();
});

watch(
  uuid_business,
  (newPracticeUuid) => {
    if (newPracticeUuid) {
      aa();
    } else {
      DataLayanan.value = [{ label: 'Pilih Dokter', value: null }];
    }
  },
  { immediate: true }
);

watch(
  uuid_layanan,
  (newPracticeUuid) => {
    if (newPracticeUuid) {
      bb();
    } else {
      dateOptions.value = [{ label: 'Pilih Date', value: null }];
    }
  },
  { immediate: true }
);

watch(
  uuid_dokter,
  (newPracticeUuid) => {
    if (newPracticeUuid) {
      cc();
    } else {
      dateOptions.value = [{ label: 'Pilih Date', value: null }];
    }
  },
  { immediate: true }
);

const isTimeDropdownDisabled = computed(() => !schedule_date.value);

watch(schedule_date, (newDate) => {
  if (newDate) {
    const selectedPracticeUuid = uuid_dokter.value;
    if (selectedPracticeUuid) {
      multiselectOptionsTime.value = DataTime.value.filter((time) => time.practice_date === newDate && time.doctor_name.team_uuid === selectedPracticeUuid).map((time) => ({ label: time.practice_start, value: time.practice_start }));
    } else {
      multiselectOptionsTime.value = [];
    }
  } else {
    multiselectOptionsTime.value = [];
    schedule_start_practice.value = null; // Reset time when date is cleared
  }
});

watch(schedule_start_practice, (newDate) => {
  if (newDate) {
    const selecteddoctorUuid = uuid_dokter.value;
    const selectedlayananUuid = uuid_layanan.value;
    const selectedDateUuid = schedule_date.value;

    uuid_practices.value = DataTime.value
      .filter((time) => time.practice_start === newDate && time.doctor_name.team_uuid === selecteddoctorUuid && time.doctor_position.service_uuid === selectedlayananUuid && time.practice_date === selectedDateUuid)
      .map((time) => ({ value: time.practice_uuid }));
  }
});

const filteredAntrianData = computed(() => {
  console.log('Filtered Antrian Data:', antrianData.value);
  console.log('Search Query:', searchQuery.value); //
  return antrianData.value.filter(item =>
    item.doctor_position &&
    item.doctor_position.service_name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedAntrianData = computed(() => {
  const start = (currentPageAntrian.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredAntrianData.value.slice(start, end);
});

const totalPagesAntrian = computed(() => {
  return Math.ceil(filteredAntrianData.value.length / itemsPerPage);
});

const paginatedScheduleData = computed(() => {
  const start = (currentPageSchedule.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return scheduleData.value.slice(start, end);
});

const totalPagesSchedule = computed(() => {
  return Math.ceil(scheduleData.value.length / itemsPerPage);
});

const changePageSchedule = (page) => {
  if (page > 0 && page <= totalPagesSchedule.value) {
    currentPageSchedule.value = page;
  }
};

const changePageAntrian = (page) => {
  if (page > 0 && page <= totalPagesAntrian.value) {
    currentPageAntrian.value = page;
  }
};

const prevPageSchedule = () => {
  if (currentPageSchedule.value > 1) {
    currentPageSchedule.value--;
  }
};

const nextPageSchedule = () => {
  if (currentPageSchedule.value < totalPagesSchedule.value) {
    currentPageSchedule.value++;
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
        <router-link to="/">
          <button><i class="fas fa-arrow-left"></i> Back</button>
        </router-link>
      </div>
    </div>
    <div class="main">
      <h1>Daftar Jadwal</h1>
      <div class="content-input">
        <button class="booking" @click="openModal">Booking</button>
        <div class="search-container">
          <input type="text" placeholder="Search" v-model="searchQuery" @input="fetchScheduleData" />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Layanan</th>
            <th>Dokter</th>
            <th>Tanggal</th>
            <th>Mulai Praktik</th>
            <th>Selesai Praktik</th>
            <th>Daftar Antrian</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedScheduleData" :key="index">
            <td>{{ item.doctor_position.service_name }}</td>
            <td>{{ item.doctor_name.team_name }}</td>
            <td>{{ item.practice_date }}</td>
            <td>{{ item.practice_start }}</td>
            <td>{{ item.practice_end }}</td>
            <td>
              <router-link :to="{ name: 'SchedulePasien', params: { practice_uuid: item.practice_uuid } }">
                <button>Lihat Antrian</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <span @click="prevPageSchedule" :class="{ disabled: currentPageSchedule === 1 }"><i
            class="fas fa-chevron-left"></i></span>
        <span v-for="page in totalPagesSchedule" :key="page" @click="changePageSchedule(page)"
          :class="{ active: page === currentPageSchedule }">{{ page }}</span>
        <span @click="nextPageSchedule" :class="{ disabled: currentPageSchedule === totalPagesSchedule }"><i
            class="fas fa-chevron-right"></i></span>
      </div>
    </div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <form @submit.prevent="addSchedule">
            <h2>Booking Form</h2>
            <div class="form-group">
              <label>Nama</label>
              <input v-model="schedule_name_pasien" type="text" required>
            </div>
            <div class="form-group">
              <label>No HP</label>
              <input v-model="schedule_noHp_pasien" type="text" required>
            </div>
            <div class="form-group">
              <label>Alamat</label>
              <input v-model="schedule_address" type="text" required>
            </div>
            <div class="form-group">
              <label>Tujuan</label>
              <select v-model="uuid_business" required>
                <option v-for="option in businessOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Layanan</label>
              <select v-model="uuid_layanan" required>
                <option v-for="option in layananOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Dokter</label>
              <select v-model="uuid_dokter" required>
                <option v-for="option in dokterOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Date</label>
              <select v-model="schedule_date" required>
                <option v-for="option in dateOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Waktu</label>
              <select v-model="schedule_start_practice" :disabled="isTimeDropdownDisabled" required>
                <option v-for="option in multiselectOptionsTime" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
            <button type="submit">Add Schedule</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
