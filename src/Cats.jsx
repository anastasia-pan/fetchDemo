import { useState } from "react";


const Cats =  () => {

    const [kittiesArray, setKittiesArray] = useState([])


    const getCat = async () => {
        const response = await fetch( "https://api.thecatapi.com/v1/images/search?limit=20",{
        method: "GET",})

        const kittyarray = await response.json();
        setKittiesArray(kittyarray)


    }
    

    return(
        <div>
        <h1>Hello cats</h1>
       
        <button onClick={getCat}>Get you a cat!</button>

        {kittiesArray.map((cat, index) =>{
            return <CatCard key="index " image={cat.url}/>
    
         

        })}
        
     
        </div>
    )
    
};

const CatCard = (props) => {

    return(
        <div className="catCard">
        <img src={props.image} alt="a cat"/>
        <button>Get yours</button>
       </div>
    )
    
}




export default Cats;