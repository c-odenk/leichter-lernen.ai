<template>
  <div class="blog-wallpaper">
    <div class="blog-wallpaper_row">
      <h2>Blog Wallpaper</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogWallpaperSection",
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

.blog-wallpaper {
  width: 100%;
  // margin: 100px 0;

  display: none;

  &_row {
    width: $width-desktop;
    margin: 0 auto;
    height: 45vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    // background-image: url("~@/assets/blog-wallpaper.jpg");
    background-image: url("https://img.freepik.com/free-photo/full-shot-student-library_23-2149647115.jpg?t=st=1741115726~exp=1741119326~hmac=0c33a61efb3806d7829d89ebf304d259e85df1150cbef6382eabebc264d02139&w=1060");

    @include respond(laptop) {
    }

    @include respond(tablet) {
    }

    @include respond(phone) {
    }

    & h2 {
      margin: 0;
      padding: 0;
      display: none;
    }

    & p {
      margin: 0;
      padding: 0;
      font-size: $font-size-p-lg;
      line-height: $line-height;
      letter-spacing: $letter-spacing;
    }
  }
}
</style>
