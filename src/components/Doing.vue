<template>
  <div>
    <v-row align="center" justify="center" class="caption" no-gutters>
      <v-col><v-divider clsss="ma-2"/></v-col>
      <v-col cols="auto"><div>DOING</div></v-col>
      <v-col><v-divider clsss="ma-2"/></v-col>
    </v-row>
    <v-list two-line dense>
      <v-list-item-group v-model="selected" active-class="blue--text">
        <v-row class="pa-0 ma-0">
          <v-col>
            <Summary
              v-if="$store.getters['tasks/bySectionId'](section.id).length > 0"
              :tasks="$store.getters['tasks/bySectionId'](section.id)"
            />
          </v-col>
        </v-row>

        <v-row align="center" justify="center" class="caption" no-gutters>
          <v-col><v-divider clsss="ma-2"/></v-col>
          <v-col cols="auto">
            <div class="body-1">
              {{ section.name }} {{ section.start }} - {{ section.desc }}
            </div>
          </v-col>
          <v-col><v-divider clsss="ma-2"/></v-col>
        </v-row>
        <clock />
        <draggable handle=".handle">
          <v-list-item
            v-for="(t, ti) in $store.getters['tasks/bySectionId'](section.id)"
            :key="t.id"
            v-model="selected"
            :disabled="Boolean(t.start)"
            class="pl-0 pr-0"
            active-class="pink--text"
          >
            <v-col cols="1" class="handle px-0 mx-0">
              <div>
                <v-icon color="barely">
                  drag_handle
                </v-icon>
              </div>
            </v-col>
            <v-col cols="1" class="pa-0 ma-0">
              <div class="pa-0 ma-0 subtle--text">
                <span>
                  {{ $store.getters['sections/byId'](t.sectionId).name }}
                </span>
              </div>
            </v-col>
            <v-col cols="7" class="text-left pa-0">
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
                >
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
        </draggable>
      </v-list-item-group>
      <v-list-item />
    </v-list>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import Summary from '~/components/Summary.vue'
import Clock from '~/components/Clock.vue'

export default {
  components: {
    Clock,
    Summary,
    draggable,
  },
  props: {
    section: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selected: [2],
      sections: this.$store.state.sections.sections,
      projects: this.$store.state.projects.projects,
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
  created() {
    this.calcTasks()
  },
  methods: {
    calcTasks() {
      this.$store.dispatch('tasks/updateEstFinishAt')
    },
  },
}
</script>
<style scoped>
.footer {
  -webkit-transform: translateX(95%);
  transform: translateX(95%);
}
</style>
