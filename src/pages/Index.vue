<template>
  <q-page class="flex flex-center">
    <left />
  </q-page>
</template>

<script>
import Left from "pages/left.vue";

export default {
  name: "PageIndex",
  components: {
    // Summary,
    Left,
  },
  computed: {
    count: {
      get() {
        return this.$store.state.tasks.count;
      },
      set(val) {
        this.$store.commit("tasks/increment", val);
      },
    },
  },
};
</script>
