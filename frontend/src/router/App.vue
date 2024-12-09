<!-- src/App.vue -->
<template>
    <div id="app">
      <!-- Uygulamanızın genel yapısı için bir container -->
      <header>
        <nav>
          <!-- İsterseniz burada gezinme bağlantılarınızı koyabilirsiniz -->
          <router-link to="/">Home</router-link>
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
          <router-link to="/students">Students</router-link>
          <router-link to="/teachers">Teachers</router-link>
          <router-link to="/schedules">Schedules</router-link>
        </nav>
      </header>
      <!-- Burada router tarafından belirlenen bileşenleri görüntüler -->
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  }
  </script>
  
  <style>
  /* İstediğiniz stilleri ekleyebilirsiniz */
  </style>
  