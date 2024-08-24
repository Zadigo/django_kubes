FROM node:lts-alpine AS build-stage

# RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

# CMD [ "http-server", "dist" ]

# FROM nginx:stable-alpine as production-stage

# COPY - from=build-stage /app/dist /usr/share/nginx/html/

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
