<template>
  <div class='auth'>
    <div v-if="formType == 'signIn'">
      <sign-in />
    </div>
    <div v-if="formType == 'signUp'">
      <sign-up v-bind="{toggleForm}" />
    </div>
    <p class='toggleButton' v-on:click='toggleForm'>{{ formTitle }}</p>
  </div>
</template>

<script>
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'

export default {
  name: 'auth',
  data() {
    return {
      formType: 'signIn',
      formTitle: 'Need an account?'
    }
  },
  components: {
    SignIn,
    SignUp
  },
  methods: {
    toggleForm() {
      if (this.formType === 'signIn') {
        this.formTitle = 'Already have an account?'
        this.formType = 'signUp'
      } else {
        this.formTitle = 'Need an account?'
        this.formType = 'signIn'
      }
    }
  }
}
</script>

<style scoped>
.auth {
  display: flex;
  flex-direction: column;
}
.toggleButton {
  cursor: pointer;
}
.toggleButton:hover {
  opacity: .7;
}
</style>
