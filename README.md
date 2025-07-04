# Brighte-GraphQL
Dockerized implementation of Brighte Eats done with GraphQL, Express and React.

## Running This Project Locally

1. Make sure to [install Docker Compose or Docker Desktop in your local machine](https://docs.docker.com/compose/install/) 
2. Clone or fork this repository. 
3. Run 
```
docker compose build && docker compose up -d 
```
to build the images and run the services in a detached mode.

4. Make sure all containers are running. Run 
```
docker ps
``` 
to list running containers. 

5. The web app is at [http://localhost](http://localhost)
  
7. The GraphQL end points are at [http://localhost:8080/graphql](http://localhost:8080/graphql)

8. To execute unit test, you will need to login to brighte-graphql_express running container.  Using the command line, execute:
View running containers
```
docker ps | head
```
Take note of the container id of brighte-graphql_express and then enter the command: 
```
docker exec -it <container-id> sh
```

From here you can now execute: 
```
npm run test
```

9. Run 
```
docker compose down --remove-orphans
```
to stop the Docker containers or open your Docker Desktop application and stop the running containers from there. 

