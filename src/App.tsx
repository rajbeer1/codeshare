
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './components/home'
import EditorPage from './components/editorPage'
import { Toaster } from 'react-hot-toast'
import './App.css'
const App = () => {
  return (
    <div>
      <div>
        <Toaster position='top-right'
          toastOptions={{
            duration:10000
          }}
          ></Toaster>
        
    </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor/:roomID' element={<EditorPage/>}/>
          
      </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App