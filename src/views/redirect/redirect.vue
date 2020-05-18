<script>
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    if(JSON.stringify(query) != "{}"){
      this.$router.replace({ path: '/' + path, query})
    }else if(path){
      this.$router.replace({ path: '/' + path})
    }else{
      console.log(9999)
      this.$router.replace({ path: '/'})
    }
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
