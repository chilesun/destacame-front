<template>
  <div class="view">
    <Header />
    <Sidebar />
    <Nuxt class="section" />
  </div>
</template>

<script>


export default {

}
</script>


<style lang="sass">
*, *:before, *:after
  box-sizing: border-box

html, body, div, span, object, iframe, figure, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, code, em, img, small, strike, strong, sub, sup, tt, b, u, i, ol, ul, li, fieldset, form, label, table, caption, tbody, tfoot, thead, tr, th, td, main, canvas, embed, footer, header, nav, section, video
  margin: 0
  padding: 0
  border: 0
  font-size: 100%
  font: inherit
  vertical-align: baseline
  text-rendering: optimizeLegibility
  -webkit-font-smoothing: antialiased
  text-size-adjust: none

footer, header, nav, section, main
  display: block

body
  line-height: 1

ol, ul
  list-style: none

blockquote, q
  quotes: none

blockquote:before, blockquote:after, q:before, q:after
  content: ''
  content: none

table
  border-collapse: collapse
  border-spacing: 0

input
  -webkit-appearance: none
  border-radius: 0

p,
li,
a,
span,
div,
td,
tr,
th
  font-family: 'Roboto'
  font-weight: 400
  color: #2c3e50
  font-size: 18px
h1,
h2,
h3,
h4,
h5,
h6
  font-family: 'Montserrat'
  font-weight: 800
p
  color: $grey

.view
  position: relative
  min-height: 100vh
  display: flex
  flex-wrap: wrap
  align-items: flex-start
  .section
    padding-right: 30px
    padding-left: 30px
    padding-top: 30px
    width: 84%
    h2
      width: 100%
      color: $grey
      text-align: center
      font-size: 30px
      margin-bottom: 20px
    .message
      text-align: center
  @media screen and (max-width: $lg)
    height: auto
    flex-direction: column
    .section
      width: 100%

  table
    width: 100%
    tr
      border: 1px solid #bdc3c7
    th
      font-family: 'Montserrat'
      padding: 10px 9px
      color: $blue
      font-size: 18px
      vertical-align: middle
    td
      text-align: center
      font-size: 18px
      padding: 10px 9px
      vertical-align: middle
    .options
      img
        cursor: pointer
        margin-right: 5px
        margin-left: 5px
        max-width: 40px
  form
    h3
      margin-bottom: 15px
    .field
      display: flex
      flex-direction: column
      margin-bottom: 20px
      .label
        font-size: 20px
        margin-bottom: 5px
      .input
        width: 100%
        font-size: 16px
        height: 40px
        padding: 0 5px
        border: 1px solid #bdc3c7
      .help
        margin-top: 3px
        font-size: 12px
    .vs__dropdown-toggle
      border-radius: 0
      height: 40px
    .button
      border: none
      padding: 15px 15px
      text-transform: uppercase
      color: white
      width: 100%
      font-family: 'Montserrat'
      cursor: pointer
    .add
      background-color: #2ecc71
    .remove
      background-color: #e74c3c
</style>