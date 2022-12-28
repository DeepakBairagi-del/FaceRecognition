import React from 'react'
import {Link} from "react-router-dom"

const HomePageCard = ({heading, desc, page, hasButton}) => {
  return (
    <div style={{padding:"20px", marginTop: "30px", border: "1px solid blue", borderRadius: "10px"}}>
      <div style={{display: 'flex', alignItems: "center", margin: "10px"}}>
        <h1 style={{flex: "1", fontWeight: "500"}}>{heading}</h1>
        {hasButton && 
          <Link to={`/${page}`}>
              <button style={{backgroundColor : "blue", color: "white", padding: "10px 25px", border: "none", borderRadius: "5px", fontWeight: "bold"}}>Go</button>
          </Link>
        }
      </div>
      <h3 style={{color: "gray", fontWeight: "500"}}>{desc}</h3>
    </div>
  )
}

export default HomePageCard
