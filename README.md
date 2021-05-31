### What is this?

It is node server, which serves api(s) for usage in ITSS project.

### How to start

* Clone this repo.
* Install `docker-compose`
* For getting images:
    * On Ubuntu / Mac:
        * `chmod u+x pre_run_command.sh`
        * `./pre_run_command.sh`
    * On Window:
        * run `pre_run_command.sh`
* Run `docker-compose up` in the command-line.
* Visit __localhost__.

### How to write pages?

* Write pages in client/public.
* If needed routing, add to `index.js` your needed route(s). Don't place those files sent this way in `client/public`.
* Interaction with database should go to `pg_database`.

### Bootstrap database

_Note: currently not finished_

On Ubuntu / Mac:

* `chmod u+x post_run_command.sh`
* `./post_run_command.sh`

On Window:

* run `pre_run_command.sh`

### Extending server

* More services by adding to `docker-compose.yml`.
* More routes by editing `index.js`.
* Change database structure and data by changing `command.sh` and `scripts/fill_data`.

### TODO:

