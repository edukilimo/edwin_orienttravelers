import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetProductComponent = () => {

    let [products, setProducts] = useState ([]);
    let [loading, setLoading] = useState ("");
    let [error, setError] = useState ("");

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
            }
            
        } catch (error) {
            setLoading("");
            setError(error.message);
            
        }
    };


    useEffect(() => {
        getProducts()
    }, [])


    return (
        <div>
            <NavbarComponent/>
           <div className="row">
            <h3 className="mt-5">Available Product</h3>
            <h6 className="text-warning">{loading}</h6>
            <h6 className="text-danger">{error}</h6>

            {products.map((product)=>(
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