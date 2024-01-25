// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import Client from './client';
import Editor from './editor';
import { useParams } from 'react-router-dom';
import { initSocket } from '../socket';
import { useLocation,useNavigate,Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const EditorPage = () => {
  const { roomID } = useParams()
  const coderef= useRef(null)
  const reactnagigate = useNavigate()
  const location = useLocation()
  const [clients, setclients] = useState([])
  const socketref = useRef(null)
  useEffect(() => {
    
    
    const init = async () => {
      
      socketref.current = await initSocket() 
      socketref.current.on('connect_error', (err) => {
        handleerrors(err)
      })
      const handleerrors = (e) => {
        console.log('error', e)
        toast.error('error connecting ,try again later ')
        reactnagigate('/')

      }
      socketref.current.on('connect_failed', (err) => {
        handleerrors(err)
      })
      socketref.current.emit('join', {
        roomID,
        name: location.state?.name
      })
      socketref.current.on('joined', ({ clients, name, socketId }) => {
        if (name !== location.state?.name) {
          toast.success(`${name} entered the room `)
        }
        setclients(clients)
        socketref.current.emit('sync-code', {
        
          code:coderef.current,
          socketId
        })
      })
      socketref.current.on(
                'disconnected',
                ({ socketId, name }) => {
                    toast.success(`${name} left the room.`);
                    setclients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );
    }
    
    init()
    return() => {
      socketref.current.disconnect();
      socketref.current.off('joined');
      socketref.current.off('disconnected');
    }
  }, [])
  if (!location.state) {
     return <Navigate to='/'/>
  }
  function copy() {
    try {
      navigator.clipboard.writeText(roomID)
      toast.success('copied to clipboard')
    } catch (error) {
      toast.error('error copying')
    }
  }
  function leave() {
    reactnagigate('/')
  }
  return (
    <div className="flex h-screen">
  <div className="bg-[#1c1e29] p-4 text-white flex flex-col w-56">
    {/* Sidebar content */}
    <div className="flex-grow">
     
      <p>Connected</p>
      <div className="flex items-center flex-wrap gap-5 mt-24">
        {clients.map((client) => (
          <Client key={client.socketID} name={client.name} />
        ))}
      </div>
        </div>
        <button className='bg-blue-200 text-black py-2 px-4 rounded transition duration-300 ease-in-ou hover:bg-blue-900' onClick={copy}>Copy room id</button>
        <button className='bg-blue-200 text-black py-2 px-4 rounded transition duration-300 ease-in-ou mt-10 mb-10 hover:bg-blue-900' onClick={leave}>Sign Out</button>
      </div>
      
  <div className="flex-grow flex items-start justify-end p-4">
    
    <div className="editor bg-white p-3 rounded shadow max-w-full  max-h-full w-full">
      
          <Editor socketRef={socketref} roomID={roomID} oncode={(codes: null) => {
          
            coderef.current = codes
            
           }} />
    </div>
  </div>
</div>

  )
}

export default EditorPage;
