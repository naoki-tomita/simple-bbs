<template lang="pug">
.container
  router-link(to="/threads")
    h1 Threads
  router-view
</template>

<style lang="scss">
a {
  text-decoration: none;
}

.container {
  position: relative;
  width: 720px;
  margin: auto;
}
</style>
