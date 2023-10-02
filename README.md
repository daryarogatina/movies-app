Welcome to the movie storage app! 

To run the server, follow these instructions:

1. Make sure you have `Node.js` and `npm` installed.
2. In the root of the repository, run the command `npm i` to install all the necessary dependencies.
3. Create a file named `.env` in the root of the repository and add your values to the following variables:
NODE_HOST
SECRET_KEY
DB_STORAGE
4. Use command `start:dev` to run the server.
5. Use command  `docker build . -t daryarogatina/movies` to create Docker image.
5. Use command  `docker run --name movies -p 8000:8050 -e APP_PORT=8050 daryarogatina/movies` to run the docker container.

To download the Docker image from DockerHub use this link: https://hub.docker.com/r/daryarogatina/movies. 
