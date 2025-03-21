<template>
  <div class="dashboard-sidebar" :class="{ collapsed: isCollapsed }">
    <div class="dashboard-sidebar__logo">
      <div class="img-platzhalter" @click="toggleSidebar"></div>
    </div>

    <!-- Toggle Button eingefügt zwischen Logo und Menü -->
    <div class="toggle-button-container">
      <div class="toggle-button" @click="toggleSidebar">
        <i
          :class="
            isCollapsed ? 'fa-solid fa-angle-right' : 'fa-solid fa-angle-left'
          "
        ></i>
      </div>
    </div>

    <div class="dashboard-sidebar__menu">
      <div class="dashboard-sidebar__menu__section top">
        <div class="sidebar-button-wrapper">
          <button-blue
            @click="$router.push('/newtopic')"
            class="sidebar-button"
            variant="primary"
            :text="isCollapsed ? '' : 'Neues Thema'"
            icon="fa-solid fa-plus"
            :iconPosition="isCollapsed ? 'right' : 'left'"
          />
        </div>

        <div v-if="menuItems.length > 0" class="theme-section">
          <h3 class="section-title" v-if="!isCollapsed">Deine Themen</h3>
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
                :title="isCollapsed ? item.name : ''"
              >
                <i class="fa-solid fa-file-lines"></i>
                <span class="text" v-if="!isCollapsed">{{ item.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="dashboard-sidebar__menu__section bottom">
        <ul class="utility-list">
          <li>
            <router-link
              to="/settings"
              class="menu-item utility-link"
              title="Einstellungen"
            >
              <!-- Icon nur zeigen, wenn sidebar eingeklappt ist -->
              <i v-if="isCollapsed" class="fa-solid fa-gear"></i>
              <span class="text" v-if="!isCollapsed">Einstellungen</span>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="menu-item utility-link" title="Abmelden">
              <span class="text" v-if="!isCollapsed">Abmelden</span>
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
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

      // Status für ein-/ausgeklappte Sidebar
      isCollapsed: false,
    };
  },

  // Lebenszyklusmethoden
  created() {
    // Prüfe, ob ein zuvor gespeicherter Zustand existiert
    const savedState = localStorage.getItem("sidebarCollapsed");
    if (savedState !== null) {
      this.isCollapsed = JSON.parse(savedState);
    }

    // Initialer Check der Bildschirmbreite
    this.checkScreenWidth();

    // Event-Listener für Bildschirmgrößenänderungen
    window.addEventListener("resize", this.checkScreenWidth);
  },

  beforeUnmount() {
    // Event-Listener entfernen, wenn Komponente zerstört wird
    window.removeEventListener("resize", this.checkScreenWidth);
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

    /**
     * Wechselt zwischen ein- und ausgeklapptem Zustand der Sidebar
     */
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
      // Speichere Zustand im localStorage
      localStorage.setItem(
        "sidebarCollapsed",
        JSON.stringify(this.isCollapsed)
      );
    },

    /**
     * Prüft die Bildschirmbreite und passt den Sidebar-Zustand an
     * Auf mobilen Geräten wird die Sidebar automatisch ausgeblendet
     */
    checkScreenWidth() {
      // Auf Handys (< $breakpoint-smartphone) immer ausgeklappt
      if (window.innerWidth <= 767) {
        this.isCollapsed = false;
      }
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

  @include respond(laptop) {
    width: 19vw;
    max-width: 300px;
  }

  @include respond(tablet) {
    width: 27vw;
    max-width: 280px;
  }

  // Kollabierter Zustand
  &.collapsed {
    width: 75px;

    .dashboard-sidebar__logo {
      padding: calc($spacing-md - 5px) calc(($spacing-md - 5px) / 2) $spacing-md
        calc(($spacing-md - 5px) / 2);
      margin-bottom: 0;

      .img-platzhalter {
        height: 60px;
      }
    }

    .toggle-button-container {
      margin-top: -15px;
      margin-bottom: $spacing-md;

      .toggle-button {
        margin-left: auto;
        margin-right: auto;
      }
    }

    .dashboard-sidebar__menu {
      padding: $spacing-sm calc(($spacing-md - 5px) / 2);

      .section-title {
        display: none;
      }

      .sidebar-button-wrapper {
        margin-bottom: calc($spacing-xs - 6px);

        :deep(.button-blue) {
          padding: 10px !important;
          justify-content: center !important;

          .button-blue__text {
            display: none;
          }

          .button-blue__icon {
            margin: 0 !important;
            font-size: $font-size-p-lg !important;
          }
        }
      }

      .theme-section {
        margin-bottom: $spacing-md;
      }

      .menu-item {
        padding: 10px;
        justify-content: center;

        i {
          margin-right: 0;
          font-size: $font-size-p-lg;
        }
      }

      .utility-list {
        .menu-item.utility-link {
          justify-content: center;

          i {
            margin: 0;
          }
        }
      }
    }
  }

  &__logo {
    padding: calc($spacing-md - 5px) calc($spacing-md - 5px)
      calc($spacing-md - 20px) calc($spacing-md - 5px);
    cursor: pointer;
    margin-bottom: 0;

    @include respond(laptop) {
    }

    .img-platzhalter {
      width: 100%;
      height: 100px;
      background-color: $color-light-blue;
      border-radius: $border-radius-md;
      transition: background-color $transition-speed-medium $transition-timing,
        height $transition-speed-medium $transition-timing;

      &:hover {
        background-color: $color-light-blue-darker;
      }
    }
  }

  // Neuer Container für den Toggle-Button
  .toggle-button-container {
    // margin-top: -150px;
    padding: 0 calc($spacing-md - 5px);
    display: flex;
    justify-content: flex-end;
    margin-top: $spacing-xs;
    margin-bottom: $spacing-sm;
    transition: margin $transition-speed-medium $transition-timing;
  }

  .toggle-button {
    width: 30px;
    height: 30px;
    background-color: $color-light-blue;
    border-radius: $border-radius-round;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: $color-text-white;
    transition: background-color $transition-speed-medium $transition-timing,
      margin $transition-speed-medium $transition-timing;

    &:hover {
      background-color: $color-light-blue-darker;
    }

    i {
      font-size: 14px;
    }
  }

  &__menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    padding: $spacing-md calc($spacing-md - 5px);
    transition: padding $transition-speed-medium $transition-timing;

    &__section {
      &.top {
        flex-grow: 1;
      }

      &.bottom {
        position: relative;
      }
    }

    .section-title {
      margin: $spacing-sm 0 $spacing-xs 0;
      color: rgba(255, 255, 255, 0.7);
      font-size: $font-size-p-lg;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: opacity $transition-speed-medium $transition-timing;
    }

    .sidebar-button-wrapper {
      width: 100%;
      margin-bottom: $spacing-md;

      :deep(.button-blue) {
        width: 100%;
        margin: 0;
        padding: 12px 15px;
        font-size: calc($font-size-p-lg - 2px);
        transition: padding $transition-speed-medium $transition-timing;
        border-radius: $border-radius-sm;

        .button-blue__icon {
          font-size: calc($font-size-p-lg - 4px);
          margin: 0 10px 0 0;
          transition: margin $transition-speed-medium $transition-timing,
            font-size $transition-speed-medium $transition-timing;
        }
      }
    }

    .theme-section {
      margin-bottom: $spacing-lg; // Normaler Abstand in Desktop-Ansicht
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
      transition: all $transition-speed-fast $transition-timing,
        padding $transition-speed-medium $transition-timing;

      i {
        width: 18px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
        text-align: center;
        margin-right: $spacing-xs;
        transition: margin $transition-speed-medium $transition-timing,
          font-size $transition-speed-medium $transition-timing;
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
        transition: opacity $transition-speed-medium $transition-timing;
      }

      &.utility-link {
        justify-content: space-between;

        i {
          margin-right: 0;
          margin-left: auto;
          transition: margin $transition-speed-medium $transition-timing;
        }
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
</style>
