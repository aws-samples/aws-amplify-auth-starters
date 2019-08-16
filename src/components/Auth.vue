<template>
  <div class='auth'>
    <div v-if="formType === 'signIn'">
      <sign-in />
    </div>
    <div v-if="formType === 'signUp'">
      <sign-up v-bind="{toggleForm}" />
    </div>
    <div v-if="formType === 'forgotPassword'">
      <forgot-password v-bind="{toggleForm}" />
    </div>
    <p v class='toggleButton' v-on:click="toggleForm(formType === 'signIn' ? 'signUp' : 'signIn')">{{ formTitle }}</p>
    <p v-if="formType == 'signIn'" class='toggleButton' v-on:click="toggleForm('forgotPassword')">Forgot Password?</p>
  </div>
</template>

<script>
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'
import ForgotPassword from './ForgotPassword.vue'

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
    SignUp,
    ForgotPassword
  },
  methods: {
    toggleForm(formType) {
      this.formType = formType
      if (formType === 'signIn') this.formTitle = 'Need an account?'
      if (formType === 'signUp') this.formTitle = 'Already have an account?'
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
