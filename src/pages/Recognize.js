import React, {useState, useEffect} from 'react'
import HomePageCard from '../components/HomePageCard'
import {API, Storage} from 'aws-amplify'

const Recognize = () => {
  const [selectedCollection, setSelectedCollection] = useState("");
  const [file, setFile] = useState();
  const [collections, setCollections] = useState([]);
  const [resultImageURL, setResultImageURL] = useState("")
  
  const getCollections = async() => {
    const listOfCollections = await API.get('rekognition', '/collections/listCollection');
    setCollections(listOfCollections.result);
  }
  useEffect(()=> {
    getCollections();
  }, [])

  const handleRecognize = async() => {
    if(selectedCollection === "")return 
    await Storage.put( file.name, file, {contentType: file.type});
    const response =await API.post("rekognition", "/rekognize/detectFaces",{body : {"photo" : file.name}})
    const result =await API.post("rekognition", "/rekognize/rekognizeFaces",{body : {"photo" : file.name, "collectionName": selectedCollection,"boundingBoxes" : response }})
    setResultImageURL(result)
  }
  return (
    <div style={{margin: "30px"}}>
      <HomePageCard heading={"About Recogntion of Faces"} desc={"You Need to select collection in which you want to recognize faces and also you need to upload person's image to recognize"} hasButton={false}/> 
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
        <div style={{width:"80vw"}}>
          <input required style={{marginBottom: "20px", marginTop: "20px"}} onChange={(e) => setFile(e.target.files[0])} type="file" autoComplete="off" />
        </div>
        <button onClick={() => handleRecognize()} style={{backgroundColor : "blue", color: "white", padding: "10px 25px", border: "none", borderRadius: "5px", fontWeight: "bold"}}>RECOGNIZE FACE</button>
      </div>
      <div style={{display : "flex", flexDirection: "column", justifyItems:"center", alignItems:"center", marginTop: "30px", border:"1px solid lightGray", padding: "30px"}}>
        {
          resultImageURL &&
          <img style={{height: "700px" , width: "700px", objectFit: "contain"}} src={resultImageURL} alt='image of person'/>
        }
      </div>
    </div>
  )
}

export default Recognize
