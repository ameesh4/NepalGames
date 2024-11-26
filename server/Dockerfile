FROM golang:1.23-alpine AS build
WORKDIR /app
RUN apk add --no-cache git
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o app .

# deploy
FROM alpine:3.20
WORKDIR /app
COPY --from=build /app/app .
EXPOSE 8080
ENTRYPOINT ["./app"]

