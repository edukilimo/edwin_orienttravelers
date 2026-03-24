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
            
            <h2 className="text-center text-white bg-dark my-2 p-4">Luxury</h2>

            {luxury.map((product)=>(
            <div className="col-md-3 justify-content-center mb-4">
                <div className="card shadow card-margin">
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
        <div>
            
           <div className="row">
            <h3 className="mt-5">Available Product</h3>
            <h6 className="text-warning">{loading}</h6>
            <h6 className="text-danger">{error}</h6>

            <input type="text" placeholder="Search by name" 
            className="form-control"
            value={search_word}
            onChange={(e)=> {
                setSearchWord(e.target.value);
            }}/>

                   {filtered_products.map((product)=>(
                <div className="col-md-3 justify-content-center mb-4">
                <div className="card shadow card-margin">
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


            <h2 className="text-center text-white bg-dark my-2 p-4">Luxury</h2>

            {luxury.map((product)=>(
            <div className="col-md-3 justify-content-center mb-4">
                <div className="card shadow card-margin">
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

              <h2 className="text-center text-white bg-dark my-2 p-4">Adventure</h2>

            {adventure.map((product)=>(
            <div className="col-md-3 justify-content-center mb-4">
                <div className="card shadow card-margin">
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

              <h2 className="text-center text-white bg-dark my-2 p-4">Honeymoon</h2>

            {honeymoon.map((product)=>(
            <div className="col-md-3 justify-content-center mb-4">
                <div className="card shadow card-margin">
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