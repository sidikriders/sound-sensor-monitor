// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const alertId = String(req.query.alertId);

  if (req.method === "PUT") {
    const updatedAlert = await prisma.alert.update({
      where: {
        id: alertId,
      },
      data: req.body,
    });

    return res.send(updatedAlert);
  }

  const alert = await prisma.alert.findFirst({
    where: {
      id: alertId,
    },
  });

  res.send(alert);
}
