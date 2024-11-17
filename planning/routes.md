### Routes that we will need for our application

## Map routes

* CREATE:       POST /maps 
* READ:         GET  /maps
  (Single Map)  GET  /maps/:id
* UPDATE:       POST /maps/:id
* DELETE:       POST /maps/:id/delete (Stretch goal, Out of scope)

## User routes

* CREATE:   POST /users
* READ:     GET  /users/:id
* UPDATE:   POST /users/:id
* DELETE:   POST /users/:id/delete (Stretch goal, Out of scope)

## Favourite maps routes Option 1

* CREATE:   POST /users/:user_id/favourite_maps
* READ:     GET  /users/:user_id/favourite_maps
(Single map)GET  /users/:user_id/favourite_maps/:map_id
* UPDATE:   POST /users/:user_id/favourite_maps/:map_id
* DELETE:   POST /users/:user_id/favourite_maps/:map_id/delete (Stretch goal, Out of scope)

## Favourite maps routes Option 2

* CREATE:   POST /favourite_maps
* READ:     GET  /favourite_maps
(Single map)GET  /favourite_maps/:map_id
* UPDATE:   POST /favourite_maps/:map_id
* DELETE:   POST /favourite_maps/:map_id/delete (Stretch goal, Out of scope)

## Marker/places/destination routes

* CREATE: POST /places
* READ:   GET  /places
          GET  /places/:id
* UPDATE: POST /places/:id
* DELETE: POST /places/:id/delete

## Comments routes (Stretch)

* CREATE: POST /comments
* READ:   GET  /comments
          GET  /comments/:id
* UPDATE: POST /comments/:id
* DELETE: POST /comments/:id/delete