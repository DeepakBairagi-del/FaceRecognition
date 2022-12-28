import React from 'react'
import { API } from 'aws-amplify'

const CollectionCard = ({collectionName}) => {
  const handleDelete = async() => {
     const response =await API.del("rekognition", "/collections/delete",{body : {"collectionName" : collectionName}})
  }
  return (
    <div style={{marginTop : "20px",width: "80vw",boxShadow: "3px 3px 10px #888888",display : "flex",justifyContent: "space-between", alignItems: "center", padding: "10px", borderRadius:"10px" }}>
      <div>
        <h1 style={{flex: "1", fontWeight: "500"}}>{collectionName}</h1>
        <h3 style={{color: "gray", fontWeight: "500"}}>collection name</h3>
      </div>
      <button style={{backgroundColor : "red", color: "white", padding: "10px 25px", border: "none", borderRadius: "5px", fontWeight: "bold"}} onClick={() => handleDelete()}>DELETE</button>
    </div>
  )
}

export default CollectionCard
