// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
  obj?: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const requestMethod = req.method
  console.log(req.body)
  if (requestMethod === "POST") {
    console.log("Posted")
    res.status(200).json({ name: `Your post my dude: ${req.body.name}`, obj: req.body})
  }
  res.status(200).json({ name: 'John Doe' })
}
