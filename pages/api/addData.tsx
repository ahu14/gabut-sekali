import type {NextApiRequest, NextApiResponse} from 'next';
import {db} from "@/lib/db";
import {collection, addDoc, serverTimestamp} from "firebase/firestore";


type Data = {msg: any}


export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>){
    if (req.method == "POST"){
        let body = req.body;

        addDoc(collection(db, 'history'), {
            player1: body.player1,
            player2: body.player2,
            status: body.status,
            chess: body.chess,
            date: serverTimestamp() 
        })
        .then(() => res.status(200).json({msg: 'data addded !'}))
        .catch((e) => res.status(502).json({msg: e}))
    }
}