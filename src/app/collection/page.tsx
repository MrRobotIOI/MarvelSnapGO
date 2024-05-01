'use client'
import CollectionPage from "@/app/collection/collection";
import {getSession, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import Link from "next/link";


export default function Page() {

   const {data: session} =  useSession();

    const [data, setData] = useState([])
    const [cards, setCards] = useState()

    console.log(session?.user.id)
    useEffect(

        () => {
            if(session?.user.id !== undefined) {
                fetch('https://marvelsnapgoapi.azurewebsites.net/user/collection?id=' + session?.user?.id,
                )
                    .then((res) => res.json())
                    .then((data) => {
                        setData(data);
                     //   console.log(cards);
                        //console.log(data.at(0));
                        //  setLoading(false)
                    })
                    .finally(() => {
                        console.log(data);
                    })



        }}, [session])




    return (
        <>
            <Link href={`/homemap`} passHref>
                View Map
            </Link>
        <div>
            {
                data?.map((cardo) => {

                    return <Card key={0} card={cardo}/>;
                })
            }
        </div>
        </>
    );
}


function Card(card: any) {
console.log(card.card);

    return (


        <img style={{width: "500px"}} src={"https://static.marvelsnap.pro/cards/"+card.card+".webp"}/>


    );
}