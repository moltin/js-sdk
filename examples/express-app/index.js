const express = require('express')
const MoltinGateway = require('@moltin/sdk').gateway

const app = express()

const Moltin = MoltinGateway({
  client_id:
    process.env.MOLTIN_CLIENT_ID || 'j6hSilXRQfxKohTndUuVrErLcSJWP15P347L6Im0M4'
})

app.get('/', async (req, res) => {
  const { data } = await Moltin.Products.All()

  res.json({
    data
  })
})

app.listen(4000, () => console.log('Listening on localhost:4000'))
