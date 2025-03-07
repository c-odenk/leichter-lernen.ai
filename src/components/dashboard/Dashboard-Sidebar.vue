<template>
  <div class="dashboard-sidebar">
    <div class="dashboard-sidebar_logo">
      <div class="img-platzhalter"></div>
    </div>
    <div class="dashboard-sidebar_menu">
      <ul>
        <h3>Menü</h3>
        <li v-for="(item, index) in menuItems" :key="index">
          <router-link :to="item.link">
            <span class="icon"> 📌 </span>
            <span class="text"> {{ item.name }} </span>
          </router-link>
        </li>
      </ul>
      <ul>
        <li>
          <router-link to="#">
            <span class="icon"> <i class="fa-solid fa-gear"></i></span>
            <span class="text">Einstellungen</span>
          </router-link>
        </li>
        <li>
          <router-link to="#">
            <span class="icon">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </span>
            <span class="text"> Abmelden</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardSidebar",
  data() {
    return {
      menuItems: [
        { name: "Thema 1", link: "/dashboard" },
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
  display: flex;
  flex-direction: column; // Macht die Sidebar zu einer Spalte
  width: 13vw;
  min-width: 300px;
  height: 100vh; // Volle Höhe des Viewports
  margin: 0;
  padding: 0 0 20px 0;
  background-color: $color-dark-blue;
  box-sizing: border-box;
}

.dashboard-sidebar_logo {
  margin: 0;
  padding: 20px;
  box-sizing: border-box;

  & .img-platzhalter {
    width: 100%;
    height: 100px;
    background-color: red;
  }
}

.dashboard-sidebar_menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  margin: 0;
  padding: 0 0 0 0;
  box-sizing: border-box;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    h3 {
      margin: 0;
      padding: 10px 20px;
      color: #fff;
      font-size: 1rem;
      text-transform: uppercase;
    }

    li {
      margin: 0;
      padding: 10px 18px;
      transition: 0.2s;

      a {
        color: rgb(241, 245, 249);
        display: flex;
        align-items: center;
        font-size: $font-size-p-lg;
        line-height: $line-height;
        letter-spacing: $letter-spacing;
        text-decoration: none;

        & .icon {
          margin: 0 12.5px 0 0;
        }

        & .text {
        }

        &:hover {
        }

        &:active {
          color: #22c55e;
        }
      }

      &:hover {
        background-color: $color-light-blue;
      }

      &:active {
        background-color: $color-light-blue;
      }
    }
  }
}
</style>
