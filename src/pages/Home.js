import React from 'react'
import HomePageCard from '../components/HomePageCard'

const Home = () => {
  return (
    <div style={{margin: "30px"}}>
      <div style={{backgroundColor: "blue", display: "flex",padding:"20px" ,borderRadius: "15px"}}>
        <h1 style={{color: "white", margin: "auto"}}>Face Recognition Using AWS Rekognition</h1> 
      </div>
      <div style={{ display: "flex",padding:"20px" }}>
        <h2 style={{color: "gray", margin: "auto", marginTop: "30px"}}>3 Steps to Follow</h2> 
      </div>
      <HomePageCard heading={"Create Collection"} desc={"If you don't have a collection click on Go button and create collection. And also you can check/delete created collection"} page={"collection"} hasButton={true}/>
      <HomePageCard heading={"Register Faces"} desc={"If you want to Register particular person's Face then click on Go button"} page={"register"} hasButton={true}/>
      <HomePageCard heading={"Recognize a Face"} desc={"If you want to start Recognize faces you click on go button and you can start recognition"} page={"recognize"} hasButton={true}/>
    </div>
  )
}

export default Home
