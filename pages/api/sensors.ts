// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, Sensor } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Sensor | Sensor[]>
) {
  if (req.method === 'POST') {
    const { code, machineId } = req.body
    const newSensor = await prisma.sensor.create({ data: {
      code,
      machine: {
        connect: {
          id: machineId
        }
      }
    } })

    res.send(newSensor)
  } else {
    const resp = await prisma.sensor.findMany({
      include: {
        machine: true
      }
    })

    res.status(200).send(resp)
  }
}
