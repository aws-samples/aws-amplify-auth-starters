<template>
  <div>
    <div class='form-container'>
      <h1 class='heading'>Reset Password</h1>
      <div class='form' v-if="formState === 'resetPassword'">
        <input
          class='input'
          placeholder='Username'
          v-model="form.username"
        />
        <div class='button' v-on:click="forgotPassword">
          <p>Send verification code</p>
        </div>
      </div>
      <div class='form' v-if="formState === 'resetPasswordConfirm'">
        <input
          class='input'
          placeholder='Verification Code'
          v-model="form.authCode"
        />
        <input
          class='input'
          type='password'
          placeholder='New Password'
          v-model="form.password"
        />
        <div class='button' v-on:click="forgotPasswordSubmit">
          <p>Set new password</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const form = {
  username: '',
  password: '',
  authCode: ''
}

export default {
  name: 'forgot-password',
  props: ['toggleForm'],
  methods: {
    async forgotPassword() {
      try {
        await this.$Amplify.Auth.forgotPassword(this.form.username)
        this.formState = 'resetPasswordConfirm'
      } catch (err) {
        console.log('error: ', err)
      }
    },
    async forgotPasswordSubmit() {
      try {
        await this.$Amplify.Auth.forgotPasswordSubmit(this.form.username, this.form.authCode, this.form.password)
        this.form = form
        alert('Successfully reset password1')
        this.toggleForm('signIn')
      } catch (err) {
        console.log('error: ', err)
      }
    }
  },
  data() {
  return {
    formState: 'resetPassword',
    form
  }
}
}
</script>

<style scoped>
.heading {
  text-align: left;
  margin: 55px 5px 15px;
}
.form-container {
  width: 262px;;
  margin: 0 auto;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button {
  padding: 13px 35px;
  background-color: #2c3e50;
  cursor: pointer;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
  margin: 25px 0px 20px;
  align-self: flex-start;
}
.button:hover {
  opacity: .9;
}
.button p {
  margin: 0;
  color: white;
  font-weight: 600;
}
</style>
