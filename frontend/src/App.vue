<!-- src/App.vue -->
<template>
    <div id="app">
      <header>
        <nav>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/login">Login</router-link></li>
            <li><router-link to="/register">Register</router-link></li>
            <li><router-link to="/students">Students</router-link></li>
            <li><router-link to="/teachers">Teachers</router-link></li>
            <li><router-link to="/schedules">Schedules</router-link></li>
          </ul>
        </nav>
      </header>
      
      <!-- Ana içerik buraya yansır -->
      <main>
        <router-view></router-view>
      </main>
      
      <footer>
        <p>© 2023 My School Data Entry System</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App'
  }
  </script>
  
  <style scoped>
  /* Temel stiller, isteğe göre düzenlenebilir */
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  header, footer {
    background: #f0f0f0;
    padding: 1rem;
  }
  
  header ul {
    list-style: none;
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;
  }
  
  header ul li {
    display: inline-block;
  }
  
  main {
    flex: 1;
    padding: 2rem;
  }
  </style>
  