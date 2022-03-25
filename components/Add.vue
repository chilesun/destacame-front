<template>
  <div class="add">
    <img src="~/assets/images/add.png" alt="">
  </div>
</template>

<style lang="sass" scoped>
.add
  position: fixed
  bottom: 50px
  right: 40px
  cursor: pointer
  img
    width: 130px
    transition: .3s all
  &:hover
    img
      -ms-transform: scale(1.2)
      -webkit-transform: scale(1.2)
      transform: scale(1.2)
</style>