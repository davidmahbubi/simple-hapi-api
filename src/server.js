const Hapi = require('@hapi/hapi')

const contacts = []

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })
  server.route([
    {
      method: 'GET',
      path: '/contacts',
      handler(request, h) {
        return h.response(contacts).code(200)
      }
    },
    {
      method: 'POST',
      path: '/contacts',
      handler(request, h) {
        contacts.push({
          id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1,
          name: request.payload.name,
          email: request.payload.email,
          phone: request.payload.phone,
        })
        return h.response({
          status: 'success'
        }).code(201)
      }
    },
    {
      method: 'DELETE',
      path: '/contacts/{id}',
      handler(request, h) {
        contacts.forEach((data, i) => {
          if (data.id == request.params.id) {
            contacts.splice(i, 1)
          }
        })
        return h.response({
          status: 'success'
        }).code(200)
      }
    },
  ])
  await server.start()
  console.log(`Server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
})

init()