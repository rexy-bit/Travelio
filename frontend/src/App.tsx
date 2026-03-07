
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/HomeComponents/Header'
import Home from './Pages/Home'
import { DestinationsProvider } from './Contexts/DestinationsContext'

function App() {
  

  return (
    <DestinationsProvider>
    <Routes>

      <Route path='/' element={
        <>
          <Header/>
          <Home/>
        </> 
      }/>

    </Routes>
    </DestinationsProvider>
  )
}

export default App
