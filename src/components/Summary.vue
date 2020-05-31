<template>
  <v-container class="pa-0 ma-0">
    <v-row
      align="center"
      justify="center"
      class="overline text-center subtle--text"
      no-gutters
    >
      <v-col cols="2">
        <div>
          Total<br /><v-divider class="mx-2" />
          <div
            :class="tasks.every(x => x.end) ? 'success--text' : 'warning--text'"
          >
            {{ tasks.filter(x => x.end).length }}
            / {{ tasks.length }}
          </div>
        </div>
      </v-col>

      <v-col cols="2">
        <div>Est<br /><v-divider class="mx-2" />{{ estimate }}</div>
      </v-col>
      <v-col cols="2">
        <div v-if="tasks.some(x => x.end)">
          done<br /><v-divider class="mx-2" />{{ done }}
        </div>
      </v-col>
      <v-col cols="2">
        <div v-if="tasks.some(x => x.end)">
          Spent<br /><v-divider class="mx-2" />{{ spent }}
        </div>
      </v-col>
      <v-col cols="2">
        <div v-if="tasks.some(x => x.end)">
          Gap<br /><v-divider class="mx-2" />
          <div v-if="0 < estGap" class="error--text">
            {{ min2string(estGap) }}
          </div>
          <div v-else class="success--text">{{ min2string(estGap) }}</div>
        </div>
      </v-col>
      <v-col cols="2">
        <div v-if="tasks.some(x => x.end)">
          Left<br /><v-divider class="mx-2" />{{ left }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    tasks: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  data() {
    return {
      sections: this.$store.state.sections.sections,
    }
  },
  computed: {
    estimate() {
      return min2string(
        this.tasks.reduce(
          (total, task) => (total += parseInt(task.estimate)),
          0,
        ),
      )
    },
    done() {
      return min2string(
        this.tasks
          .filter(x => x.end)
          .reduce((total, task) => (total += parseInt(task.estimate)), 0),
      )
    },
    spent() {
      return min2string(
        this.tasks
          .filter(x => x.end)
          .reduce((total, task) => (total += parseInt(task.result)), 0),
      )
    },
    estGap() {
      return this.tasks
        .filter(task => task.end)
        .reduce(
          (total, task) =>
            (total += parseInt(task.result) - parseInt(task.estimate)),
          0,
        )
    },
    left() {
      return min2string(
        this.tasks
          .filter(task => !task.end)
          .reduce((total, task) => (total += parseInt(task.estimate)), 0),
      )
    },
    margin() {
      return min2string(
        this.tasks
          .filter(task => !task.end)
          .reduce((total, task) => (total += parseInt(task.estimate)), 0),
      )
    },
  },
  methods: {
    min2string(str) {
      return `${pad(Math.floor(str / 60))}:${pad(str % 60)}`
    },
  },
}

const pad = n => n.toString().padStart(2, 0)
const min2string = str => `${pad(Math.floor(str / 60))}:${pad(str % 60)}`
</script>
