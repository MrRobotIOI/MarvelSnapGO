'use server'
import {getSession} from "next-auth/react";

export async function getCollection(id: number){

    const res = await fetch(
        'https://marvelsnapgoapi.azurewebsites.net/user/collection?id='+id,

        { cache: 'no-store'}
    );
    const data = await res.json();

    return data;
}