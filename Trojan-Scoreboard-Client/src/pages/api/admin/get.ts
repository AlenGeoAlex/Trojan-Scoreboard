// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const newRequest = await fetch(`${process.env.API}result/list/`);
    if(!newRequest.ok){
        res.status(newRequest.status).end();
        return
    }

    const promise = await newRequest.json();

    res.status(200).json(promise);
}
