export default async  function CardPage({params} : any){
    const card = await getCard(params.id);
    return (
        <div>
            <h1>
                {card.name}
            </h1>
            <h1>
                {card.description}
            </h1>
            <img src={"https://static.marvelsnap.pro/cards/Mockingbird_"+card.image[0]+".webp"} alt=""/>
            <img src={"https://static.marvelsnap.pro/cards/Mockingbird_"+card.image[1]+".webp"} alt=""/>
            <div>
                <img src={card.image[1]} alt=""/>
            </div>

        </div>
    )
}

export  async function getCard(cardId: string) {
    const res = await fetch(`http://localhost:5289/*api/WarHammer/${cardId}`,
        {
            next: {revalidate : 10}

        }
        );
    const data  = await res.json();
    return data;

}