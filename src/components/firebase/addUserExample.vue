<template>
  <div>
    <p>
      hello!
    </p>
    <v-btn @click="createUser">add new user to firestore</v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tasks: this.$store.state.tasks.today,
    }
  },

  created() {
    console.log(this)
    console.log(this.$fireAuth)
  },
  methods: {
    async createUser() {
      const pass = Math.random()
        .toString(36)
        .substring(7)
      const email = pass + '@awsmtask.com'
      console.log(email)
      try {
        await this.$fireAuth.createUserWithEmailAndPassword(email, pass)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
