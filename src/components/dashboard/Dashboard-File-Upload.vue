<template>
  <div class="file-upload-container">
    <div class="upload-header">
      <h3>Datei hochladen</h3>
    </div>

    <div class="upload-content">
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
        <!-- Initial Upload State -->
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

        <!-- Uploading State -->
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

        <!-- Selected File State -->
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

      <div class="url-upload-section">
        <p class="url-title">Oder von URL hochladen</p>
        <div class="url-input-container">
          <input
            type="text"
            class="url-input"
            placeholder="https://meinewebsite.de/datei"
            v-model="fileUrl"
          />
          <button
            class="url-upload-button"
            :disabled="!fileUrl"
            @click="uploadFromUrl"
          >
            Hochladen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileUpload",
  props: {
    maxFileSize: {
      type: Number,
      default: 10 * 1024 * 1024, // 10MB default max size
    },
  },
  data() {
    return {
      selectedFile: null,
      fileUrl: "",
      isUploading: false,
      isDragging: false,
      uploadProgress: 0,
      allowedFileTypes: [".csv", ".doc", ".docx", ".pdf", ".txt", ".rtf"],
    };
  },
  computed: {
    dashOffset() {
      const circumference = 2 * Math.PI * 36;
      return circumference - (this.uploadProgress / 100) * circumference;
    },
  },
  methods: {
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
      // Reset input
      const input = document.getElementById("file-input");
      if (input) {
        input.value = "";
      }
    },
    cancelUpload() {
      this.isUploading = false;
      this.uploadProgress = 0;
    },
    uploadFromUrl() {
      if (this.fileUrl) {
        // Validate URL file type
        const fileExtension = this.getFileExtension(this.fileUrl);
        if (this.isAllowedFileType(fileExtension)) {
          this.isUploading = true;
          // Simulate URL upload
          this.simulateUpload();
        } else {
          alert(
            "Die URL muss auf eine unterstützte Datei verweisen (CSV, Word, PDF, TXT, RTF)"
          );
        }
      }
    },
    simulateUpload() {
      this.isUploading = true;
      this.uploadProgress = 0;

      const interval = setInterval(() => {
        this.uploadProgress += 5;
        if (this.uploadProgress >= 100) {
          clearInterval(interval);
          this.isUploading = false;

          // Emit completion event
          this.$emit("upload-complete", this.selectedFile || this.fileUrl);
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/variables/variables.scss";

// Component Container Layout
.file-upload-container {
  width: $width-modal-lg;
  background-color: $color-text-white;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
  overflow: hidden;
  font-family: $font-family;

  @include respond(tablet) {
    max-width: 100%;
  }
}

// Header Styles
.upload-header {
  padding: $spacing-sm $spacing-md;
  border-bottom: 1px solid #eee;
  background-color: $color-text-white;

  h3 {
    margin: 0;
    color: $color-text-dark;
    font-size: $font-size-h3-lg;

    @include respond(tablet) {
      font-size: $font-size-h3-md;
    }

    @include respond(phone) {
      font-size: $font-size-h3-sm;
    }
  }
}

// Main Content Styles
.upload-content {
  padding: $spacing-md;
  background-color: $color-text-white;

  @include respond(phone) {
    padding: $spacing-sm;
  }
}

// Dropzone Styles
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

  @include respond(phone) {
    padding: $spacing-sm;
    min-height: 150px;
  }
}

// Initial State Styles
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

// URL Upload Styles
.url-upload-section {
  .url-title {
    margin: $spacing-sm 0 $spacing-xs;
    font-size: 14px;
    color: #666;
  }

  .url-input-container {
    display: flex;

    .url-input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-right: none;
      border-radius: $border-radius-sm 0 0 $border-radius-sm;
      font-size: 14px;
      transition: border-color $transition-speed-fast $transition-timing;

      &:focus {
        outline: none;
        border-color: $color-light-blue;
      }
    }

    .url-upload-button {
      @include primary-button;
      border-radius: 0 $border-radius-sm $border-radius-sm 0;
      padding: 10px 15px;
      border: none;
    }
  }
}

// Progress State Styles
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

// File Selected State Styles
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
      color: #217346; // Excel green color
    }

    .fa-file-word {
      color: #2b579a; // Word blue color
    }

    .fa-file-pdf {
      color: #f40f02; // PDF red color
    }

    .fa-file-lines {
      color: #5a5a5a; // Text dark gray color
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
</style>
