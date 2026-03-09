
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/HomeComponents/Header'
import Home from './Pages/Home'
import { DestinationsProvider } from './Contexts/DestinationsContext'
import Destinations from './Pages/Destinations'
import DestinationDetail from './Pages/DestinationDetail'
import { AuthProvider } from './Contexts/AuthContext'

function App() {
  

  return (
    <DestinationsProvider>
      <AuthProvider>
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
    </AuthProvider>
    </DestinationsProvider>
  )
}

export default App
