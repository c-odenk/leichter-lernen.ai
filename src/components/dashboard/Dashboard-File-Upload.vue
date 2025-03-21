<template>
  <div class="file-upload-container">
    <div class="component-header">
      <h3>Datei hochladen</h3>
      <div class="step-indicator">Schritt 1 von 3</div>
    </div>

    <div class="component-content">
      <div
        class="upload-dropzone"
        :class="{
          'is-uploading': isUploading,
          'has-file': selectedFile,
          'is-dragging': isDragging,
        }"
        @dragenter.prevent="setDragActive"
        @dragover.prevent="setDragActive"
        @dragleave.prevent="setDragInactive"
        @drop.prevent="handleFileDrop"
      >
        <div v-if="!isUploading && !selectedFile" class="upload-initial-state">
          <div class="upload-icon">
            <div class="icon-circle">
              <i class="fa-solid fa-arrow-up"></i>
            </div>
          </div>
          <p class="upload-text">Datei zum Hochladen auswählen</p>
          <p class="upload-subtext">oder hierher ziehen</p>

          <!-- ButtonBlue für "Dateien durchsuchen" -->
          <div class="centered-button-container">
            <ButtonBlue
              variant="primary"
              text="Dateien durchsuchen"
              @click="triggerFileInput"
              :isFileInputTrigger="true"
            />
          </div>

          <input
            type="file"
            id="file-input"
            accept=".csv,.doc,.docx,.pdf,.txt,.rtf"
            @change="handleFileSelect"
            class="hidden-input"
            ref="fileInput"
          />
        </div>

        <div v-if="isUploading" class="upload-progress-state">
          <div class="progress-circle">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="#f0f0f5"
                stroke-width="8"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="#3083e9"
                stroke-width="8"
                stroke-dasharray="226"
                :stroke-dashoffset="dashOffset"
                transform="rotate(-90 40 40)"
              />
            </svg>
            <div class="progress-text">{{ uploadProgress }}%</div>
          </div>
          <p class="uploading-text">Datei wird hochgeladen...</p>

          <!-- ButtonGray für "Abbrechen" während des Uploads -->
          <div class="centered-button-container">
            <ButtonGray
              variant="primary"
              text="Abbrechen"
              @click="cancelUpload"
            />
          </div>
        </div>

        <div v-if="selectedFile && !isUploading" class="file-selected-state">
          <div class="file-info">
            <div class="file-icon">
              <i :class="getFileIcon(selectedFile.name)"></i>
            </div>
            <div class="file-details">
              <p class="file-name">{{ selectedFile.name }}</p>
              <p class="file-size">
                {{ formatFileSize(selectedFile.size) }}
              </p>
            </div>

            <!-- ButtonBlue für den Remove-Button -->
            <ButtonBlue
              variant="dropdown"
              text="×"
              @click="removeFile"
              class="remove-button"
            />
          </div>
          <div
            class="upload-progress-bar"
            v-if="uploadProgress > 0 && uploadProgress < 100"
          >
            <div
              class="progress-bar-inner"
              :style="{ width: uploadProgress + '%' }"
            ></div>
          </div>
          <p class="progress-percentage" v-if="uploadProgress > 0">
            {{ uploadProgress }}%
          </p>
        </div>
      </div>

      <div class="navigation-buttons">
        <!-- ButtonGray für "Abbrechen" in der Navigation -->
        <div class="button-container">
          <ButtonGray
            variant="primary"
            text="Abbrechen"
            @click="handleCancel"
          />
        </div>

        <!-- ButtonBlue für "Weiter" -->
        <div class="button-container">
          <ButtonBlue
            variant="primary"
            text="Weiter"
            :disabled="!uploadComplete"
            @click="handleContinue"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileUpload",

  // Keine components-Definition mehr, da ButtonBlue und ButtonGray global registriert sind

  props: {
    maxFileSize: {
      type: Number,
      default: 10 * 1024 * 1024, // 10MB default max size
    },
  },

  data() {
    return {
      selectedFile: null,
      isUploading: false,
      isDragging: false,
      uploadProgress: 0,
      allowedFileTypes: [".csv", ".doc", ".docx", ".pdf", ".txt", ".rtf"],
      uploadComplete: false,

      // Zusätzlicher Schutz für triggerFileInput
      isInputTriggered: false,
    };
  },

  computed: {
    dashOffset() {
      const circumference = 2 * Math.PI * 36;
      return circumference - (this.uploadProgress / 100) * circumference;
    },
  },

  methods: {
    // Verbesserte triggerFileInput-Methode
    triggerFileInput() {
      // Doppelklick-Schutz auf dieser Seite
      if (this.isInputTriggered) {
        return;
      }

      // Setze Flag
      this.isInputTriggered = true;

      // Führe Aktion aus
      this.$refs.fileInput.click();

      // Setze Flag zurück nach Verzögerung
      setTimeout(() => {
        this.isInputTriggered = false;
      }, 1000); // Lange Verzögerung für sicheren Schutz
    },

    setDragActive() {
      this.isDragging = true;
    },

    setDragInactive() {
      this.isDragging = false;
    },

    handleFileDrop(event) {
      this.isDragging = false;
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.processFile(files[0]);
      }
    },

    handleFileSelect(event) {
      const files = event.target.files;
      if (files.length > 0) {
        this.processFile(files[0]);
      }
    },

    processFile(file) {
      // Validate file size
      if (file.size > this.maxFileSize) {
        alert(
          `Die Datei ist zu groß. Maximale Größe: ${this.formatFileSize(
            this.maxFileSize
          )}`
        );
        return;
      }

      // Validate file type
      const fileExtension = this.getFileExtension(file.name);
      if (this.isAllowedFileType(fileExtension)) {
        this.selectedFile = file;
        this.uploadComplete = false; // Reset upload state
        // Simulate processing
        this.simulateUpload();
      } else {
        alert(
          "Nicht unterstützter Dateityp. Bitte wählen Sie eine CSV-, Word- oder PDF-Datei aus."
        );
      }
    },

    getFileExtension(filename) {
      return "." + filename.split(".").pop().toLowerCase();
    },

    isAllowedFileType(extension) {
      return this.allowedFileTypes.includes(extension.toLowerCase());
    },

    getFileIcon(filename) {
      const extension = this.getFileExtension(filename);
      switch (extension) {
        case ".csv":
          return "fa-solid fa-file-excel";
        case ".doc":
        case ".docx":
          return "fa-solid fa-file-word";
        case ".pdf":
          return "fa-solid fa-file-pdf";
        case ".txt":
        case ".rtf":
          return "fa-solid fa-file-lines";
        default:
          return "fa-solid fa-file";
      }
    },

    removeFile() {
      this.selectedFile = null;
      this.uploadProgress = 0;
      this.uploadComplete = false;
      // Reset input
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = "";
      }
    },

    cancelUpload() {
      this.isUploading = false;
      this.uploadProgress = 0;
      this.uploadComplete = false;
    },

    simulateUpload() {
      this.isUploading = true;
      this.uploadProgress = 0;

      const interval = setInterval(() => {
        this.uploadProgress += 5;
        if (this.uploadProgress >= 100) {
          clearInterval(interval);
          this.isUploading = false;
          this.uploadComplete = true;

          // Emit completion event
          this.$emit("upload-complete", this.selectedFile);
        }
      }, 100);
    },

    formatFileSize(bytes) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    },

    handleCancel() {
      // Vollständig zurücksetzen
      this.removeFile();

      // Emit cancel event
      this.$emit("cancel");
    },

    handleContinue() {
      // Only allow continue if upload is complete
      if (this.uploadComplete) {
        this.$emit("continue", this.selectedFile);
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

.file-upload-container {
  width: $width-modal-desktop;
  background-color: $color-text-white;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
  overflow: hidden;
  font-family: $font-family;

  @include respond(laptop) {
    width: $width-modal-laptop;
  }
}

.component-header {
  padding: $spacing-sm $spacing-md;
  border-bottom: 1px solid #eee;
  background-color: $color-text-white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    color: $color-text-dark;
    font-size: $font-size-h3-lg;
    font-weight: 600;

    @include respond(tablet) {
      font-size: $font-size-h3-md;
    }
  }

  .step-indicator {
    font-size: 14px;
    font-weight: 500;
    color: $color-light-blue;
    background-color: lighten($color-light-blue, 35%);
    padding: 4px 10px;
    border-radius: $border-radius-sm;
  }
}

.component-content {
  padding: $spacing-md;
  background-color: $color-text-white;
}

.upload-dropzone {
  padding: $spacing-md;
  border: 2px dashed #ccd;
  border-radius: $border-radius-md;
  @include flex-center;
  flex-direction: column;
  min-height: 180px;
  background-color: $color-body-background;
  transition: all $transition-speed-medium $transition-timing;
  margin-bottom: $spacing-sm;

  &.is-dragging {
    border-color: $color-light-blue;
    background-color: lighten($color-light-blue, 35%);
  }

  &.is-uploading {
    background-color: $color-body-background;
  }

  &.has-file {
    background-color: $color-text-white;
    border-color: #e0e0e0;
    border-style: solid;
  }
}

/* Container für zentrierte Buttons */
.centered-button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: $spacing-sm;
}

