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
# Expose the port on which the application will run
EXPOSE 8000
# Define the command to start the application
CMD [ "npm", "run", "dev" ]