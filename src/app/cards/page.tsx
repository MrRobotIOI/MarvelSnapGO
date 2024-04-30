import Link from "next/link";

async function getCards(){
    const res = await fetch(
        'http://localhost:5289/*api/WarHammer',

        { cache: 'no-store'}
);
    const data = await res.json();

    return data;
}

export default async function CardsPage(){
    const cards : any[]= await getCards();
console.log(cards);

return (
    <div>
        <h1>Cards</h1>

        <div>
            {
                cards?.map((card)=>{

                    return <Card key = {card.id} card={card} />;
                })
            }
        </div>
    </div>
);
}

function Card({card}: any) {
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