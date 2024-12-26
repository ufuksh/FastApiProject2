<script setup>
import NavbarItem from "@/components/Navbar/NavbarItem.vue"; // Navbar bileşeni
import "./assets/base.css"; // Global CSS
</script>

<template>
  <div id="app">
    <!-- Navbar -->
    <NavbarItem />
    
    <!-- Ana İçerik -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* Temel stil */
#app {
  font-family: Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 20px auto;
  max-width: 1200px;
  width: 90%;
}

</style>
