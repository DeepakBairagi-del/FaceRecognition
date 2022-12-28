import React, {useEffect, useState} from 'react'
import HomePageCard from "../components/HomePageCard"
import CollectionCard from "../components/CollectionCard"
import {API} from "aws-amplify"

const Collection = () => {
  const [input, setInput] = useState("");
  const [collections, setCollections] = useState([]);
  const handleCreate = async() => {
      const response = await API.post("rekognition", "/collections/create",{body:{"collectionName" : input}} )
      getCollections()
  }
  const getCollections = async() => {
    const listOfCollections = await API.get('rekognition', '/collections/listCollection');
    setCollections(listOfCollections.result)
  }
  useEffect(()=> {
    getCollections();
  }, [])
  return (
    <div style={{margin: "30px"}}>
      <HomePageCard heading={"About Collection"} desc={"You can create collection or you can delete collection in this page"} hasButton={false}/> 
      <div style={{display : "flex", flexDirection: "column", justifyItems:"center", alignItems:"center", marginTop: "30px", border:"1px solid lightGray", padding: "30px"}}>
        <input required type={"text"} value={input} onChange={(e) => setInput(e.target.value)} placeholder={"Enter Collection Name"} style={{width: "80vw", margin: "30px", border:"1px solid lightGray", padding:"10px", borderRadius: "10px"}}/>
        <button onClick={() => handleCreate()} style={{backgroundColor : "blue", color: "white", padding: "10px 25px", border: "none", borderRadius: "5px", fontWeight: "bold"}}>CREATE COLLECTION</button>
      </div>
      <div style={{display : "flex", flexDirection: "column", justifyItems:"center", alignItems:"center", marginTop: "30px", border:"1px solid lightGray", padding: "30px"}}>
        <div style={{ display: "flex" }}>
          <h1 style={{color: "gray", margin: "auto"}}>List of Collections</h1> 
        </div>
        <div style={{textAlign:"end", width:"80vw", margin:"10px"}}>
          <h3 style={{fontWeight:"500", color:"gray"}}>Total count <span>{collections.length}</span></h3>
        </div>
        {collections.map((collection, i) => (
          <CollectionCard key={i} collectionName={collection} />
        ))}
      </div>
    </div>
  )
}

export default Collection
