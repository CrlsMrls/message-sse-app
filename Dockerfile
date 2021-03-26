
#################################################################
#############  first step - build dist folder
#################################################################

# Use the official lightweight Node.js 15 image.
# https://hub.docker.com/_/node
FROM node:15.12-slim as development

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json
COPY package*.json ./

# Having a package-lock.json, 'npm ci' will speed up the installation 
RUN npm ci --only=development

# Copy src folder and other assets to the container image
COPY . .

## Build application and create dist folder
RUN npm run build

#################################################################
#############  second step - build productive image
#################################################################

FROM node:15.12-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG PORT=80
ENV PORT=${PORT}
EXPOSE 80

WORKDIR /usr/src/app

COPY package*.json ./

# install only packages defined in package.json "dependencies"
RUN npm ci --only=production && npm cache clean --force

## copy installed dependencies
COPY . .

## copy built folder from previous step
COPY --from=development /usr/src/app/dist .

# change to non-root user
# USER node

# Run the web service on container startup.
CMD ["node", "main.js"]