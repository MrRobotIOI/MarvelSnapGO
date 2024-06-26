'use client'
import React, {useEffect} from "react";
import {computeDestinationPoint} from 'geolib'
import {Loader} from '@googlemaps/js-api-loader'
import {getSession, useSession} from "next-auth/react";
import addCard from "@/app/api/addCard";
import {Session} from "next-auth";
import Link from "next/link";

let map:google.maps.Map;
var userLocation: { lat: any, lng: any } = { lat: 0, lng: 0 };
let collection: any[] = [];
let usersession : {
    user: {};
};
var allMarkers: any[] = [];
export interface MSCard {
    id: number;
    name: string;
    description: string;
    cardInfoLink: string;
    latitude: number;
    longitude: number;
    image: string[];
}
export interface usersint {
    id: number;
    name: string;
    email: string;

}
function getRandomCard(cards:any[]): MSCard{

    return cards.at(Math.random() * cards.length);
}

function makeCardMarker(card:any, position:any,infoWindow:any){
    let randomPoint = computeDestinationPoint(position, 30+(Math.random() * 70), Math.random() * 360);

    const icons: Record<string, { icon: string }> = {
        parking: {
            icon: "https://static.marvelsnap.pro/cards/"+card.name+"-uncommon.webp",
        },

    };
    const iconImage = document.createElement("img");
    iconImage.width = 100;
    iconImage.src = icons.parking.icon;

    const marker2 = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: {lat: randomPoint.latitude, lng: randomPoint.longitude},
        content: iconImage,


    })
    marker2.setAttribute("cardid", JSON.stringify(card));
    allMarkers.push(marker2);
    marker2.addListener("click", async () => {


        let collectionconv = JSON.parse(localStorage.getItem("collection") || "[]");
        collectionconv.push(marker2.getAttribute("cardid"));
        const session= await getSession();



        if (session && session.user) {

            await addCard(session.user.id, card.id);

        } else {

            console.log("card Added:")

            localStorage.setItem("collection", JSON.stringify(collectionconv));
            console.log(localStorage.getItem("collection"));
        }

        marker2.map = null;


        //add to player card collection
        /*  infoWindow.close();


        infoWindow.setContent(   '<div class="b">'+"something"+'</div>');
        infoWindow.open(marker2.map, marker2);

         */
    });
}

export default function MapPage({cards}: any){
    //localStorage.removeItem("collection");



    const mapRef = React.useRef<HTMLDivElement>(null);
    useEffect(()=>{
        const initMap = async () =>{
           const loader = new Loader({
               apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
               version: 'weekly'
           });

           const {Map, InfoWindow} =await  loader.importLibrary('maps');



           //map options


            window.addEventListener('deviceorientation', handleOrientation);

            const mapOptions: google.maps.MapOptions = {

                zoom: 18,
                mapId: "7734243d93612cb3",
                heading: 320,
                tilt: 47.5,
                rotateControl: true



            }

            //setup map
             map = new Map(mapRef.current as HTMLDivElement,mapOptions);








            const infoWindow = new InfoWindow({
                disableAutoPan: true
            });




            const {Marker} = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

                navigator.geolocation.getCurrentPosition((pos) => {



                    let position = {
                        lat: pos.coords.latitude,
                        lng:  pos.coords.longitude
                    }
                    userLocation = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }

                    map.setCenter(position);

                    var currcard = getRandomCard(cards);

                    makeCardMarker(currcard, position,infoWindow);

                    const marker = new google.maps.marker.AdvancedMarkerElement({
                        map,
                        position: userLocation,
                        zIndex: 999,


                    })

                    setInterval(() =>{
                        updateUserLocation(map, marker);
                    },1000);
                    setInterval(() =>{
                        currcard = getRandomCard(cards);
                        makeCardMarker(currcard, position,infoWindow);
                    },15000);
                    setInterval(() =>{
                        const randomValue = Math.random();
                        if(allMarkers.length>0 && randomValue > 0.3){
                            allMarkers.at(0).setMap(null);
                           allMarkers = allMarkers.slice(1,allMarkers.length);
                           console.log(allMarkers);
                        }
                    },14000);
                },

                    (error)=>{
                    let defaultposition = {
                        lat: 43.081528,
                        lng:  -79.064240
                    }

                    map.setCenter(defaultposition);

                    var tempcard = getRandomCard(cards);
                    makeCardMarker(tempcard, defaultposition,infoWindow);

                    const marker = new google.maps.marker.AdvancedMarkerElement({
                        map,
                        position: defaultposition,


                    })
                    setInterval(() =>{
                        tempcard = getRandomCard(cards);
                        makeCardMarker(tempcard, defaultposition,infoWindow);
                    },15000);
                    setInterval(() =>{
                        const randomValue = Math.random();
                        if(allMarkers.length>0 && randomValue > 0.3){
                            allMarkers.at(0).setMap(null);
                            allMarkers = allMarkers.slice(1,allMarkers.length);
                            console.log(allMarkers);
                        }
                    },14000);

                });










        }


        initMap();
    },[]);


    return (
        <>
            <div className={"float-right clear-both"}>
                <Link href={`/collection`}
                      className={" pb-1  relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white border-transparent focus:border-transparent focus:ring-0"}

                      passHref>
                                  <span
                                      className=" relative px-5 py-2.5 transition-all ease-in duration-1000 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                View Collection
                                  </span>
                </Link>
            </div>
        <div>

<div className={"pt-16 fill-transparent"}>

</div>
            <div style={{height: '800px'}} className={"clear-both"} ref={mapRef}></div>

        </div>
        </>
);
}

function handleOrientation(event: any) {


    let heading = event.alpha;
    if (heading === null) return;

    // Adjust the heading based on the device's orientation
    let mapHeading = 360 - heading;

    map.setHeading(mapHeading);
}
export function updateUserLocation(map: google.maps.Map, marker: google.maps.marker.AdvancedMarkerElement) {

    navigator.geolocation.getCurrentPosition((pos) => {
console.log("Updated position")


       let  position = {
            lat: pos.coords.latitude,
            lng:  pos.coords.longitude
        }
       // map.setCenter(position);
      marker.position = position;
    });
}