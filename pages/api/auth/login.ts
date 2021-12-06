import { NextApiRequest, NextApiResponse } from "next"
import Cookies from 'cookies';
import { serverLogin } from "../../../services/auth/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = new Cookies(req, res, {
        secure: false
    })
    const data = await serverLogin(req.body);
    
    if(data.token !== null){
        cookies.set('demo_app', data.token, {
            httpOnly: false,
            secure: false
        })

        res.json(data);
        return res.status(200)
    }
    else {
        res.json('Authentication Failed');
        return res.status(401)
    }
}

export default handler 