<template>
  <div class="dashboard-sidebar">
    <div class="dashboard-sidebar__logo">
      <div class="img-platzhalter"></div>
    </div>

    <div class="dashboard-sidebar__menu">
      <div class="dashboard-sidebar__menu__section top">
        <button
          @click="$router.push('/')"
          class="primary-button sidebar-button"
        >
          <i class="fa-solid fa-plus"></i>
          <span>Neues Thema</span>
        </button>

        <div v-if="menuItems.length > 0" class="theme-section">
          <h3 class="section-title">Deine Themen</h3>
          <ul class="theme-list">
            <li
              v-for="(item, index) in menuItems"
              :key="index"
              class="theme-item"
            >
              <router-link
                :to="item.link"
                class="menu-item"
                :class="{ active: isActive(item.link) }"
              >
                <span class="indicator"></span>
                <span class="text">{{ item.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="dashboard-sidebar__menu__section bottom">
        <!-- <h3 class="section-title">Optionen</h3> -->
        <ul class="utility-list">
          <li>
            <router-link to="/settings" class="menu-item">
              <i class="fa-solid fa-gear"></i>
              <span class="text">Einstellungen</span>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="menu-item">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
              <span class="text">Abmelden</span>
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
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
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
  padding: $spacing-md;
  background-color: $color-dark-blue;
  box-shadow: $shadow-md;
  box-sizing: border-box;
  transition: width $transition-speed-medium $transition-timing;
  overflow-y: auto;
  overflow-x: hidden;

  @include respond(tablet) {
    width: 250px;
    padding: $spacing-sm;
  }

  @include respond(phone) {
    width: 100%;
    height: auto;
    position: static;
  }

  &__logo {
    margin-bottom: $spacing-lg;

    .img-platzhalter {
      width: 100%;
      height: 100px;
      background-color: $color-light-blue;
      border-radius: $border-radius-md;
      transition: background-color $transition-speed-medium $transition-timing;

      &:hover {
        background-color: $color-light-blue-darker;
      }
    }
  }

  &__menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    gap: $spacing-lg;

    &__section {
      &.top {
        flex-grow: 1;
      }
    }

    .section-title {
      margin: $spacing-md 0 $spacing-xs 5px;
      color: transparentize($color-text-white, 0.3);
      font-size: calc($font-size-p-lg - 2px);
      font-weight: 500;
      // text-transform: uppercase;
      letter-spacing: 1px;
    }

    .sidebar-button {
      width: 100%;
      margin-bottom: $spacing-md;
      justify-content: center;
      gap: $spacing-xs;
      font-weight: 500;
      border: none;

      i {
        font-size: calc($font-size-p-lg - 2px);
        margin: 0 10px 0 0;
      }
    }

    .theme-section {
      margin-bottom: $spacing-md;
    }

    .theme-list,
    .utility-list {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        margin: 2px 0;
        border-radius: $border-radius-md;
      }
    }

    .theme-item {
      // padding-left: $spacing-xs;
    }

    .menu-item {
      display: flex;
      align-items: center;
      padding: $spacing-xs $spacing-sm;
      color: $color-text-white;
      font-size: calc($font-size-p-lg - 3px);
      text-decoration: none;
      border-radius: $border-radius-md;
      transition: background-color $transition-speed-fast $transition-timing;

      &:hover,
      &.active {
        background-color: transparentize($color-light-blue, 0.7);
      }

      &.active {
        font-weight: 500;

        .indicator {
          opacity: 1;
        }
      }

      .indicator {
        width: 4px;
        height: 4px;
        margin-right: $spacing-xs;
        background-color: $color-light-blue-lighter;
        border-radius: $border-radius-round;
        opacity: 0;
        transition: opacity $transition-speed-fast $transition-timing;

        display: none;
      }

      i {
        margin-right: $spacing-xs;
        width: 20px;
        text-align: center;
      }

      @include respond(tablet) {
        font-size: $font-size-p-md;
      }

      @include respond(phone) {
        font-size: $font-size-p-sm;
      }
    }
  }
}

// Verwenden des vordefinierten primary-button mixins
.primary-button {
  @include primary-button;
}
</style>
