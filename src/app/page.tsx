
import Link from "next/link";

import MapPage from "@/app/map";

import {useSession} from "next-auth/react";

async function getCards(){
    const res = await fetch(
        'https://marvelsnapgoapi.azurewebsites.net/*api/WarHammer',

        { cache: 'no-store'}
    );
    const data = await res.json();

    return data;
}

export default async function Page(){
    const cards : any[]= await getCards();

return (
    <div>

        <MapPage cards = {cards}  />
    </div>
);
}

function Card({card}: any) {

}