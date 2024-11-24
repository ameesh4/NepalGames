FROM node:20.18.2-alpine
WORKDIR /src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
