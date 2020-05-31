<template>
  <div>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="auto">
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
      <v-col cols="3">
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
          <div class="text-center caption">
            <v-chip
              v-for="p in projects"
              :key="p.id"
              x-small
              class="pa-1"
              @click="focusPrevInput()"
            >
              {{ p.name }}
            </v-chip>
          </div>
        </v-chip-group>
      </v-col>
    </v-row>
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
