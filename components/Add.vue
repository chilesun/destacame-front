<template>
  <div class="add">
    <img src="~/assets/images/add.png" alt="">
  </div>
</template>

<style lang="sass" scoped>
.add
  position: fixed
  top: 93px
  right: 40px
  cursor: pointer
  background-color: white
  border-radius: 30%
  img
    width: 90px
    transition: .3s all
  &:hover
    img
      -ms-transform: scale(1.2)
      -webkit-transform: scale(1.2)
      transform: scale(1.2)
  @media screen and (max-width: $lg)
    top: initial
    bottom: 40px
    img
      width: 70px
  @media screen and (max-width: $md)
    img
      width: 60px
</style>