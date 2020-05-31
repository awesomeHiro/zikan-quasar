<template>
  <div class="carousel">
    <v-window
      v-model="currentCarousel"
      :continuous="false"
      :show-arrows="showArrows"
      hide-delimiters
    >
      <v-window-item><left /></v-window-item>
      <v-window-item><center /></v-window-item>
      <v-window-item><right /></v-window-item>
    </v-window>
  </div>
</template>
<script>
import left from "~/pages/left.vue";
import center from "~/pages/center.vue";
import right from "~/pages/right.vue";

export default {
  components: {
    left,
    center,
    right,
  },
  computed: {
    currentCarousel: {
      get() {
        return this.$store.getters["meta/currentCarousel"];
      },
      set(value) {
        this.$store.commit("meta/setCurrentCarousel", value);
      },
    },
    showArrows() {
      if (this.currentCarousel === 1) return false;
      return true;
    },
  },
};
</script>
