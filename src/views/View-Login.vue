<template>
  <div class="view-login">
    <div class="view-login_row">
      <div class="view-login_row_col-1"><LoginWallpaper /></div>
      <div class="view-login_row_col-2"><LoginUserLogin /></div>
    </div>
  </div>
</template>

<script>
import LoginWallpaper from "@/components/login/Login-Wallpaper.vue";
import LoginUserLogin from "@/components/login/Login-User-Login.vue";

export default {
  name: "ViewLogin",
  components: {
    LoginWallpaper,
    LoginUserLogin,
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.view-login {
  width: 100vw;
  overflow: hidden;

  &_row {
    display: flex;
    flex-direction: row;

    &_col-1 {
      width: 50vw;
      height: 100vh;
    }

    &_col-2 {
      width: 50vw;
      height: 100vh;
      box-sizing: border-box;
      overflow: hidden;
    }
  }
}
</style>
