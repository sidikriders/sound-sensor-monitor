// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AlertAction } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AlertAction | AlertAction[]>
) {
  if (req.method === 'POST') {
    const newAlertAction = await prisma.alertAction.create({
      data: req.body
    })

    res.send(newAlertAction)
  } else {
    const AlertActions = await prisma?.alertAction.findMany()
    res.status(200).send(AlertActions)
  }
}
