// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const utc = moment().utc().format("YYYY-MM-DD HH:mm");
  const m = moment().format("YYYY-MM-DD HH:mm");

  const utcDate = moment().utc().toDate();
  const mDate = moment().toDate();
  res.status(200).send({ utc, m, utcDate, mDate });
}
