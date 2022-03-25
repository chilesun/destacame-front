<template>
  <div class="sidebar">
    <ul>
      <li><NuxtLink to="/">Viajes</NuxtLink></li>
      <li><NuxtLink to="/trayectos">Trayectos</NuxtLink></li>
      <li><NuxtLink to="/buses">Buses</NuxtLink></li>
      <li><NuxtLink to="/choferes">Choferes</NuxtLink></li>
      <li><NuxtLink to="/pasajeros">Pasajeros</NuxtLink></li>
    </ul>
  </div>
</template>

<style lang="sass">
.sidebar
  background: $darkBlue
  width: 16%
  height: calc(100vh - 65px)
  transition: all .5s
  padding: 50px 30px
  ul
    height: 100%
    li
      margin-bottom: 30px
      a
        font-size: 18px
        color: white
        text-decoration: none
      .nuxt-link-exact-active
        font-family: 'Montserrat'
  @media screen and (max-width: $lg)
    width: 100%
    padding-top: 8px
    padding-bottom: 8px
    height: auto
    ul
      height: auto
      display: flex
      flex-wrap: wrap
      justify-content: center
      li
        padding: 5px 10px
        margin-bottom: 0
        a
          font-size: 16px
</style>