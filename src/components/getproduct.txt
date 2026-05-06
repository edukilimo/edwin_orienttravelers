import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetProductComponent = () => {

    let [products, setProducts] = useState ([]);
    let [loading, setLoading] = useState ("");
    let [error, setError] = useState ("");
    let [luxury, setLuxury] = useState([]);
    let [adventure, setAdventure] = useState([]);
    let [honeymoon, setHoneymoon] = useState([]);
    let[search_word, setSearchWord] = useState("");
    let [filtered_products, setFilteredProducts] = useState([]);
    let [culture, setculture] = useState([]);


    let navigator = useNavigate();

    // base url for image path from server
    const img_url = "https://edwink.alwaysdata.net/static/images/"

    // create function to fetch products from serverr

    const getProducts = async () => {
        setError("");
        setLoading("Fetching products. PLease wait...");


        try { 

            const response = await axios.get("https://edwink.alwaysdata.net/api/get_products");
            console.log(response);
            if (response.status ===200) {
                setLoading("");
                setProducts(response.data);

                // setLuxury(response.data.filter((product)=> product.product_category ==="luxury"));
                // setAdventure(response.data.filter((product) => product.product_category==="adventure"));
                // setHoneymoon(response.data.filter((product) => product.product_category==="Honeymoon"));
                // setculture(response.data.filter((product) => product.product_category === "culture"));

               

            
            <h2 className="text-center text-white bg-dark my-2 ">Luxury</h2>

            {luxury.filter((product)=> product.product_name.toLowerCase().includes(search_word.toLowerCase())
            )
            .map((product)=> (
            
            <div key={product.id} className="col-md-3 justify-content-center mb-4">
                <div className="card shadow card-margin travel-card">
                    <img src={img_url+product.product_image} alt="" className="product_img mt-4" />

                    <div className="card-body">
                        <h5 className="mt-2">{product.product_name}</h5>
                        <p className="text-muted">{product.product_description}</p>
                        <b className="text-warning">{product.product_cost}</b>
                        <br /> <br />
                        <button className="btn btn-success" onClick={()=>{navigator("/makepayment", {state: {product}}); }}>Book now!!!</button>
                    </div>
                </div>
            </div>
            ))}
                let luxury_cat = response.data.filter((product)=> product.product_category === "luxury")
                setLuxury(luxury_cat);

                let adventure_cat = response.data.filter((product)=> product.product_category === "adventure")
                setAdventure(adventure_cat);

                let honeymoon_cat = response.data.filter((product)=> product.product_category === "honeymoon")
                setHoneymoon(honeymoon_cat);

                let culture_cat = response.data.filter((product)=> product.product_category === "luxury")
                setLuxury(culture_cat);

             
             }
            
        } catch (error) {
            setLoading("");
            setError(error.message);
            
        }
    };


    useEffect(() => {
        getProducts()
    }, [])

    const handleSearch = (search_word) =>{
        let filtered = products.filter((product) => product.product_name.includes(search_word))
        setFilteredProducts(filtered)
    }

    useEffect(()=>{handleSearch(search_word)},[search_word])


    return (
        <div /* style={{backgroundColor: '#e9e', minHeight: '100vh', width: '100%', margin:'0', padding: '20px'}}*/>
            
           <div className="container-fluid row" style={{backgroundColor: 'transparent'}}>
            <h3 className="text-center text-white mb-5 my-4">Available Product</h3>
            <h6 className="text-warning">{loading}</h6>
            <h6 className="text-danger">{error}</h6>

            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="input-group mb-4 shadow-sm">

                        <input type="text" placeholder="Where would you like to escape to today?" 
            className="form-control py-3"
            value={search_word}
            onChange={(e)=> {
                setSearchWord(e.target.value);
            }}/>

            <button className="btn btn-warning fw-bold" type="button">Search</button>


                    </div>
                </div>
            </div>

            

                   {filtered_products.map((product)=>(
                <div className="col-md-3 justify-content-center mb-4">
                <div className="card shadow card-margin travel-card">
                    <img src={img_url+product.product_image} alt="" className="product_img mt-4" />

                    <div className="card-body">
                        <h5 className="mt-2">{product.product_name}</h5>
                        <p className="text-muted">{product.product_description}</p>
                        <b className="text-warning">{product.product_cost}</b>
                        <br /> <br />
                        <button className="btn btn-success" onClick={()=>{navigator("/makepayment", {state: {product}}); }}>Book now!!!</button>
                    </div>
                </div>
            </div>
            ))}


            

            <h2 className="text-center text-white bg-dark my-2 ">Luxury</h2>

            {luxury.map((product)=>(

            <div className="col-md-3 justify-content-center mb-4">
                <div className="card shadow  travel-card card-margin">
                    <img src={img_url+product.product_image} alt="" className="product_img mt-4" />

                    <div className="card-body">
                        <h5 className="mt-2">{product.product_name}</h5>
                        <p className="text-muted">{product.product_description}</p>
                        <b className="text-warning">{product.product_cost}</b>
                        <br /> <br />
                        <button className="btn btn-success" onClick={()=>{navigator("/makepayment", {state: {product}}); }}>Book now!!!</button>
                    </div>
                </div>
            </div>
            ))}
        

        

              <h2 className="text-center text-white bg-dark my-2 ">Adventure</h2>

            {adventure.map((product)=>(
            <div className="col-md-3 justify-content-center mb-4">
                <div className="card shadow card-margin travel-card ">
                    <img src={img_url+product.product_image} alt="" className="product_img mt-4" />

                    <div className="card-body">
                        <h5 className="mt-2">{product.product_name}</h5>
                        <p className="text-muted">{product.product_description}</p>
                        <b className="text-warning">{product.product_cost}</b>
                        <br /> <br />
                        <button className="btn btn-success" onClick={()=>{navigator("/makepayment", {state: {product}}); }}>Book now!!!</button>
                    </div>
                </div>
            </div>
            ))}

    



        

              <h2 className="text-center text-white bg-dark my-2 ">Honeymoon</h2>

            {honeymoon.map((product)=>(
            <div className="col-md-3 justify-content-center mb-4">
                <div className="card shadow card-margin travel-card ">
                    <img src={img_url+product.product_image} alt="" className="product_img mt-4" />

                    <div className="card-body">
                        <h5 className="mt-2">{product.product_name}</h5>
                        <p className="text-muted">{product.product_description}</p>
                        <b className="text-warning">{product.product_cost}</b>
                        <br /> <br />
                        <button className="btn btn-success" onClick={()=>{navigator("/makepayment", {state: {product}}); }}>Book now!!!</button>
                    </div>
                </div>
            </div>
            ))}
        



         
             <h2 className="text-center text-white bg-dark my-2 ">Culture</h2>

             {culture.map((product)=>(
            <div className="col-md-3 justify-content-center mb-4">
                <div className="card shadow card-margin travel-card ">
                    <img src={img_url+product.product_image} alt="" className="product_img mt-4" />

                    <div className="card-body">
                        <h5 className="mt-2">{product.product_name}</h5>
                        <p className="text-muted">{product.product_description}</p>
                        <b className="text-warning">{product.product_cost}</b>
                        <br /> <br />
                        <button className="btn btn-success" onClick={()=>{navigator("/makepayment", {state: {product}}); }}>Book now!!!</button>
                    </div>
                </div>
            </div>
            ))}
        </div>

           </div>
        
    );
}

export default GetProductComponent;