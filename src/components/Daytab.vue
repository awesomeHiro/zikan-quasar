<template>
  <v-tabs center-active show-arrows>
    <v-tab v-for="d in days" :key="d.date">
      <div class="caption">{{ d.date }}</div>
    </v-tab>
  </v-tabs>
</template>
<script>
export default {
  data: () => ({
    days: [
      {
        date: '27',
      },
      {
        date: '28',
      },
      {
        date: '29',
      },
      {
        date: '30',
      },
      {
        date: '1',
      },
      {
        date: '2',
      },
      {
        date: '3',
      },
    ],
  }),
}
</script>
