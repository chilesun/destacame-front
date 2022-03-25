export default function ({ $http, redirect }) {
  $http.onRequest(config => {
    console.log('Making request to ' + config.url)
  })
}