import fastify from "fastify";
import cors from "@fastify/cors"
import { points } from "./routes/points";

const app = fastify()

app.register(cors, {
    origin: true,
})
app.register(points)

app.listen({
    port: 3333,
    host: '0.0.0.0',
}).then(() => {
    console.log('Server Running on http://localhost:3333 ⚽')
})