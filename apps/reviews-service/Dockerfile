# Use the official Node.js runtime as a parent image
FROM node:17-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will listen on
EXPOSE 3002

# Start the application
CMD [ "npm", "start" ]