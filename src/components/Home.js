import React from "react";

function Home () {
    return (
        <div style={{margin:"20px 20px auto", height:"60px", backgroundColor:"purple", textAlign:"left"}}>
            <ul style={{display:"flex", listStyle:"none"}}>
                <li style={{margin:"10px 15px" , color:"white", cursor:"pointer"}}>Title</li>
                <li style={{margin:"10px 15px", color:"white", cursor:"pointer"}}>Upload</li>
                <li style={{margin:"10px 15px", color:"white", cursor:"pointer"}}>Play List</li>
            </ul>
        </div>
    )
}

export default Home;