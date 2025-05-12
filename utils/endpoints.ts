const resolveEndpoints = () => ({
  '/': {
    GET: {
      description: 'Get the root endpoint',
      response: {
        status: 200,
        body: {
          message: 'All available endpoints.',
        },
      },
    },
  },
  '/health': {
    GET: {
      description: 'Get the health status of the API',
      response: {
        status: 200,
        body: {
          status: 'ok',
        },
      },
    },
  },
  '/valorant/v1/:region/:name/:tag': {
    GET: {
      description:
        'Get the current valorant rank of a player, including current MMR and peak rank.',
      response: {
        status: 200,
        body: {
          message: 'Immortal 3 [424RR] | Peak: Radiant @ e7a3',
        },
      },
    },
  },
  '/valorant/v1/:region/:name/:tag/daily': {
    GET: {
      description:
        'Get the daily MMR change of a player, including wins and losses.',
      response: {
        status: 200,
        body: {
          message: '5W / 2L | +38RR',
        },
      },
    },
  },
})

export default resolveEndpoints
