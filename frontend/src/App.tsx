
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/HomeComponents/Header'
import Home from './Pages/Home'
import { DestinationsProvider } from './Contexts/DestinationsContext'
import Destinations from './Pages/Destinations'
import DestinationDetail from './Pages/DestinationDetail'

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

      <Route path='/destinations' element={
        <>
          <Header/>

          <Destinations/>
        </>
      }/> 

      <Route path='/destination/:id' element={
        <>
          <Header/>
          <DestinationDetail/>
        </>
      }/>

    </Routes>
    </DestinationsProvider>
  )
}

export default App
