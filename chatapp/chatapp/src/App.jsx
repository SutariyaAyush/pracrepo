import { useState,useEffect } from 'react'
import './App.css'
import io from 'socket.io-client'
import {nanoid} from 'nanoid'

const socket = io("http://localhost:5000")
const nano_id = nanoid(4)
function App() {

  const [message,setmessage] =useState('')
  const[chat,setchat] = useState([])

  const sendchat = (e) => {
    e.preventDefault()
    socket.emit("chat",{message,nano_id})
    setmessage('')
  }

  useEffect(()=>{
    socket.on("chat",(payload)=>{
      setchat([...chat,payload])
    })
  })
  return (
    <>
      {chat.map((payload,index)=>{
        return (
          <p key={index}>{payload.message}: <span>id: {payload.nano_id}</span></p>
        )
      })}
      <form onSubmit={sendchat}>
        <input type="text" name="chat" placeholder='send txt' value={message} onChange={(e)=>{
          setmessage(e.target.value)
        }}/>

        <button type='submit'>
          send
        </button>
      </form>
      
    </>
  )
}

export default App
