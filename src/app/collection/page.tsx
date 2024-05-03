'use client'
import CollectionPage from "@/app/collection/collection";
import {getSession, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import Link from "next/link";


export default function Page() {

    const {data: session} = useSession();

    const [data, setData] = useState([])
    const [cards, setCards] = useState()
    const [tempdata, setTempData] = useState([])
    console.log(session?.user.id)
    useEffect(
        () => {
            setTempData(JSON.parse(localStorage.getItem("collection")||"[]"));
            if (session?.user.id !== undefined) {
                fetch('https://marvelsnapgoapi.azurewebsites.net/user/collection?id=' + session?.user?.id,

                )
                    .then((res) => res.json())
                    .then((data) => {
                        setData(data);

                    })
                    .finally(() => {
                        console.log(data);
                    })


            }

        }, [session, tempdata])


    if (data.length < 1) {

        return (
            <>

                <Link href={`/`} passHref>
                    View Temp Map
                </Link>
                <div>

                    {
                        tempdata?.map((cardo) => {
console.log(JSON.parse(cardo as Object as string).name);
                            return <Card key={0} card={JSON.parse(cardo as Object as string).name}/>;
                        })
                    }
                </div>
            </>
        );
    } else {
        return (
            <>
                <Link href={`/`} passHref>
                    View Map
                </Link>
                <div>
                    {}
                    {
                        data?.map((cardo) => {

                            return <Card key={0} card={cardo}/>;
                        })
                    }
                </div>
            </>
        );
    }
}




function Card(card: any) {
    console.log(card.card);

    return (
        <Link href={`https://marvelsnap.pro/cards/${card.card.toLowerCase()}`} passHref>
        <img style={{width: "500px"}} src={"https://static.marvelsnap.pro/cards/" + card.card + "-uncommon.webp"}/>
        </Link>

    );
}