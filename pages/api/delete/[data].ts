import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/lib/db";
import { doc, deleteDoc } from "firebase/firestore";


type Data = { msg: any }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
  let url:any = req.url;
  let dataId = url.replace('/api/delete/', '');
  
  let docRef = doc(db, 'identity', dataId);

  deleteDoc(docRef)
  .then(() => res.redirect(308, '/'))
  .catch(e => res.status(502).json({msg: e}))
}
