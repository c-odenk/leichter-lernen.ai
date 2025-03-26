<template>
  <div class="mobile-notice">
    <div class="notice-content">
      <div class="notice-icon">📱❌</div>
      <h2>Nur auf größeren Geräten verfügbar</h2>
      <p>
        Unsere Lernplattform benötigt für eine optimale Nutzererfahrung einen
        größeren Bildschirm.
      </p>
      <p>
        Bitte nutze ein Tablet, einen Laptop oder einen Desktop-PC, um auf die
        Plattform zuzugreifen.
      </p>
      <a href="/" class="back-link">Zurück zur Startseite</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileNoticeSection",
};
</script>

<style lang="scss" scoped>
@use "../../variables/variables.scss" as *;

.mobile-notice {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $spacing-md;
  box-sizing: border-box;
  background-color: $color-body-background;
}

.notice-content {
  width: 100%;
  max-width: 500px;
  padding: $spacing-lg;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background-color: $color-text-white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-lg;
  text-align: center;
}

.notice-icon {
  font-size: 48px;
  margin-bottom: $spacing-md;
}

h2 {
  margin: 0 0 $spacing-md;
  font-size: $font-size-h2-lg;
  font-weight: 700;
  color: $color-dark-blue;
}

p {
  margin-bottom: $spacing-md;
  color: $color-text-dark;
  line-height: 1.5;
  font-size: 16px;

  &:last-of-type {
    margin-bottom: $spacing-lg;
  }
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: $color-light-blue;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color $transition-speed-fast;

  &:hover {
    color: $color-light-blue-darker;
  }
}
</style>
