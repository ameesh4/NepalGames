FROM golang:1.23-alpine AS build
WORKDIR /app
RUN apk add --no-cache git
RUN go mod download
COPY go.mod go.sum ./
COPY . .
RUN go build -o app .

# deploy
FROM alpine:3.20
WORKDIR /app
COPY --from=build /app/app .
EXPOSE 8000
ENTRYPOINT ["./app"]

