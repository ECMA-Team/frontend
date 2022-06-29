import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import("./style.css");

const Category = () => {
    const [allcat, setAllcat] = useState([]);

    const clickbrand = () => {

        axios.get(`https://meraki-project-5-backend.herokuapp.com/category`).then((result) => {
            setAllcat(result.data.result)
            console.log(result.data.result);
            // console.log(result);
        }).catch((err) => {
            console.log(err);
        })

    }



    useEffect(clickbrand, [])

    return (<div className="all_brand">
        {allcat.length&&allcat.map((element,index)=>{
            return <div key={index} className= "branddiv">
                 <img src={element.img}></img>
                <p>{element.category}</p>
               
            </div>
        })
        }
    </div>)

}


export default Category;