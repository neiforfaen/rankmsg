# rankmsg

A lightweight RESTful API I created for friends that stream - used for retrieving player game data and formatting messages 
to be used in popular twitch bots, including rank and match history. Built using TypeScript + Hono.

Currently deployed at [api.kaiden.sh/rankmsg](https://api.kaiden.sh/rankmsg)

**Note:** I'm using the unofficial valorant API from [@Henrik-3](https://github.com/Henrik-3) for valorant player data,
you can find the repo [here](https://github.com/Henrik-3/unofficial-valorant-api).

## Features

- Player rank, including current MMR and peak rank
- Player match history, shown as total wins/losses and +/- RR
- Written in TypeScript for better type safety and maintainability
- Lightweight and easy to deploy
- Root endpoint for documenting all endpoints

## Endpoints

`GET /`

Returns a list of all available endpoints.

Response: 
```json
{
  "endpoints": {
    "...": "all available endpoints",
  }
}
```

`GET /health`

Returns the current status of the service.

Response: 
```json
{
  "status": "ok"
}
```

`GET /rank/v1/:region/:name/:tag`

Returns the current rank of a player, including current MMR and peak rank formatted as a message.

Response:
```json
{
  "message": "Immortal 3 [424RR] | Peak: Radiant @ e7a3",
}
```

`GET /record/v1/daily/:region/:name/:tag`

Returns the daily record of a player, including total wins/losses and +/- RR formatted as a message.

Response:
```json
{
  "message": "3W / 1L | +28RR",
}
```

## Sample Nightbot Command

You can use the following command in Nightbot to fetch the rank of a player:
```js
$(eval response=`$(urlfetch json https://api.kaiden.sh/rankmsg/valorant/rank/v1/eu/durstlöscher/apfel)`;
try{msg=JSON.parse(response).message; msg  == null ? "Error fetching rank." : msg;}
catch(e){`${e}: ${response}`.substr(0, 400)})
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.