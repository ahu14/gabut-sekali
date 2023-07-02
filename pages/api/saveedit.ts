import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/lib/db";
import { doc, updateDoc } from "firebase/firestore";


type Data = { msg: any }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
  let body = req.body;

  let docRef = doc(db, "identity", body.id);
  let data = {
      name: body.name,
      age: body.age,
      hobby: body.hobby
  }

  updateDoc(docRef, data)
  .then(() => res.status(200).json({msg: 'edit saved !'}))
  .catch(e => res.status(502).json({msg: e}));
}
