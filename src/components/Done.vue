<template>
  <div>
    <v-list two-line dense>
      <v-list-item-group active-class="blue--text">
        <div v-for="section in sections" :key="section.id">
          <v-row align="center" justify="center" class="caption" no-gutters>
            <v-col><v-divider clsss="ma-2"/></v-col>
            <v-col
              v-if="
                $store.getters['tasks/bySectionId'](section.id).filter(
                  t => t.end !== '',
                ).length !== 0
              "
              cols="auto"
            >
              <div class="body-1">
                {{ section.name }} {{ section.start }} - {{ section.desc }}
              </div>
            </v-col>
            <v-col><v-divider clsss="ma-2"/></v-col>
          </v-row>
          <v-list-item
            v-for="(t, ti) in $store.getters['tasks/bySectionId'](
              section.id,
            ).filter(t => t.end !== '')"
            :key="t.id"
            :disabled="Boolean(t.start)"
            class="pl-0 pr-0"
            active-class="pink--text"
          >
            <v-col cols="1" class="pa-0 ma-0">
              <div class="pa-0 ma-0 subtle--text">
                <span>
                  {{ $store.getters['sections/byId'](t.sectionId).name }}
                </span>
              </div>
            </v-col>
            <v-col class="text-left pa-0">
              <v-list-item-content class="pa-0">
                <v-list-item-title
                  class="subtitle-2 subtle--text"
                  v-text="t.repeat ? t.name + ' ↺' : t.name"
                ></v-list-item-title>
                <v-list-item-subtitle
                  class="barely--text"
                  v-text="$store.getters['projects/byId'](t.projectId).name"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  class="barely--text"
                  v-text="t.sortToken.slice(0, 3)"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-col>
            <v-col cols="1" class="pa-0 ma-0">
              <div class="barely--text">
                {{ t.estimate }}
              </div>
              <div v-if="t.result" class="subtle--text">
                {{ t.result }}
              </div>
            </v-col>
            <v-col cols="1" class="pa-0 ma-0">
              <!-- eslint-disable-next-line prettier/prettier -->
                <div  v-if="t.result" :class="0 >= t.result - t.estimate  ? 'success--text' : 'error--text'">
                <!-- eslint-disable-next-line prettier/prettier -->
                  {{
                  0 >= t.result - t.estimate
                    ? t.result - t.estimate
                    : '+' + (t.result - t.estimate)
                }}
              </div>
            </v-col>
            <v-col cols="1" class="ma-0 pa-0">
              <div v-if="!ti" class="subtle--text">
                {{ t.start }}
              </div>
              <div v-if="t.end" class="subtle--text">
                {{ t.end }}
              </div>
              <div v-if="!t.end" class="barely--text">
                {{ t.estFinishAt }}
              </div>
            </v-col>
          </v-list-item>
        </div>
      </v-list-item-group>
      <v-list-item />
    </v-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sections: this.$store.state.sections.sections,
    }
  },
  computed: {
    tasks: {
      get() {
        return this.$store.getters['tasks/sorted']
      },
      set(payload) {
        this.$store.dispatch('tasks/updateOrder', payload)
      },
    },
  },
}
</script>
