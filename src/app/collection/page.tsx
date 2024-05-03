'use client'
import CollectionPage from "@/app/collection/collection";
import {getSession, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import Link from "next/link";


export default function Page() {

    const {data: session} = useSession();

    const [data, setData] = useState([])
    const [cards, setCards] = useState()
    const [tempdata, setTempData] = useState(typeof window !== "undefined"
            ? (JSON.parse(localStorage.getItem("collection") || "[]") as Array<any>)
            : []
    );
    console.log(session?.user.id)
    useEffect(
        () => {
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
                <Link href={`/`}
                      className={" relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"}
                      passHref>
                                     <span
                                         className=" relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    View Map
                                     </span>
                </Link>
                <div className={"pt-4"}>

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