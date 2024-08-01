import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const About = () => {
  const Navigate=useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('token'))
    {
      Navigate('/login');
    }
  },[])
  
  return (
    <div>
      <h1>About us</h1>
      <p>this is one of the best note app exisitng in maekst</p>
    </div>
  )
}

export default About
