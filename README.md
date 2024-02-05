# MTX Demo

Vite Express React/TypeScript + MongoDB
This repository is a demo version of the web app I am currently building for a sound technician's company.

## Building and Running

1. Clone the repository
2. From the root folder run `npm install`
3. Get the environment variables from `.env.example` and add them to a `.env` file (replace placeholders with your desired MongoDB credentials)

### Running locally with MongoDB Atlas

1. Replace the env variable `MONGODB_URL` with your MongoDB Atlas url
2. To get the example data, create the collections "Uploads", "News" and "Referrers" to your database and paste the contents of the seed JSON files from `./db/seed`
3. From the root folder, run `npm run dev`. The app will run in port `:3001`

### Running with docker compose

1. Run `docker-compose --profile seed build`
2. Run `docker-compose --profile seed up`
3. Your app will be running in port `:3001`, and your MongoDB database in port `:27017`
4. For subsequent runs where seeding the database is not needed, run `docker-compose --profile run up`
   \*On Windows OS, there may be a need to change the line endings on mongo-init.sh and mongo-seed.sh from CRLF to LF
