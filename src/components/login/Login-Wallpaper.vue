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
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 1000'%3E%3Crect width='500' height='1000' fill='%23172b4d' /%3E%3Cg opacity='0.8'%3E%3Cpath d='M500 0 Q250 300, 0 400' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 20 Q250 320, 0 420' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 40 Q250 340, 0 440' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 60 Q250 360, 0 460' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 80 Q250 380, 0 480' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 100 Q250 400, 0 500' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 120 Q250 420, 0 520' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 140 Q250 440, 0 540' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 160 Q250 460, 0 560' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 180 Q250 480, 0 580' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M500 200 Q250 500, 0 600' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3C/g%3E%3Cg opacity='0.6'%3E%3Cpath d='M0 200 Q200 100, 350 300 T 500 500' fill='none' stroke='%23fff' stroke-width='1.5' /%3E%3Cpath d='M0 220 Q200 120, 350 320 T 500 520' fill='none' stroke='%23fff' stroke-width='1.5' /%3E%3Cpath d='M0 240 Q200 140, 350 340 T 500 540' fill='none' stroke='%23fff' stroke-width='1.5' /%3E%3Cpath d='M0 260 Q200 160, 350 360 T 500 560' fill='none' stroke='%23fff' stroke-width='1.5' /%3E%3Cpath d='M0 280 Q200 180, 350 380 T 500 580' fill='none' stroke='%23fff' stroke-width='1.5' /%3E%3Cpath d='M0 300 Q200 200, 350 400 T 500 600' fill='none' stroke='%23fff' stroke-width='1.5' /%3E%3C/g%3E%3Cg opacity='0.8'%3E%3Cpath d='M0 650 Q250 750, 500 650' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M0 670 Q250 770, 500 670' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M0 690 Q250 790, 500 690' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M0 710 Q250 810, 500 710' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M0 730 Q250 830, 500 730' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M0 750 Q250 850, 500 750' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M0 770 Q250 870, 500 770' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M0 790 Q250 890, 500 790' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M0 810 Q250 910, 500 810' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3Cpath d='M0 830 Q250 930, 500 830' fill='none' stroke='%233083e9' stroke-width='1.5' /%3E%3C/g%3E%3Cg opacity='0.7'%3E%3Cpath d='M0 860 Q100 920, 200 870 T 400 900 T 500 850' fill='none' stroke='%23fff' stroke-width='1.5' /%3E%3Cpath d='M0 880 Q100 940, 200 890 T 400 920 T 500 870' fill='none' stroke='%23fff' stroke-width='1.5' /%3E%3Cpath d='M0 900 Q100 960, 200 910 T 400 940 T 500 890' fill='none' stroke='%23fff' stroke-width='1.5' /%3E%3C/g%3E%3Cpath d='M-100 400 Q150 500, 300 300 Q450 100, 600 200' fill='%23172b4d' opacity='0.3' /%3E%3Cpath d='M-100 600 Q150 400, 300 600 Q450 800, 600 700' fill='%23172b4d' opacity='0.2' /%3E%3C/svg%3E");
  background-size: cover;
}
</style>
