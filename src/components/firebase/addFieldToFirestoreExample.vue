<template>
  <div>
    <p>
      hello!
    </p>
    <v-btn @click="setData">set data</v-btn>
    <v-btn @click="getData">get data</v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: 'x7eLuGFO5gGC6VOMoqBU',
    }
  },
  created() {
    console.log(this)
  },
  methods: {
    randomValue() {
      return Math.random()
        .toString(36)
        .substring(7)
    },
    async getData() {
      const userRef = this.$fireStore.collection('users').doc(this.userId)
      try {
        console.log(await userRef.get())
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async setData() {
      const value = this.randomValue()
      console.log(value)
      const userRef = this.$fireStore.collection('users').doc(this.userId)
      try {
        await userRef.set({
          value,
        })
      } catch (e) {
        return Promise.reject(e)
      }
    },
  },
}
</script>
