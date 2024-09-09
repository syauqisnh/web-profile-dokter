<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const business_name = ref('');
const business_desc = ref('');
const business_province = ref('');
const business_regency = ref('');
const business_subdistrict = ref('');
const business_address = ref('');
const business_notelp = ref('');
const business_email = ref('');
const business_link_wa = ref('');

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

onMounted(async () => {
  const uuidBisnis = 'dc7101b8-6687-4fc3-a69f-bafdb42fe9d5';
  await getDetailUuid(uuidBisnis);
});
</script>

<template>
  <v-footer color="#FFFFFF" class="d-flex flex-column">
    <div class="d-flex w-100 px-6 pb-10 pt-8">
      <v-row>
        <v-col cols="12" sm="3">
          <h4 class="mt-2">Explore Hospital</h4>
          <span class="text-caption">Continually productize<br />
            compelling dome packed with <br />all Elated utilize website and
            <br />creating supply next-generation</span><br />
          <h4 class="mt-2">Follow Us On</h4>
          <v-icon class="mr-1">mdi mdi-facebook</v-icon>
          <v-icon class="mr-1">mdi mdi-twitter</v-icon>
          <v-icon class="mr-1">mdi mdi-instagram</v-icon>
          <v-icon class="mr-1">mdi mdi-whatsapp</v-icon>
          <v-icon class="mr-1">mdi mdi-linkedin</v-icon>
        </v-col>
        <v-col cols="12" sm="3">
          <h4 class="mt-2">Services Type</h4>
          <span class="text-caption">Tooth fillings</span><br />
          <span class="text-caption">Consult with experts</span><br />
          <span class="text-caption">Dental Check Up Service</span><br />
          <span class="text-caption">Install braces</span><br />
          <span class="text-caption">Tooth Extraction</span><br />
        </v-col>
        <v-col cols="12" sm="3">
          <h4 class="mt-2">Contact Info</h4>
          <span class="text-caption"><v-icon class="mr-1">mdi mdi-phone</v-icon>{{ business_notelp }}</span><br />
          <span class="text-caption">
            <v-icon class="mr-1">mdi mdi-email</v-icon>
            {{ business_email }}
          </span>
          <br />
          <span class="text-caption"><v-icon class="mr-1">mdi mdi-map-marker</v-icon>{{ business_address }}, {{
            business_subdistrict }} <br />
            {{ business_regency }}, {{ business_province }}</span><br />
        </v-col>
        <v-col cols="12" sm="3">
          <v-app-bar-title class="custom-title">
            <span class="orange-text bold-text">USAHAMIKRO</span><span class="blue-text bold-text">SITE</span>
          </v-app-bar-title>
        </v-col>
      </v-row>
    </div>
    <div class="px-2 py-2 bgTop text-center w-100 text-white bg-orange">
      <v-icon class="mr-2" color="white">mdi mdi-copyright</v-icon>
      <strong>
        Copyright {{ new Date().getFullYear() }} UsahaMikroSite. All rights reserved. Developed by UsahaMikroSite
      </strong>
    </div>
  </v-footer>
</template>

<script>
export default {

}
</script>

<style>
.v-footer {
  padding: 0 0 !important;
}

.bgTop {
  background-color: #f4f6fa;
}

.bg-orange {
  background-color: #FFA500;
}

.orange-text {
  font-size: 30px;
  color: #FFA500;
}

.blue-text {
  font-size: 30px;
  color: #ADD8E6;
}

.bold-text {
  font-weight: bold;
}
</style>
