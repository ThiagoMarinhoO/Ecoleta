import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function points(app: FastifyInstance) {
    app.get('/point', async () => {
        const points = await prisma.point.findMany()
    
        return points
    })
    
    app.get('/point/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(request.params)

        const point = await prisma.point.findUniqueOrThrow({
            where: {
                id
            }
        })
    
        return point
    })

    app.post('/point', async (request, reply) => {
        const bodySchema = z.object({
            name: z.string(),
            email: z.string(),
            whatsapp: z.string(),
            latitude: z.string(),
            longitude: z.string(),
            city: z.string(),
            uf: z.string(),
        })

        const { name, email, whatsapp, longitude, latitude, city, uf } = bodySchema.parse(request.body)

        const point = await prisma.point.create({
            data: {
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf,
            }
        })
    
        return reply.status(201).send({
            point,
        })
    })

    app.delete('/point/:id', async (request, reply) => {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(request.params)

        const point = await prisma.point.delete({
            where: {
                id
            }
        })
    
        return reply.status(201).send()
    })
}