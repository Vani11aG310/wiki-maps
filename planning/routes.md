### Routes that we will need for our application

## User routes (Completed)

* CREATE:          POST /api/users
* READ:            GET  /api/users
* (Single User)    GET  /api/users/:id
* UPDATE:          POST /api/users/:id
* DELETE:          POST /api/users/:id/delete
* Maps for a User: GET  /api/users/:id/maps

## Map routes (Completed)

* CREATE:           POST /api/maps
* READ:             GET  /api/maps
* (Single Map)      GET  /api/maps/:id
* UPDATE:           POST /api/maps/:id
* DELETE:           POST /api/maps/:id/delete
* Places for a Map  GET  /api/maps/:id/places

## Favourite maps routes Option 1

* CREATE:      POST /api/users/:user_id/favourite_maps
* READ:        GET  /api/users/:user_id/favourite_maps
* (Single Map) GET  /api/users/:user_id/favourite_maps/:map_id
* UPDATE:      POST /api/users/:user_id/favourite_maps/:map_id
* DELETE:      POST /api/users/:user_id/favourite_maps/:map_id/delete (Stretch goal, Out of scope)

## Favourite maps routes Option 2

* CREATE:      POST /api/favourite_maps
* READ:        GET  /api/favourite_maps
* (Single Map) GET  /api/favourite_maps/:map_id
* UPDATE:      POST /api/favourite_maps/:map_id
* DELETE:      POST /api/favourite_maps/:map_id/delete (Stretch goal, Out of scope)

## Marker/places/destination routes

* CREATE:        POST /api/places
* READ:          GET  /api/places
* (Single Place) GET  /api/places/:id
* UPDATE:        POST /api/places/:id
* DELETE:        POST /api/places/:id/delete
