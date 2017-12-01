<template>
  <div id="app">
    <header>
      <div class="myheader">
        Header
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body, h1, h2, p{
  margin: 0;
  padding: 0;
  text-align: left;
}
#app {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #777777;
  background-color: #FAFAFA;
}
.container{
  width: 1170px;
  margin: auto;
  padding-top: 30px;
}
h1{
  font-size: 24px;
  color: #23558C;
  font-weight: 400;
  margin-bottom: 15px;
  float: left;
}
.float-right{
  float: right
}
.disableM{
  opacity: 0.2;
  cursor: not-allowed !important;
}
.thin{
  font-weight: 400;
}
.height-auto{
  min-height: auto !important;
}
.title-18{
  font-size: 18px;
  font-weight: 400;
  color: #333333;
  text-align: left;
}
.card{
  width: 1170px;/* BG: */
  background: #FFF;
  border: 1px solid #CCCCCC;
  border-radius: 2px;
  margin: auto;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
}
.separator{
  width: 100%;
  height: 1px;
  background-color: #CCCCCC;
}
header{
  height: 50px;
  background-color: #FFF;
  border-bottom: solid 1px #CCCCCC;
}
header .logo{
  width: 30px;
  height: 30px;
  background-color: red;
  float: left;
  margin-left: 60px;
}
.myheader{
  text-align: center;
  line-height: 50px;
}
header ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
header ul li{
  margin-left: 50px;
}
</style>
