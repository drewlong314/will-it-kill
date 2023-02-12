import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const client = await clientPromise;
        const db = client.db("will-it-kill");

        if (req.method === 'PATCH') {
            // TODO: Refactor this code to be more DRY
            try {
                if (req.body.response === 'yes') {
                    const updatedItem = await db
                        .collection("video-sets")
                        .findOneAndUpdate({ _id: new ObjectId(req.body._id) }, { $inc: { answer_yes: 1, total_answers: 1 } })
                    if (!updatedItem.value) {
                        console.error(`Invalid Id:${req.body._id} when trying to increase answer fields`)
                        res.status(404).send({})
                    }
                }
                else if (req.body.response === 'no') {
                    const updatedItem = await db
                        .collection("video-sets")
                        .findOneAndUpdate({ _id: new ObjectId(req.body._id) }, { $inc: { answer_no: 1, total_answers: 1 } })
                    if (!updatedItem.value) {
                        console.error(`Invalid Id:${req.body._id} when trying to increase answer fields`)
                        res.status(404).send({})
                    }
                }
                console.log(`Increased answer fields for ${req.body._id}`)
                res.status(200).send({});
            } catch (err) {
                console.error(`Error increasing answer fields for ${req.body._id}: ${err}`)
                res.status(500).send({});
            }
        } else {
            const movies = await db
                .collection("video-sets")
                .findOne({})
            res.json(movies);
        }

    } catch (e) {
        console.error(e);
    }
};
