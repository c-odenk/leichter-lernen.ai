<template>
  <div class="dashboard-sidebar">
    <div class="dashboard-sidebar__logo">
      <div class="img-platzhalter"></div>
    </div>

    <div class="dashboard-sidebar__menu">
      <div class="dashboard-sidebar__menu__section top">
        <button
          @click="$router.push('/newtopic')"
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
                <i class="fa-solid fa-file-lines"></i>
                <span class="text">{{ item.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="dashboard-sidebar__menu__section bottom">
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

  // Reaktive Daten der Komponente
  data() {
    return {
      /**
       * Array der Menüeinträge für die Themennavigation
       * Jeder Eintrag hat einen Namen und einen Link zur entsprechenden Route
       */
      menuItems: [
        { name: "Personalbeschaffung & -planung", link: "/dashboard" },
        { name: "Thema 2", link: "/thema2" },
        { name: "Thema 3", link: "/thema3" },
        { name: "Thema 4", link: "/thema4" },
      ],
    };
  },

  // Methoden zur Interaktion mit der Komponente
  methods: {
    /**
     * Prüft, ob eine Route der aktuellen aktiven Route entspricht
     * Wird verwendet, um den aktiven Menüpunkt visuell hervorzuheben
     *
     * @param {string} route - Der zu prüfende Routenpfad
     * @returns {boolean} True, wenn die übergebene Route der aktuellen Route entspricht
     */
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

*,
*::before,
*::after {
  box-sizing: border-box;
}

.dashboard-sidebar {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 12vw;
  max-width: 300px;
  background-color: $color-dark-blue;
  box-shadow: $shadow-md;
  transition: width $transition-speed-medium $transition-timing;
  overflow-y: auto;
  overflow-x: hidden;

  @include respond(tablet) {
    width: 250px;
  }

  &__logo {
    padding: $spacing-md calc($spacing-md - 5px);

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
    padding: $spacing-md calc($spacing-md - 5px);

    &__section {
      &.top {
        flex-grow: 1;
      }
    }

    .section-title {
      margin: $spacing-sm 0 $spacing-xs 0;
      color: rgba(255, 255, 255, 0.7);
      font-size: $font-size-p-lg;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .sidebar-button {
      width: 100%;
      margin-bottom: $spacing-md;
      justify-content: center;
      align-items: center;
      gap: $spacing-xs;
      font-weight: 500;
      border: none;
      padding: 12px 15px;
      border-radius: $border-radius-sm;
      font-size: calc($font-size-p-lg - 2px);

      i {
        font-size: calc($font-size-p-lg - 4px);
        margin: 0 10px 0 0;
      }
    }

    .theme-section {
      margin-bottom: $spacing-lg;
    }

    .theme-list,
    .utility-list {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        margin: 2px 0;
      }
    }

    .menu-item {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      color: $color-text-white;
      font-size: calc($font-size-p-lg - 2px);
      text-decoration: none;
      border-radius: $border-radius-sm;
      transition: all $transition-speed-fast $transition-timing;

      i {
        margin-right: $spacing-xs;
        width: 18px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
        text-align: center;
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &.active {
        background-color: $color-light-blue;
        font-weight: 500;

        i {
          color: $color-text-white;
        }
      }

      .text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.utility-list {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: $spacing-sm;
  font-size: calc($font-size-p-lg - 2px);

  .menu-item {
    color: rgba(255, 255, 255, 0.8);

    &:hover {
      color: $color-text-white;
    }
  }
}

.primary-button {
  @include primary-button;
}
</style>
