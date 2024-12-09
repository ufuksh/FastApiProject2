<!-- Örnek: src/components/Navbar.vue -->
<template>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/students">Students</router-link>
      <router-link to="/teachers">Teachers</router-link>
      <router-link to="/schedules">Schedules</router-link>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar'
  }
  </script>
  
  <style scoped>
  nav {
    display: flex;
    gap: 1rem;
    background-color: #fff;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  