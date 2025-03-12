<template>
  <div class="login-wallpaper"></div>
</template>

<script>
export default {
  name: "LoginWallpaperSection",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.login-wallpaper {
  width: 100%;
  height: 100%;
  background-color: $color-dark-blue;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 1000'%3E%3Crect width='500' height='1000' fill='%23172b4d' /%3E%3Cg opacity='0.8'%3E%3Cpath d='M500 0 Q250 300, 0 400' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 20 Q250 320, 0 420' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 40 Q250 340, 0 440' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 60 Q250 360, 0 460' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 80 Q250 380, 0 480' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 100 Q250 400, 0 500' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3C/g%3E%3Cg opacity='0.6'%3E%3Cpath d='M0 200 Q200 100, 350 300 T 500 500' fill='none' stroke='%23ffffff' stroke-width='1.5' /%3E%3Cpath d='M0 220 Q200 120, 350 320 T 500 520' fill='none' stroke='%23ffffff' stroke-width='1.5' /%3E%3Cpath d='M0 240 Q200 140, 350 340 T 500 540' fill='none' stroke='%23ffffff' stroke-width='1.5' /%3E%3Cpath d='M0 260 Q200 160, 350 360 T 500 560' fill='none' stroke='%23ffffff' stroke-width='1.5' /%3E%3Cpath d='M0 280 Q200 180, 350 380 T 500 580' fill='none' stroke='%23ffffff' stroke-width='1.5' /%3E%3C/g%3E%3Cg opacity='0.8'%3E%3Cpath d='M0 650 Q250 750, 500 650' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M0 670 Q250 770, 500 670' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3C/g%3E%3Cg opacity='0.7'%3E%3Cpath d='M0 860 Q100 920, 200 870 T 400 900 T 500 850' fill='none' stroke='%23ffffff' stroke-width='1.5' /%3E%3Cpath d='M0 880 Q100 940, 200 890 T 400 920 T 500 870' fill='none' stroke='%23ffffff' stroke-width='1.5' /%3E%3Cpath d='M0 900 Q100 960, 200 910 T 400 940 T 500 890' fill='none' stroke='%23ffffff' stroke-width='1.5' /%3E%3C/g%3E%3C/svg%3E");
  background-size: cover;

  @include respond(phone) {
    display: none;
  }
}
</style>
