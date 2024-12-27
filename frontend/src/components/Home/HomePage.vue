<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Ana sayfaya yönlendirmek için
router.push('/home');
</script>

<template>
  <div class="home-page">
    <div>
      AnaSayfa
    </div>
    <div>
      Düzenlenecek...
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 60px;
}
</style>