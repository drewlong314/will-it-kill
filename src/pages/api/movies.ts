import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("sample_mflix");

       const movies = await db
           .collection("comments")
           .find({})
           .limit(10)
           .toArray();

       res.json(movies);
   } catch (e) {
       console.error(e);
   }
};
