'use server'
import {getSession} from "next-auth/react";

export async function getCollection(id: number){

    const res = await fetch(
        'http://localhost:5289/user/collection?id='+id,

        { cache: 'no-store'}
    );
    const data = await res.json();

    return data;
}