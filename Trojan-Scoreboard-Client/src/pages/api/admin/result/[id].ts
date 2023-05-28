// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {id} = req.query;

    if(!req.headers.authorization){
        res.status(401).end();
        return;
    }

    if(!id){
        res.status(400).end();
        return;
    }

    const authorizationCode = req.headers.authorization;
    const proxyReq = await fetch(`${process.env.API}result/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationCode,
        },
        body: JSON.stringify(req.body)
    })

    proxyReq.text().then((val) => {
        console.log(val)
        console.log(proxyReq.status);
    })

    res.status(200).end();
}
