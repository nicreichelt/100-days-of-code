<template>
  <div>
    <h1>Uh Oh!</h1>
    <h3>
      It looks like you are experiencing some network issues, please click the
      back button and try again.
    </h3>
    <router-link :to="{ name: 'event-list' }">Or go back home</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
