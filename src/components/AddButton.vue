<template>
  <div>
    <v-bottom-sheet v-model="sheet" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="pink" small right v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card class="mx-auto">
        <v-divider />
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="6" class=" text-center">
            <v-text-field
              ref="taskname"
              v-model="taskname"
              autofocus
              hide-details
              solo
              flat
              dense
              type="text"
              maxlength="40"
              placeholder="Name ?"
              :rules="nameRules"
              @focus="focused('taskname')"
              @keydown.enter="$refs.estimate.focus()"
            ></v-text-field>
          </v-col>
          <v-col cols="4" class=" text-center">
            <v-text-field
              ref="estimate"
              v-model="estimate"
              solo
              hide-details
              flat
              dense
              type="tel"
              maxlength="3"
              placeholder="Estimate ?"
              :rules="timeRules"
              @focus="focused('estimate')"
              @keydown.enter="addTask()"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="pa-0 ma-0" align="center" justify="center">
          <v-col cols="auto" class="pa-0 ma-0 text-center">
            <v-chip-group
              v-model="projectSelect"
              active-class="primary white--text"
              column
            >
              <div class="text-center">
                <v-chip
                  v-for="p in projects"
                  :key="p.id"
                  small
                  class="pa-2"
                  @click="focusPrevInput()"
                >
                  {{ p.name }}
                </v-chip>
              </div>
            </v-chip-group>
          </v-col>
        </v-row>

        <v-row
          v-if="!sectioned"
          class="pa-0 ma-0"
          align="center"
          justify="center"
          no-gutters
        >
          <v-col cols="auto" class="pa-0 ma-0 text-center">
            <v-chip-group
              v-model="sectionSelect"
              active-class="primary white--text"
              class="text-center"
              column
            >
              <v-chip
                v-for="s in sections"
                :key="s.id"
                small
                class="pa-2"
                @click="focusPrevInput()"
              >
                {{ s.name }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>
<script>
import { genSortToken } from '~/plugins/genSortToken'
export default {
  props: {
    section: {
      type: Object,
      default: () => {},
    },
    sectioned: {
      type: Boolean,
      default: false,
    },
    calcTasks: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      showProjects: false,
      taskname: '',
      focusedRef: 'taskname',
      nameRules: [value => !!value],
      sheet: false,
      sections: this.$store.state.sections.sections,
      sectionSelect: 0,
      projects: this.$store.state.projects.projects,
      projectSelect: 0,
      estimate: '',
      timeRules: [value => value > 0 && value < 999],
    }
  },
  created() {
    this.sectionSelect = this.sections.findIndex(x => x === this.section)
  },
  methods: {
    focused(ref) {
      this.focusedRef = ref
      this.showProjects = true
    },
    focusPrevInput() {
      if (this.focusedRef === 'estimate') {
        this.$refs.estimate.focus()
      } else {
        this.$refs.taskname.focus()
      }
    },
    addTask() {
      const payload = {
        sortToken: genSortToken({
          prev:
            this.$store.getters['tasks/bySectionId'](this.section.id).pop()
              .sortToken || '',
          next: '',
        }),
        name: this.taskname,
        estimate: this.estimate,
        projectId: this.projects[this.projectSelect].id,
        sectionId: this.sections[this.sectionSelect].id,
      }
      this.$store.dispatch('tasks/add', payload)
      this.sheet = false
      this.calcTasks()
    },
  },
}
</script>
