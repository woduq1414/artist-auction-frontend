import { stat } from 'fs';
import { SERVER_URL } from './url';





export default async function fetcher(url: string, init?: any) {



    const res = await fetch(SERVER_URL + url, init);
    return res;



}