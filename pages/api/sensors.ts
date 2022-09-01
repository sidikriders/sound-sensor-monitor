// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Sensor } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
// import { prisma } from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Sensor | Sensor[]>
) {
  const prisma = new PrismaClient()
  if (req.method === 'POST') {
    const newSensor = await prisma.sensor.create({ data: req.body })

    res.send(newSensor)
  } else {
    const resp = await prisma?.sensor.findMany()

    res.status(200).send(resp)
  }
}
