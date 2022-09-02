// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Machine } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<undefined | Machine | Machine[]>
) {
  if (req.method === 'POST') {
    const newMachine = await prisma?.machine?.create({ data: req.body })

    res.send(newMachine)
  } else {
    const resp = await prisma?.machine?.findMany()

    res.status(200).send(resp)
  }
}
