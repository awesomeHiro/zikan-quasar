<template>
  <div>
    <q-list two-line dense>
      <q-item v-for="section in sections" :key="section.id" v-ripple clickable>
        <q-item-section>{{ section }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sections: this.$store.state.sections.sections,
    };
  },
  computed: {
    tasks: {
      get() {
        const tasks = this.$store.getters["tasks/sorted"];
        return tasks.filter(t => t.end === "");
      },
      set(payload) {
        this.$store.dispatch("tasks/updateOrder", payload);
      },
    },
  },
};
</script>
