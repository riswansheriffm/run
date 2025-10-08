# Stage 1: Build React app
FROM node:20-alpine AS build

# 1️⃣ Accept API URL from pipeline
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 2️⃣ React build will embed the API URL
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# 3️⃣ Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

