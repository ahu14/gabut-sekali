import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/lib/db";
import { collection, addDoc } from "firebase/firestore";


type Data = { msg: any }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
  let body = req.body;

  addDoc(collection(db, 'identity'), {
    name: body.name,
    age: body.age,
    hobby: body.hobby
  })
  .then(() => res.status(200).json({msg: 'data added !'}))
  .catch(e => res.status(502).json({msg: e}))
}
