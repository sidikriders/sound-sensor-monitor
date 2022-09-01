// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AlertReason } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AlertReason | AlertReason[]>
) {
  if (req.method === 'POST') {
    const newAlertReason = await prisma.alertReason.create({
      data: req.body
    })

    res.send(newAlertReason)
  } else {
    const alertReasons = await prisma?.alertReason.findMany()
    res.status(200).send(alertReasons)
  }
}
