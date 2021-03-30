### What is this?

It is node server, which serves api(s) for usage in ITSS project.

### How to start

* Clone this repo.
* Install `docker-compose`
* Run `docker-compose up` in the command-line.
* Visit __localhost:8080__.

### How to write pages?

* Write pages in client/public.
* If needed routing, add to `index.js` your needed route(s). Don't place those files sent this way in `client/public`.
* Interaction with database should go to `pg_database`.

### Bootstrap database

_Note: currently not finished_

* `chmod u+x command.sh`
* `./command.sh`