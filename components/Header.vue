<template>
  <header class="header">
    <NuxtLink to="/" class="logo">
      <img src="~/assets/images/front-of-bus.png" alt="">
      <h1>DestacaBus</h1>
    </NuxtLink>
  </header>
</template>

<style lang="sass">
.header
  width: 100%
  padding: 10px 30px
  box-shadow: 0 3px 7px -3px $grey
  position: relative
  z-index: 20
  background-color: white
  height: 65px
  .logo
    display: flex
    align-items: center
    justify-content: center
    text-decoration: none
    transition: all 1s
    h1
      font-size: 45px
      color: $blue
      margin-left: 5px
      transition: all 1s
    img
      margin-right: 5px
      max-width: 40px
  @media screen and (max-width: $lg)
    position: relative
    height: 50px
    .logo
      h1
          font-size: 30px
      img
          max-width: 28px
  @media screen and (max-width: $md)
    padding: 7px 30px
    height: 40px
    .logo 
      h1
        font-size: 26px
      img
        max-width: 22px

</style>