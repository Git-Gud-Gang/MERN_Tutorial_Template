import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

//nodemon server in backend directory to start server

dotenv.config()   //allows one to use environment variables
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000   //set port to 5000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
      poolSize: 50,
      wtimeout: 2500,
      useNewUrlParse: true }
    )
    .catch(err => {
      console.error(err.stack)
      process.exit(1)
    })
    .then(async client => {
      //injectDB for both DA (Data Access Object)
      await RestaurantsDAO.injectDB(client)
      await ReviewsDAO.injectDB(client)

      //listen to app
      app.listen(port, () => {
        console.log(`listening on port ${port}`)
      })
    })
