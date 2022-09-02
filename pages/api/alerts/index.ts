// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from 'moment'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const {
        severity,
        sensorId,
        soundUrl
      } = req.body
      const newAlert = await prisma.alert.create({
        data: {
          severity,
          soundUrl,
          timestamp: moment().utc().toDate(),
          sensor: {
            connect: {
              id: sensorId
            }
          }
        }
      })
  
      res.send(newAlert)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  } else {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const skip = (page - 1) * pageSize

    const totalAlerts = await prisma?.alert.count()
    const alerts = await prisma?.alert.findMany({
      include: {
        sensor: true,
        reason: true,
        action: true
      },
      skip,
      take: pageSize
    })

    res.status(200).send({ items: alerts, total: totalAlerts, page, pageSize })
  }
}
