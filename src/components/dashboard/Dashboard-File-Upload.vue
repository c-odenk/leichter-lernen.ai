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
          <label for="file-input" class="file-select-button">
            Dateien durchsuchen
          </label>
          <input
            type="file"
            id="file-input"
            accept=".csv,.doc,.docx,.pdf,.txt,.rtf"
            @change="handleFileSelect"
            class="hidden-input"
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
          <button class="cancel-button" @click="cancelUpload">Abbrechen</button>
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
            <button class="remove-file-button" @click="removeFile">×</button>
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
        <button class="secondary-button" @click="handleCancel">
          Abbrechen
        </button>
        <button
          class="primary-button"
          :disabled="!uploadComplete"
          @click="handleContinue"
        >
          Weiter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileUpload",

  // Props: Konfigurationseigenschaften, die von der übergeordneten Komponente übergeben werden
  props: {
    /**
     * Maximale Dateigröße in Bytes, die hochgeladen werden kann
     * Default: 10MB (10 * 1024 * 1024 Bytes)
     */
    maxFileSize: {
      type: Number,
      default: 10 * 1024 * 1024, // 10MB default max size
    },
  },

  // Reaktive Daten der Komponente
  data() {
    return {
      /**
       * Speichert die aktuell ausgewählte Datei
       * null bedeutet, dass keine Datei ausgewählt ist
       */
      selectedFile: null,

      /**
       * Flag, das anzeigt, ob gerade ein Upload im Gange ist
       */
      isUploading: false,

      /**
       * Flag, das anzeigt, ob der Benutzer gerade eine Datei über die Drop-Zone zieht
       */
      isDragging: false,

      /**
       * Aktueller Fortschritt des Uploads in Prozent (0-100)
       */
      uploadProgress: 0,

      /**
       * Liste der erlaubten Dateierweiterungen
       */
      allowedFileTypes: [".csv", ".doc", ".docx", ".pdf", ".txt", ".rtf"],

      /**
       * Flag, das anzeigt, ob der Upload vollständig abgeschlossen ist
       */
      uploadComplete: false,
    };
  },

  // Berechnete Eigenschaften
  computed: {
    /**
     * Berechnet den Versatz für den Fortschrittskreis bei kreisförmiger Anzeige
     * Wird verwendet, um den SVG-Kreis proportional zum Upload-Fortschritt zu füllen
     *
     * @returns {number} Der Versatz für das stroke-dashoffset Attribut des SVG-Kreises
     */
    dashOffset() {
      const circumference = 2 * Math.PI * 36;
      return circumference - (this.uploadProgress / 100) * circumference;
    },
  },

  // Methoden zur Interaktion mit der Komponente
  methods: {
    /**
     * Setzt den Status auf "aktives Ziehen", wenn eine Datei über die Drop-Zone gezogen wird
     */
    setDragActive() {
      this.isDragging = true;
    },

    /**
     * Setzt den Status auf "inaktives Ziehen", wenn eine Datei die Drop-Zone verlässt
     */
    setDragInactive() {
      this.isDragging = false;
    },

    /**
     * Verarbeitet eine Datei, die per Drag & Drop in die Drop-Zone gezogen wurde
     *
     * @param {DragEvent} event - Das Drop-Event
     */
    handleFileDrop(event) {
      this.isDragging = false;
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.processFile(files[0]);
      }
    },

    /**
     * Verarbeitet eine Datei, die über den Datei-Dialog ausgewählt wurde
     *
     * @param {Event} event - Das Change-Event des Datei-Inputs
     */
    handleFileSelect(event) {
      const files = event.target.files;
      if (files.length > 0) {
        this.processFile(files[0]);
      }
    },

    /**
     * Verarbeitet und validiert eine Datei vor dem Upload
     * Prüft Dateigröße und Dateityp und beginnt den Upload-Prozess
     *
     * @param {File} file - Die zu verarbeitende Datei
     */
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

    /**
     * Extrahiert die Dateierweiterung aus einem Dateinamen
     *
     * @param {string} filename - Der Dateiname inklusive Erweiterung
     * @returns {string} Die Dateierweiterung mit führendem Punkt (z.B. ".pdf")
     */
    getFileExtension(filename) {
      return "." + filename.split(".").pop().toLowerCase();
    },

    /**
     * Prüft, ob eine Dateierweiterung zu den erlaubten Typen gehört
     *
     * @param {string} extension - Die zu prüfende Dateierweiterung
     * @returns {boolean} True, wenn der Dateityp erlaubt ist
     */
    isAllowedFileType(extension) {
      return this.allowedFileTypes.includes(extension.toLowerCase());
    },

    /**
     * Bestimmt das passende Icon für einen Dateityp basierend auf der Erweiterung
     *
     * @param {string} filename - Der Dateiname inklusive Erweiterung
     * @returns {string} Die CSS-Klasse für das passende FontAwesome-Icon
     */
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

    /**
     * Entfernt die ausgewählte Datei und setzt den Zustand zurück
     */
    removeFile() {
      this.selectedFile = null;
      this.uploadProgress = 0;
      this.uploadComplete = false;
      // Reset input
      const input = document.getElementById("file-input");
      if (input) {
        input.value = "";
      }
    },

    /**
     * Bricht den laufenden Upload ab und setzt den Zustand zurück
     */
    cancelUpload() {
      this.isUploading = false;
      this.uploadProgress = 0;
      this.uploadComplete = false;
    },

    /**
     * Simuliert einen Upload-Prozess mit schrittweise ansteigendem Fortschritt
     * In einer echten Anwendung würde hier der tatsächliche API-Aufruf zum Upload erfolgen
     */
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

    /**
     * Formatiert eine Dateigröße in Bytes in eine besser lesbare Form (KB, MB, GB)
     *
     * @param {number} bytes - Die Dateigröße in Bytes
     * @returns {string} Die formatierte Dateigröße mit Einheit (z.B. "2.5 MB")
     */
    formatFileSize(bytes) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    },

    /**
     * Behandelt den Klick auf den "Abbrechen"-Button
     * Setzt den Zustand zurück und emittiert ein "cancel"-Event
     */
    handleCancel() {
      // Vollständig zurücksetzen
      this.removeFile();

      // Emit cancel event
      this.$emit("cancel");
    },

    /**
     * Behandelt den Klick auf den "Weiter"-Button
     * Emittiert ein "continue"-Event mit der hochgeladenen Datei als Payload,
     * wenn der Upload abgeschlossen ist
     */
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

.file-select-button {
  @include primary-button;
  margin-bottom: $spacing-sm;
  cursor: pointer;
  padding: 10px 20px;
  border: none;
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

.cancel-button {
  background: none;
  border: none;
  color: $color-light-blue;
  font-size: 14px;
  cursor: pointer;
  padding: 5px 10px;
  transition: all $transition-speed-fast $transition-timing;

  &:hover {
    text-decoration: underline;
  }
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

  .remove-file-button {
    background: none;
    border: none;
    color: #999;
    font-size: 18px;
    cursor: pointer;
    transition: color $transition-speed-fast $transition-timing;

    &:hover {
      color: #666;
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
  margin-top: $spacing-md;
  padding-top: $spacing-sm;
  border-top: 1px solid #eee;
}

.secondary-button {
  padding: 10px 20px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: $border-radius-sm;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all $transition-speed-fast $transition-timing;

  &:hover {
    background-color: #f5f5f5;
  }
}

.primary-button {
  @include primary-button;
  padding: 10px 30px;
  border: none;

  &:disabled {
    background-color: lighten($color-light-blue, 25%);
    cursor: not-allowed;
  }
}
</style>
