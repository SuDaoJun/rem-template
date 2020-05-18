<template>
  <div id="app" class='body-index'>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted(){

  },
  methods: {

  }
}
</script>

<style lang="scss">
body{
  font-family: "Source Han Sans CN","webfont","sans-serif";
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-text-fill-color: #515a6e !important;
  box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent;
  background-image: none;
  color: #515a6e !important;
  transition: background-color 500000s ease-in-out 0s;
}
::-webkit-scrollbar {
  display: none;
}
</style>
