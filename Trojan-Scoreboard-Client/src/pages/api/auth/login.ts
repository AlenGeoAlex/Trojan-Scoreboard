import type { NextApiRequest, NextApiResponse } from 'next'
import {LoginInput} from "@/model/LoginModel";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    var body = req.body as LoginInput;

    if(!body){
        res.status(401).send("Invalid data");
        return;
    }

    console.log(body)

    const request = await fetch(`${process.env.API}authentication/login/`, {
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'POST'
    })


    var backendRequest = await request.text();
    res.status(request.status).send(backendRequest);

}
