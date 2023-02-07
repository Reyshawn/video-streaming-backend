# Use an official Node.js runtime as the base image
FROM node:19

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json to the image
COPY ./user/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the code to the image
COPY ./user/ .

# Copy the env file
COPY ./.production.env /app/../.production.env

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production

# Expose the port that the app will listen on
EXPOSE 8080

# Start the application
CMD [ "npm", "start" ]