var query = `{totalPhotos, totalUsers}`
var url = 'http://localhost:4000/graphql'

var opts = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
}

fetch(url, opts)
  .then(res => res.json())
  .then(console.log)
  .catch(console.error)
