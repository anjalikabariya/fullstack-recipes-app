# Use an official Node.js runtime as the base image
FROM node:18.18.0
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install project dependencies
RUN npm install
# Copy the application code into the container
COPY . .
EXPOSE 3000
# Define the command to start the application
CMD [ "npm", "run", "start" ]
