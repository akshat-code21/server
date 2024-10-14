# server

[server TRD](https://github.com/Scaler-Innovation-Labs/bhashini-student-contributions/wiki/Server-TRD)

## setup

### Server

- Install the dependencies

  ```sh
  npm i
  ```

- create a `.env` file from `.env.example`

  ```sh
  cp .env.example .env
  ```

### Database

Run migrations on the database

```
npx prisma migrate dev
```

### Seeding data

```
npx prisma db seed
```

## Running the server

- Follow the instructions mentioned in [setup](#setting-up)

- for development server

  ```sh
  npm run dev
  ```

- for running production build

  ```sh
  npm run build && npm start
  ```

- using Docker

  builidng docker image

  ```sh
  docker build -t <image_name> .
  ```

  running docker image

  ```sh
  docker run -e PORT=4000 -p 4000:4000 <image_name>

  Note: PORT is an env variable
  ```

## Running tests

```
npm run test
```

## Linting

```sh
npm run lint
```
