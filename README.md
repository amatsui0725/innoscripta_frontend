# Innoscripta Frontend-React

### Before you start, make sure you have the following tools installed:

-   Docker Engine 22.0.0 or later

-   Docker Compose 2.0.0 or later

-   Npm 9.7.1 or latter

## Getting Started

1. Clone this repository to your local machine:

```
git clone https://github.com/amatsui0725/innoscripta_frontend.git
```

2. Go to the project directory:

```
cd innoscripta_frontend
```

3. Build and start the Docker containers:

```
docker-compose build --no-cache

docker-compose up
```

This command will start the following Docker containers:<br>

`frontend`: the React app running on port 8080<br>


## Stopping the Containers

To stop the Docker containers, press `Ctrl+C` in the terminal window where you started the containers. Alternatively, you can run the following command in the project directory:

```
docker-compose down
```
