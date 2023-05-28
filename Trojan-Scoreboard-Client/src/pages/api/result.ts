// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if(!req.headers.authorization){
        res.status(401).end();
        return;
    }

    const authorizationCode = req.headers.authorization;

    const proxyReq = await fetch(`${process.env.API}result/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationCode,
        },
        body: JSON.stringify(req.body)
    })

    res.status(200).end();
}
