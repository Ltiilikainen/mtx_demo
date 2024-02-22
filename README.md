# MTX Demo

Vite Express React/TypeScript + MongoDB
This repository is a demo version of the web app I am currently building for a sound technician's company. It features a news page, references page, about page and contact form that will send its contents to the site admin's desired email address, as well as an admin hub (accessible via the <Logo/> on the navbar) where the user can add, edit and delete news and references as well as manage their uploaded images.

![image](https://github.com/Ltiilikainen/mtx_demo/assets/25671832/edd118d1-e121-433e-a59a-3f25f24f0588)

![image](https://github.com/Ltiilikainen/mtx_demo/assets/25671832/11cf579b-8a2b-4225-84c7-679313673107)

![image](https://github.com/Ltiilikainen/mtx_demo/assets/25671832/f6c91fce-ea79-497a-bd95-ae5560cdfd65)

![image](https://github.com/Ltiilikainen/mtx_demo/assets/25671832/318c3f70-c4bc-498a-81c4-b69dce002619)

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

## API
      POST /contact
      body: formData
         - Global type ContactFormData
      response: "Success"
   ### newsRouter
      GET /news
      optional:
         query: limit (number)
      response:
         array of news items (all or the amount specifiend by query)
      POST /news
      body: newsItem
         - Global type NewsInput
      response:
         Newly-created news item
      GET /news/:id 
      param id: mongoDb uid
      response: news item with specified id
      PUT /news/:id 
      param id: mongoDb uid
      body: updatedInfo
         - {[key: string] : string}
      response:
         updated news item
      DELETE /news/:id 
      param id: mongoDb uid
      response: deleted news item
      
   ### referrersRouter
      GET /referrers
      optional:
         query: limit (number)
      response:
         array of referrers (all or sampled amount specifiend by query)
      POST /referrers
      body: newsItem
         - Global type ReferrerInput
      response:
         Newly-created referrer
      GET /referrers/:id 
      param id: mongoDb uid
      response: referrer with specified id
      PUT /referrers/:id 
      param id: mongoDb uid
      body: updatedInfo
         - {[key: string] : string}
      response:
         updated referrer
      DELETE /referrers/:id 
      param id: mongoDb uid
      response: deleted referrer

   ### uploadsRouter
      GET /uploads
      response:
         array of uploads
      POST /uploads
      query: filetype (currenyly only "image" uploads implemented)
      body: File
      response:
         Newly-created upload
      GET /uploads/:id 
      param id: mongoDb uid
      response: upload with specified id
      PUT /uploads/:id 
      param id: mongoDb uid
      body: updatedInfo
         - {[key: string] : string}
      response:
         updated news item
      DELETE /uploads/:id 
      param id: mongoDb uid
      optional:
         query: cascade (true/false)
         description: Will search through referrers and remove deleted upload's uid references
      response: deleted upload / "OK"
## Considerations
ReactQuill, which is currently in use in the NewsPostForm component, is using a depreciated DOM Mutation Event. The package may need to be swapped to a different text editor in the future if the event type is not updated.

## License
MIT
