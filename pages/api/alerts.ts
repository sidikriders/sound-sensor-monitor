// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Alert, Sensor } from '@prisma/client'
import moment from 'moment'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

type AlertWithSensor = Alert & { sensor: Sensor }

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
    // const alerts = await prisma?.alert.findMany({
    //   include: {
    //     sensor: true
    //   }
    // })
    // res.status(200).send(alerts)
    res.status(200).send('alerts')
  }
}
