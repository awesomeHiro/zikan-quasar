<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn fixed bottom left v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="section in sections"
          :key="section.id"
          @click="sheet = false"
        >
          <v-list-item-title>{{ section.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sheet: false,
      sections: this.$store.state.sections.sections,
    }
  },
}
</script>
