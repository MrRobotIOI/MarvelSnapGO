'use client'
import Link from "next/link";
import {getSession} from "next-auth/react";
import {getCollection} from "@/app/api/getCollection";
import {useEffect} from "react";



export default function CollectionPage({cards}: any) {



    return (
        <div>
            <h1>Collection</h1>

            <div>

            </div>
        </div>
    );
}

function CollectionCard({card}: any) {
    const {id, name, description, cardinfolink,image} = card ||{};

    return(

        <Link href={`/cards/${id}`} passHref>
            <img src={"https://static.marvelsnap.pro/cards/Mockingbird_"+image[0]+".webp"} alt={name}/>
            <div>
                <h2>{name}</h2>
                <h5>{description}</h5>
                <h4>{process.env.customKey}</h4>
            </div>
        </Link>
    );
}