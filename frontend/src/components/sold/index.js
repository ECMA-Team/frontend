import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";



const Sold = () => {
    const navigate = useNavigate();
    const [sold, setSold] = useState(0);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);


    const gitAllProduct = () => {
        axios
            .get(`https://meraki-project-5-backend.herokuapp.com/products/pagination/${page}`)
            .then((result) => {
                setProducts(result.data.result);
            })
            .catch((err) => {
                console.log({ err });
            });
    };

    // let count = 0 
    //
    // if(AvailableQuantity!=sold){
        // count+=sold+count

    // }

    useEffect(gitAllProduct, [page]);

    return (<div>
        <p onClick={gitAllProduct}>HI</p>

    </div>)

}




export default Sold;