.upload-initial-state {
  @include flex-center;
  flex-direction: column;
  text-align: center;
  width: 100%;
}

.upload-icon {
  margin-bottom: $spacing-sm;

  .icon-circle {
    width: 50px;
    height: 50px;
    border-radius: $border-radius-round;
    background-color: lighten($color-light-blue, 35%);
    @include flex-center;

    i {
      color: $color-light-blue;
      font-size: 20px;
    }
  }
}

.upload-text {
  margin: 5px 0;
  font-size: 16px;
  color: $color-text-dark;
  font-weight: 500;
}

.upload-subtext {
  margin: 5px 0 15px;
  color: #666;
  font-size: 14px;
}

.hidden-input {
  display: none;
}

.upload-progress-state {
  @include flex-center;
  flex-direction: column;
  width: 100%;
}

.progress-circle {
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: $spacing-sm;

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: 500;
    color: $color-light-blue;
  }
}

.uploading-text {
  margin: 5px 0 15px;
  color: #666;
}

.file-selected-state {
  width: 100%;
}

.file-info {
  display: flex;
  align-items: center;
  background-color: lighten($color-body-background, 2%);
  border-radius: $border-radius-sm;
  padding: 10px;
  margin-bottom: 10px;

  .file-icon {
    margin-right: 10px;

    i {
      font-size: 18px;
    }

    .fa-file-excel {
      color: #217346;
    }

    .fa-file-word {
      color: #2b579a;
    }

    .fa-file-pdf {
      color: #f40f02;
    }

    .fa-file-lines {
      color: #5a5a5a;
    }
  }

  .file-details {
    flex: 1;

    .file-name {
      margin: 0 0 3px;
      font-size: 14px;
      font-weight: 500;
    }

    .file-size {
      margin: 0;
      font-size: 12px;
      color: #666;
    }
  }

  /* Styling für den Remove-Button */
  .remove-button {
    width: 30px !important;
    height: 30px !important;
    padding: 0 !important;
    margin: 0 !important;

    :deep(.button-blue__text) {
      font-size: 20px;
      line-height: 1;
    }
  }
}

.upload-progress-bar {
  width: 100%;
  height: 6px;
  background-color: #f0f0f5;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 5px;

  .progress-bar-inner {
    height: 100%;
    background-color: $color-light-blue;
    border-radius: 3px;
  }
}

.progress-percentage {
  text-align: right;
  margin: 3px 0 0;
  font-size: 12px;
  color: #666;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: $spacing-md;
  padding-top: $spacing-sm;
  border-top: 1px solid #eee;
}

/* Container für einzelne Buttons in der Navigation */
.button-container {
  width: 120px;

  :deep(.button-blue),
  :deep(.button-gray) {
    width: 100% !important;
  }
}
</style>
