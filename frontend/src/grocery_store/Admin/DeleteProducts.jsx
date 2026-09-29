import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";
import "../../css/DeleteProduct.css";
import { getImageUrl } from "../utils/getImageUrl";
import { apiUrl } from "../utils/api";

function DeleteProducts(){
    let {pk} = useParams();
    let [product,setProduct] = useState({});
    let navigate = useNavigate();
    let delete_url = apiUrl('/grocerystore/modifyproduct/'+pk);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        const isAdmin = localStorage.getItem("is_admin");

        if(!token || isAdmin !== "true"){
            navigate("/");
        }
    },[navigate]);
    
    useEffect(()=>{
        axios.get(delete_url,{headers:{
            "Authorization":"Bearer "+localStorage.getItem('token')
        }}).then(
            (res)=>{
                setProduct(res.data);
            }
        ).catch((err)=>{
                console.log(err);
            });
    },[delete_url])
    let deleteproduct = ()=>{
        axios.delete(delete_url,{headers:{
            "Authorization":"Bearer "+localStorage.getItem('token')
        }}).then(()=>{
            navigate('/');
        }).catch((err)=>{
            console.log(err);
    })
    }
    return (<>
        <div className="delete-container">
            <p>Do you Really want to delete {product.product_name} <br /> 
                {getImageUrl(product.image) && (
                    <img
                        src={getImageUrl(product.image)}
                        width="120"
                    />
                )}
            </p>
            <p>Please Confirm!</p>
            <div className="button-group">
                <button className="yes-button" onClick={deleteproduct}>Yes</button>
                <button className="no-button" onClick={()=>navigate(-1)}>No</button>
            </div>
        </div>
        </>
    )

}
export default DeleteProducts;