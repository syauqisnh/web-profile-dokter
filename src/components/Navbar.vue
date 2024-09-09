<script setup>
import { ref } from 'vue';

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <v-app-bar height="80" color="#FEF5F8" scroll-behavior="elevate" id="inspire">
    <v-app-bar-title class="custom-title">
      <span class="orange-text">USAHAMIKRO</span><span class="blue-text">SITE</span>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn color="#6347F9" @click="scrollToSection('home')">Home</v-btn>
    <v-btn color="#6347F9" @click="scrollToSection('employe')">Employe</v-btn>
    <v-btn color="#6347F9" @click="scrollToSection('product')">Product</v-btn>
    <v-btn color="#6347F9" @click="scrollToSection('gallery')">Gallery</v-btn>
    <v-btn color="#6347F9" @click="scrollToSection('contact')">Contact</v-btn>
  </v-app-bar>
</template>

<style scoped>
.custom-title {
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  font-weight: bold !important;
  text-transform: uppercase;
}

.orange-text {
  color: #FFA500;
}

.blue-text {
  color: #ADD8E6;
}
</style>
