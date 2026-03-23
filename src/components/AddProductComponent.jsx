import { useState } from "react";
import NavbarComponent from "./NavbarComponent"
import axios from "axios";
const AddProductComponent = () => {
    let [product_name, setProductName] = useState("");
    let [product_description, setProductDescription] = useState("");
    let [product_cost, setProductCost] = useState("");
    let [product_category, setProductCategory] = useState("");
    let [product_image, setProductImage] = useState("");

    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        setLoading("Please wait...")

        try {
            const product_data = new FormData()
            product_data.append("product_name", product_name);
            product_data.append("product_cost", product_cost);
            product_data.append("product_category", product_category);
            product_data.append("product_description", product_description);
            product_data.append("product_image", product_image);

            const response = await axios.post("https://edwink.alwaysdata.net/api/add_product", product_data);
            console.log(response);

            if (response.status === 200) {
                setLoading("");
                setSuccess(response.data.message);

                // clear form
                setProductName("");
                setProductCategory("");
                setProductCost("");
                setProductDescription("");
                setProductImage("");
            }


        } catch (error) {
            setSuccess("");
            setLoading("");
            setError(error.message);

        }

    }



    return (
        <div className="row justify-content-center my-3">

            <div className="col-md-6 card shadow p-4">
                <h2>Add a Package</h2>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>

                <form onSubmit={handleSubmit}>
                    <input type="text"
                        className="form-control"
                        required
                        placeholder="Package Title... eg. 7-Day coastal Kenya Safari"
                        value={product_name}
                        onChange={(e) => { setProductName(e.target.value) }}

                    />
                    <br />


                    <input type="number"
                        className="form-control"
                        required
                        placeholder="Package Base Price"
                        value={product_cost}
                        onChange={(e) => { setProductCost(e.target.value) }}
                        option />
                    <br />

                    <select
                        required
                        onChange={(e) => { setProductCategory(e.target.value) }}
                        className="form-select">
                        <option value="">Travel Category</option>
                        <option value="luxury">Luxury</option>
                        <option value="adventure">Adventure</option>
                        <option value="honeymoon">Honeymoon</option>
                        {/* <option value="accessories">Accessories</option> */}
                    </select>
                    <br />

                    <label htmlFor="" className="form-control"><u>Service offfered</u></label>
                    <br />
                    <input type="checkbox" />Flights <br />
                    <input type="checkbox" /> Accomodation <br />
                    <input type="checkbox" /> Meals (All or Specified) <br />
                    <input type="checkbox" /> Local Transport <br />
                    <input type="checkbox" /> Park or Activity fee <br />
                    <br />

                    <textarea
                        required
                        value={product_description}
                        onChange={(e) => { setProductDescription(e.target.value) }}
                        rows="7"
                        className="form-control"></textarea>
                    <br />

                    <label htmlFor="" className="form-label">
                        Destination Image</label>

                    <input type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setProductImage(e.target.files[0]);
                        }}
                        required
                        className="form-control" />
                    <br />

                    <button className="btn btn-success">Publish Itinerary</button>

                </form>
            </div>



        </div>
    );
}

export default AddProductComponent;