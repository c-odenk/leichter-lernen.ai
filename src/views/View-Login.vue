<template>
  <div class="view-login">
    <!-- Mobile-Ansicht -->
    <MobileNotice v-if="isMobile" />

    <!-- Desktop/Tablet-Ansicht -->
    <div v-else class="desktop-view" :class="{ 'tablet-view': isTablet }">
      <div class="left-panel" v-if="!isTablet">
        <LoginWallpaper />
      </div>
      <div class="right-panel" :class="{ 'full-width': isTablet }">
        <LoginUserLogin />
      </div>
    </div>

    <!-- 
      Waitlist-Komponente - wird nur geladen, nicht angezeigt
      Später mit v-if="showWaitlist" steuerbar machen
    -->
    <Suspense>
      <template #default>
        <component
          :is="LoginWaitlist"
          v-if="false"
          class="waitlist-component"
        />
      </template>
      <template #fallback>
        <!-- Fallback während des Ladens, leer da nicht angezeigt -->
      </template>
    </Suspense>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from "vue";
import LoginWallpaper from "@/components/login/Login-Wallpaper.vue";
import LoginUserLogin from "@/components/login/Login-User-Login.vue";
import MobileNotice from "@/components/mobilenotice/Mobile-Notice.vue";

// Lazy-Load der Waitlist-Komponente für bessere Performance
const LoginWaitlist = defineAsyncComponent(() =>
  import("@/components/login/Login-Waitlist.vue")
);

export default {
  name: "ViewLogin",
  components: {
    LoginWallpaper,
    LoginUserLogin,
    MobileNotice,
  },
  setup() {
    // Reaktive Zustände
    const isMobile = ref(false);
    const isTablet = ref(false);

    // Hilfsfunktionen
    const checkDevice = () => {
      const width = window.innerWidth;
      isMobile.value = width <= 767; // Entspricht $breakpoint-smartphone
      isTablet.value = width > 767 && width <= 1024; // Zwischen smartphone und laptop (tablet-Bereich)
    };

    // Lifecycle-Hooks und Event-Handling
    onMounted(() => {
      // Initial prüfen
      checkDevice();

      // Event-Listener hinzufügen mit throttling
      const resizeHandler = (function () {
        let timeout;
        return function () {
          clearTimeout(timeout);
          timeout = setTimeout(checkDevice, 150);
        };
      })();

      window.addEventListener("resize", resizeHandler);

      // Cleanup-Funktion
      onUnmounted(() => {
        window.removeEventListener("resize", resizeHandler);
      });
    });

    return {
      isMobile,
      isTablet,
      LoginWaitlist, // Komponente an das Template übergeben
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/Variables.scss";

// Haupt-Container
.view-login {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

// Desktop-Layout
.desktop-view {
  display: flex;
  width: 100%;
  height: 100%;

  &.tablet-view {
    // Spezifische Anpassungen für Tablet-Ansicht
    justify-content: center;
  }
}

// Linke Spalte (Wallpaper)
.left-panel {
  width: 50%;
  height: 100vh;
}

// Rechte Spalte (Login)
.right-panel {
  width: 50%;
  height: 100vh;
  position: relative;

  &.full-width {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
  }
}

// Waitlist (initial versteckt)
.waitlist-component {
  display: none;
}

// Mediaqueries nutzen, um das Verhalten zusätzlich über CSS zu steuern
// Dies ist eine alternative Methode zur Vue-basierten Anzeigenlogik
@include respond(tablet-only) {
  .left-panel {
    display: none;
  }

  .right-panel {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
  }
}
</style>
