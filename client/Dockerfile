FROM node:20.18.1-alpine AS build
WORKDIR /src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "tsconfig.json", "./"]
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine
COPY --from=build /src/app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]