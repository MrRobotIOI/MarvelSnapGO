'use server'
import {getServerSession} from "next-auth/next";


export  default async function addCard(id: number, card_id:number) {


    const res = await fetch(
        'https://marvelsnapgoapi.azurewebsites.net/user?id='+id+'&cardid='+card_id,
        {
            method: 'PUT',

            headers: {

                'Content-Type': 'application/json',

            },



        }
    );
    console.log(id +" "+card_id);
return res.status;
}