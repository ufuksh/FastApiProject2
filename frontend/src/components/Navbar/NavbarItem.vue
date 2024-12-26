<script setup>
import { ref } from "vue";

const menuItems = ref([
  { name: "Home", link: "/" },
  { name: "Students", link: "/students" },
  { name: "Teachers", link: "/teachers" },
  { name: "Schedules", link: "/schedules" },
  { name: "Users", link: "/users" },
]);
</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img class="ktu" src="./img/ktu.png" alt="logo" />
    </div>

    <input class="search-input" type="text" placeholder="Search..." />

    <ul class="navbar-menu">
      <li v-for="item in menuItems" :key="item.name" class="navbar-item">
        <!-- Vue Router'a özel router-link -->
        <router-link :to="item.link" class="navbar-link">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.ktu {
  height: 80px;
  width: 80px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #ffffff;
  color: #333333;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #232222;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
}

.navbar-brand {
  font-size: 2rem;
  font-weight: bold;
  white-space: nowrap;
}

.navbar-menu {
  list-style: none;
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;
}

.navbar-item {
  display: flex;
  align-items: center;
}

.navbar-link {
  text-decoration: none;
  color: #494747;
  font-size: 1.15rem;
  font-weight: 500;
  position: relative;
  transition: color 0.3s;
}

.navbar-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #020202;
  transition: width 0.3s;
}

.navbar-link:hover::after {
  width: 100%;
}

.navbar-link:hover {
  color: #000000;
}

.search-input {
  flex-grow: 1;
  margin: 0 20px;
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
}

@media (max-width: 768px) {
  .navbar-menu {
    flex-direction: column;
    gap: 15px;
  }

  .navbar-item {
    text-align: center;
  }

  .search-input {
    margin-top: 15px;
  }
}
</style>
