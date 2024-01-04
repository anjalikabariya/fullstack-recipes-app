## Instructions to run project in Docker

1. Make sure you have Docker installed and running
2. From root folder run following command: `docker-compose build`
3. After build is complete, run: `docker-compose up`
4. Navigate to `http://localhost:3000` to see application running


## Instructions to test

* Run the following command from root folder to install Client dependencies: `cd client && npm install`
* After dependencies are installed: `cd client && npm run test`

* Run the following command from root folder to install Server dependencies: `cd server && npm install`
* After dependencies are installed: `cd server && npm run test`

* `GET` service api response can be tested on port `http://localhost:8000/recipes` via browser or Postman
* `PATCH` service api response can be tested on port `http://localhost:8000/recipe/:recipeId` via Postman or any other API development application. 
* Pass appropriate `id` and `body` to mutate recipe along with `PATCH` request.
* Updated recipe can be found in `server/products.json`

## Instructions to run project locally without Docker

1. Install `client` and `server` dependencies as mentioned in above steps
2. Navigate to server folder and start server: `cd server && npm run dev`
3. In another terminal navigate to client folder: `cd client && npm start`