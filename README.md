# APIs and Coffee! ☕
application program interface ? (i could be wrong)

An API doesn't have to be with a server.

an exposed subset of code (methods and functions) that you the consumer can use.


**an endpoint** is the point at which you interact with the library or server

URL: https://example.com/api/users


## RPC
remote procedure call

This is basically a function that will execute on the remote server.

## REST API
"RESTful"

"Resource" based. (i.e. users). Has multiple things you can do to those resources (CRUD. create, retrieve, update, delete). Typically follows (POST, GET, PUT, DELETE http methods).

/api/users
/api/events
/api/cars

## GRAPHQL
a structure for an api that has all queries going to one endpoint.

https://example.com/graphql

returns different information, depending on the json data you send it.

## Security

* you want your api to work over https instead of http.
* is the user requesting stuff from you API _authenticated_(are they who they say they are).
* is the user _authorized_ are they allowed to do what they want to do.
* other concerns:rate limiting (too many requests), (remote code execution, careful of user submitted data)


SSH vs HTTP(S)


## Promises

they either `resolve` (success) or `reject` (failure). .then(...stuff) will execute
after the promise has resolved. .catch() will execute if the promise rejects.

