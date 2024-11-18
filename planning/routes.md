### Routes that we will need for our application

## User routes

* CREATE:       ~~POST /api/users~~ (Completed)
* READ:         ~~GET  /api/users~~ (Completed)
* (Single User) ~~GET  /api/users/:id~~ (Completed)
* UPDATE:       ~~POST /api/users/:id~~ (Completed)
* DELETE:       ~~POST /api/users/:id/delete~~ (Completed)

## Map routes

* CREATE:      ~~POST /api/maps~~ (Completed)
* READ:        ~~GET  /api/maps~~ (Completed)
* (Single Map) ~~GET  /api/maps/:id~~ (Completed)
* UPDATE:      ~~POST /api/maps/:id~~ (Completed)
* DELETE:      ~~POST /api/maps/:id/delete~~ (Completed)

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
