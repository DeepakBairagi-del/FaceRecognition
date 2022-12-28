import React, { useState, useEffect } from 'react'
import HomePageCard from "../components/HomePageCard"
import {Storage, API} from 'aws-amplify'

const Register = () => {
  const [input, setInput] = useState("");
  const [file, setFile] = useState();
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const handleRegister = async() => {
    if(selectedCollection === "")return 
    await Storage.put( input+'.jpg', file, {contentType: file.type});
    const response =await API.post("rekognition", "/registerFace",{body : {"collectionName" : selectedCollection, "photo" : input}})
  }
  const getCollections = async() => {
    const listOfCollections = await API.get('rekognition', '/collections/listCollection');
    setCollections(listOfCollections.result);
  }

  useEffect(()=> {
    getCollections();
  }, [])
  return (
    <div style={{margin: "30px"}}>
      <HomePageCard heading={"About Registration of Faces"} desc={"You Need to select collection in which you want to register faces and also you need to enter the person name without space and Need to upload person's image to register"} hasButton={false}/> 
      <div style={{display : "flex", flexDirection: "column", justifyItems:"center", alignItems:"center", marginTop: "30px", border:"1px solid lightGray", padding: "30px"}}>
        <div style={{display : "flex", flexDirection:"row",alignItems:"center",width:"80vw"}}>
          <h3 style={{fontWeight:"500", marginRight:"15px"}}>Select a Collection</h3>  
          <select  onChange={(e) => setSelectedCollection(e.target.value)} required>
            <option>Select a Collection</option>
            {collections.map((collection, i) => (
              <option key={i} value={collection}>{collection}</option>
            ))}
          </select>
        </div>
        <input value={input} onChange={(e) => setInput(e.target.value)} type={"text"} placeholder={"Enter Person Name"} style={{width: "80vw", margin: "30px", border:"1px solid lightGray", padding:"10px", borderRadius: "10px"}} required/>
        <div style={{width:"80vw"}}>
          <input required style={{marginBottom: "20px"}} onChange={(e) => setFile(e.target.files[0])} type="file" autoComplete="off" />
        </div>
        <button onClick={() => handleRegister()} style={{backgroundColor : "blue", color: "white", padding: "10px 25px", border: "none", borderRadius: "5px", fontWeight: "bold"}}>REGISTER FACE</button>
      </div>
      <div style={{display : "flex", flexDirection: "column", justifyItems:"center", alignItems:"center", marginTop: "30px", border:"1px solid lightGray", padding: "30px"}}>
        {file && <img style={{height: "700px" , width: "700px", objectFit: "contain"}} src={URL.createObjectURL(file)} alt='image of person'/>}
      </div>
    </div>
  )
}

export default Register
