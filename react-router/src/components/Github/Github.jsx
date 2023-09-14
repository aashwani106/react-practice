/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

function Github() {
   const [data , setData] = useState([])

   useEffect( () => {
       fetch('https://api.github.com/users/ashwani666')
       .then(response => response.json())
       .then(data =>{
        console.log(data);
        setData(data)
       })
   } ,[])



  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
      Github Followeers  : { data.followers}
      <img  src = { data.avatar_url } alt='git picture' width={300} />
    </div>

)
}

export default Github


// export const githubInfoLoader = async () => {
//    const response = await fetch('https://api.github.com/users/ashwani666')
// }
