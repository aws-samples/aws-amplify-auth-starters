<template>
  <div>
    <div class='form-container'>
      <h1 class='heading'>Sign Up</h1>
      <div class='form' v-if="phase === Number(0)">
        <input
          class='input'
          v-model="form.username"
          placeholder='Username'
        />
        <input
          class='input'
          v-model="form.password"
          placeholder='Password'
          type='password'
        />
        <input
          class='input'
          v-model="form.attributes.email"
          placeholder='Email'
        />
        <input
          class='input'
          v-model="form.attributes.phone_number"
          placeholder='Phone'
        />
        <div class='button' v-on:click="signUp">
          <p>Sign Up</p>
        </div>
      </div>

      <div class='form' v-if="phase === Number(1)">
        <input
          class='input'
          v-model="authCode"
          placeholder='Authentication code'
        />
        <div class='button' v-on:click="confirmSignUp">
          <p>Confirm Sign Up</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['toggleForm'],
  name: 'sign-up',
  methods: {
    async signUp() {
      try {
        await this.$Amplify.Auth.signUp(this.form)
        this.phase = 1
        console.log('user successfully signed up!')
      } catch (err) {
        console.log('error signing up...', err)
      }
    },
    async confirmSignUp() {
      try {
        await this.$Amplify.Auth.confirmSignUp(this.form.username, this.authCode)
        this.toggleForm()
        console.log('user successfully signed up!')
      } catch (err) {
        console.log('error signing up...', err)
      }
    }
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        attributes: {
          email: '',
          phone_number: '',
        }
      },
      authCode: '',
      phase: 0
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
