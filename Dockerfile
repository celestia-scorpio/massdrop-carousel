# Use an official Python runtime as a parent image
FROM node:10

# Set the working directory to /app
WORKDIR /app

# Copy the server directory contents into the container at /app
COPY . /app

# Install any needed packages specified in 
RUN npm i

# Make port 80 available to the world outside this container
EXPOSE 3007

# Set proxy server, replace host:port with values for your servers
#ENV http_proxy host:port
#ENV https_proxy host:port

# Define environment variable
#ENV NAME World

# Run when container launches
CMD ["node", "server/server.js"]