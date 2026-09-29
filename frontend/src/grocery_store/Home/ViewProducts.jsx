import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import ViewProductsDetails from "./ViewProductsDetails";
import { useContext } from "react";
import { mycontext } from "../Containers/Context";
import "../../css/Product.css";
import { getImageUrl } from "../utils/getImageUrl";
import { apiUrl } from "../utils/api";


function ViewProducts(){
    let [, , selectedCategory, , searchQuery] = useContext(mycontext);
    let navigate = useNavigate()
    const requestKey = JSON.stringify([searchQuery, selectedCategory]);
    const [productResult, setProductResult] = useState(null);
    const [slowRequestKey, setSlowRequestKey] = useState(null);
    const loading = productResult?.key !== requestKey;
    const slowLoading = loading && slowRequestKey === requestKey;
    const products = productResult?.key === requestKey ? productResult.products : [];
    let openproduct = (id)=>{
        navigate('/viewproductdetails/'+id)
    }
    useEffect(()=>{
        let isCurrentRequest = true;
        let slowTimer = setTimeout(() => {
            if (isCurrentRequest) setSlowRequestKey(requestKey);
        }, 2000);

        let get_url = apiUrl('/grocerystore/home/');
        if (searchQuery && searchQuery.trim() !== "") {
            get_url = apiUrl(`/grocerystore/search/?search=${searchQuery}`);
        } 
        else if (selectedCategory) {
            get_url = apiUrl(`/grocerystore/home/?category=${selectedCategory}`);
        }
        if (selectedCategory) {
            console.log("Selected Category:", selectedCategory);
        }
        axios.get(get_url).then((res)=>{
            if (isCurrentRequest) {
                setProductResult({
                    key: requestKey,
                    products: Array.isArray(res.data) ? res.data : [],
                });
            }
        }).catch((err)=>{
            console.log("Error fetching products:",err);
            if (isCurrentRequest) setProductResult({ key: requestKey, products: [] });
        }).finally(()=>clearTimeout(slowTimer));

        return () => {
            isCurrentRequest = false;
            clearTimeout(slowTimer);
        };
    },[requestKey,searchQuery,selectedCategory])
    return (
        <div>
            <div  className="viewproduct">{
                loading ? (
                    // <div style={{textAlign:"center", width:"100%", padding: "40px 20px", gridColumn: "1 / -1"}}>
                    //     <p>Loading... <div className="spinner"></div></p>
                    //     {slowLoading && (
                    //         <p style={{color: "#84c225", fontWeight: "bold", marginTop: "10px"}}>
                    //             Please wait up to 2 minutes — our server is waking up 🌙
                    //         </p>
                    //     )}
                    // </div>
                    <div className="loading-wrapper">
                        <div className="loading-inline">
                            <div className="spinner-small"></div>
                            <span>Loading...</span>
                        </div>
                        {slowLoading && (
                            <p style={{color: "#84c225", fontWeight: "bold", marginTop: "10px"}}>
                                Please wait up to 2 minutes — our server is waking up 🌙
                            </p>
                        )}
                    </div>

                ) : products.length === 0 ? (
                <p style={{textAlign:"center", width:"100%", gridColumn: "1 / -1"}}> No products found 😢</p>) : (
                products.map((obj)=>( <div key={obj.product_id}>
                    <button style={{border: "none"}} onClick={()=>openproduct(obj.product_id)}>{getImageUrl(obj.image) && <img src={getImageUrl(obj.image)} width="150" alt={obj.product_name} />}</button>
                    <h3>{obj.product_name}</h3>
                    <p>₹{obj.price_per_item}</p>
                    </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default ViewProducts;