export default function ({ $http, redirect }) {
  $http.onError((err) => {
    if (err.statusCode === 400) {
      console.log((err))
    }
    if (err.statusCode === 401) {
      console.log((err))
    }
    if (err.statusCode === 500) {
      console.log((err))
    }
  })
}