<template>
  <div class="dashboard-sidebar">
    <div class="dashboard-sidebar_logo">
      <div class="img-platzhalter"></div>
    </div>
    <div class="dashboard-sidebar_menu">
      <div class="dashboard-sidebar_menu_row-1">
        <router-link to="/" class="button">
          <span class="icon">
            <i class="fa-solid fa-plus"></i>
          </span>
          <span class="text"> Neues Thema</span>
        </router-link>
        <ul v-if="menuItems.length > 0">
          <h3>Deine Themen</h3>
          <li v-for="(item, index) in menuItems" :key="index">
            <router-link :to="item.link">
              <span class="icon"> 📌 </span>
              <span class="text"> {{ item.name }} </span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="dashboard-sidebar_menu_row-2">
        <ul>
          <li>
            <router-link to="#">
              <span class="icon"> <i class="fa-solid fa-gear"></i></span>
              <span class="text">Einstellungen</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <span class="icon">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </span>
              <span class="text"> Abmelden</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardSidebar",
  data() {
    return {
      menuItems: [
        { name: "Personalbeschaffung & -planung", link: "/dashboard" },
        { name: "Thema 2", link: "/thema2" },
        { name: "Thema 3", link: "/thema3" },
        { name: "Thema 4", link: "/thema4" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

.dashboard-sidebar {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 13vw;
  min-width: 300px;
  height: 100vh;
  margin: 0;
  padding: 20px 20px 20px 20px;
  background-color: $color-dark-blue;
  box-sizing: border-box;
}

.dashboard-sidebar_logo {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  & .img-platzhalter {
    width: 100%;
    height: 100px;
    background-color: $color-light-blue;
  }
}

.dashboard-sidebar_menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  margin: 50px 0 0 0;
  padding: 0 0 0 0;
  box-sizing: border-box;

  & a.button {
    width: 100%;
    margin: 0 auto 0 auto;
    padding: 10px 20px;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: $font-size-p-lg;
    line-height: $line-height;
    letter-spacing: $letter-spacing;
    text-decoration: none;
    border-radius: 10px;
    box-sizing: border-box;
    background-color: $color-light-blue;

    transition: background-color 0.3s ease;

    &:hover {
      background-color: darken($color-light-blue, 10%);
    }

    & .icon {
      margin: 0 12.5px 0 0;
    }

    & .text {
    }
  }

  &_row-1,
  &_row-2 {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      h3 {
        margin: 30px 0 5px 0;
        padding: 0;
        color: #fff;
        font-size: 1.3rem;
      }

      li {
        margin: 0;
        padding: 0;
        transition: 0.2s;

        a {
          margin: 0;
          padding: 10px 0;
          color: #fff;
          display: flex;
          align-items: center;
          font-size: $font-size-p-lg;
          line-height: $line-height;
          letter-spacing: $letter-spacing;
          text-decoration: none;

          & .icon {
            margin: 0 12.5px 0 0;
          }

          &:hover {
            color: rgba(255, 255, 255, 0.8);
          }
        }

        &:hover {
          // background-color: rgba($color-dark-blue, 0.1); // Leichte Transparenz
        }
      }
    }
  }
}
</style>
