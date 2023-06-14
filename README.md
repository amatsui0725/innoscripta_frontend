# News aggregator Frontend App - React
This project is for frontend app with React for New aggregator app.

## Prerequisites

### Before you start, make sure you have the following tools installed:

-   Docker Engine 22.0.0 or later

-   Docker Compose 2.0.0 or later

-   Npm 9.7.1 or latter

## Getting Started

1. Clone this repository to your local machine:

```
git clone https://github.com/johnfumio/innoscripta_frontend.git
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

## Running without Docker

Before running without Docker kindly make sure that `npm` is installed.

1. Clone this repository to your local machine:

```
git clone https://github.com/johnfumio/innoscripta_frontend.git

cd innoscripta_frontend
```

2. Run the React project by below commands

```
npm install

npm start
```

The React frontend project will be run on `PORT 8080`

# Development work flow
This Application is for the frontend side of news aggregator.
1. Structure
    - Pages

        We have 5 different pages here. - Login, Register, Feed, Home, Setting

        These pages are the elements for showing one page in react app. Storage management and API calls are handled  in this level.
    - Components

        Components are the pure elements that showing the data with props without storage or api calls.
2. Storage

    I used Context API for this application
    Implemented the auth storage management part for storing auth info. - token, user name, user Id, etc

3. UI/UX design

    I used React Bootstrap for styling the component. Used Grid system and flexbox for layouts in several pages.