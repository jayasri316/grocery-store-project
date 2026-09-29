import { useContext } from "react";
import { mycontext } from "../Containers/Context";

function SearchProduct(){
    let [, , , , searchQuery, setSearchQuery] = useContext(mycontext);
    return (
        <div style={{marginBottom:"20px"}}>
            <input type="text" placeholder="Search for Products..." value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)} />
        </div>
    )
}
export default SearchProduct;