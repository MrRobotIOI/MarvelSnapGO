
import Link from "next/link";

import MapPage from "@/app/homemap/map";
import {getCards} from "@/app/cards/page";
import {useSession} from "next-auth/react";



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