
FROM node:19

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .
EXPOSE 8050
CMD [ "node", "server.js" ]