<template>
  <div>
    <div class='header'>
      <img class='header-img' src="../assets/headerimg.png" />
      <router-link to="/home" class='heading'>AWS Amplify Vue Auth Starter</router-link>
      <div class="header-menu">
        <router-link to="/home" class='link'>Home</router-link>
        <p class='link' v-on:click="signOut" v-if="isAuthenticated">Sign Out</p>
        <router-link class='link' to="/" v-if="!isAuthenticated">Sign In</router-link>
        <router-link class='link' to="/profile" v-if="isAuthenticated">Profile</router-link>
        <router-link class='link' to="/protected">Protected Route</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  async beforeCreate() {
    try {
      const user = await this.$Amplify.Auth.currentAuthenticatedUser()
      this.$store.dispatch('setIsAuthenticated', true)
      this.$store.dispatch('setUser', user)
      this.$router.push('profile')
    } catch (err) {
      console.log('error: ', err)
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    },
  },
  methods: {
    async signOut() {
      try {
        await this.$Amplify.Auth.signOut()
        this.$store.dispatch('setIsAuthenticated', false)
        this.$store.dispatch('setUser', {})
        this.$router.push('/')
      } catch (err) {
        console.log('error signing out.')
      }
    }
  },
  name: 'app',
}
</script>

<style scoped>
.header-menu {
  flex: 1;
  padding-right: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.link {
  text-align: right;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  margin: 0px 0px 0px 30px;
  color: #202124;
  text-decoration: none;
}
.header {
  display: flex;
  background-color: white;;
  padding: 20px;
  box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15);
  align-items: center;
}
.heading {
  color: #606368;
  text-align: left;
  margin: 4px;
  font-size: 20px;
  font-weight: 400;
  text-decoration: none;
}
.header-img {
  height: 42px;
}
</style>
