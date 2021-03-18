# Use the official lightweight Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:14-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json
COPY package*.json ./

# Install production dependencies.
# Having a package-lock.json, 'npm ci' will speed up the installation and build.
RUN npm ci --only=production

# Copy dist folder to the container image.
COPY ./dist ./

# Run the web service on container startup.
CMD [ "node", "main.js" ]

# change user to non-root user
USER node