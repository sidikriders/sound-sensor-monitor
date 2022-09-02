// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const machineId = String(req.query.machineId);
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const skip = (page - 1) * pageSize;

  // should also put machineId in alert schema
  const sensors = await prisma.sensor.findMany({
    where: {
      machineId,
    },
    select: {
      id: true,
    },
  });

  const totalAlerts = await prisma?.alert.count({
    where: {
      sensorId: {
        in: sensors.map((sen) => sen.id),
      },
    },
  });
  const totalNewAlerts = await prisma?.alert.count({
    where: {
      sensorId: {
        in: sensors.map((sen) => sen.id),
      },
      viewed: false,
    },
  });
  const alerts = await prisma?.alert.findMany({
    where: {
      sensorId: {
        in: sensors.map((sen) => sen.id),
      },
    },
    include: {
      sensor: true,
      reason: true,
      action: true,
    },
    skip,
    take: pageSize,
  });

  res.status(200).send({
    items: alerts,
    total: totalAlerts,
    page,
    pageSize,
    new: totalNewAlerts,
  });
}
