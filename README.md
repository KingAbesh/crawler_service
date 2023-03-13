# api-main
Repository for main API that powers all products

#### Dependencies

- `docker`

#### How to run locally
- Clone this and switch to `dev` branch
- On your local terminal, run `docker-compose up`. This will set up all the containers and download the images if you don't have them already. This might take a few minutes.


#### Documentation
- 

#### Running Tests
- Keep your `docker containers` running and open a second terminal
- On terminal run `docker exec -ti zazuu-crawler-api_web_1 /bin/sh` (replace `zazuu-crawler-api_web_1` with your container name, user `docker ps` to see container names )
- Inside container run `npm test`
