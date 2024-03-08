<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { ref, onMounted } from 'vue';

const business_media = ref({ media_url: '' });
const business_name = ref('');

const getDetailUuid = async (uuid) => {
    try {
        const response = await axios.get(`http://localhost:9900/api/v1/business/${uuid}`);
        console.log('IKI DATA E', response)
        if (response && response.data && response.data.data) {
            const businessData = response.data.data;
            business_name.value = businessData.business_name;
            business_media.value = businessData.business_media || { media_url: '' };
        }
    } catch (error) {
        console.error('Error saat mengedit data:', error);
    }
};


onMounted(async () => {
    const uuid = 'c6fca3f5-eda0-43da-8da2-79d3a36bb19b';
    await getDetailUuid(uuid);
});
</script>
<template>
  <v-app-bar height="80" color="#FEF5F8" scroll-behavior="elevate" id="inspire">
    <v-img v-if="business_media.media_url" :src="business_media.media_url" class=""></v-img>
    <v-app-bar-title class="text-h4">Mikro</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-menu transition="slide-x-transition">
      <template v-slot:activator="{props}">
      <v-btn color="#6347F9" v-bind="props">Home +</v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>Home Page One</v-list-item-title>
          <v-list-item-title>Home Page Two</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu transition="slide-x-transition">
      <template v-slot:activator="{props}">
      <v-btn color="#6347F9" v-bind="props">Services +</v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>Tour Grid</v-list-item-title>
          <v-list-item-title>Tour List</v-list-item-title>
          <v-list-item-title>Tour Single</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu transition="slide-x-transition">
      <template v-slot:activator="{props}">
      <v-btn color="#6347F9" v-bind="props">Hospital</v-btn>
      </template>
    </v-menu>
    <v-menu transition="slide-x-transition">
      <template v-slot:activator="{props}">
      <v-btn color="#6347F9" v-bind="props">Pages +</v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>About</v-list-item-title>
          <v-list-item-title>Team</v-list-item-title>
          <v-list-item-title>Faq</v-list-item-title>
          <v-list-item-title>404</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu transition="slide-x-transition">
      <template v-slot:activator="{props}">
      <v-btn color="#6347F9" v-bind="props">Blog</v-btn>
      </template>
    </v-menu>
    <v-menu transition="slide-x-transition">
      <template v-slot:activator="{props}">
      <v-btn color="#6347F9" v-bind="props">Contact</v-btn>
      </template>
    </v-menu>
    <v-btn class="text-none expl mr-8" color="indigo-lighten-1" size="x-large" variant="flat" rounded="0">
      Get Exploration
    </v-btn>
  </v-app-bar>
</template>

<style scope>
.expl{
  background-color: white;
  color:#6347f9;
}
</style>
