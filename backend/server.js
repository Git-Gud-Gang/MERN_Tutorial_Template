import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.routes.js"

//nodemon server in backend directory to start server

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app