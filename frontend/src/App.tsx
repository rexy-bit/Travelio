
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/HomeComponents/Header'
import Home from './Pages/Home'
import { DestinationsProvider } from './Contexts/DestinationsContext'
import Destinations from './Pages/Destinations'
import DestinationDetail from './Pages/DestinationDetail'
import { AuthProvider } from './Contexts/AuthContext'
import Profile from './Pages/Profile'
import { TripsProvider } from './Contexts/TripsContext'
import Trips from './Pages/Trips'
import SearchDestinations from './Pages/SearchDestinations'
import TripDetails from './Pages/TripDetails'
import { ReservationsProvider } from './Contexts/ReservationsContext'
import Reservation from './Pages/Reservation'
import Reservations from './Pages/Reservations'
import ReservationDetails from './Pages/ReservationDetails'
import { FavoritesProvider } from './Contexts/FavoritesContext'
import Favorites from './Pages/Favorites'
import { UsersProvider } from './Contexts/UsersContext'

function App() {
  

  return (
    <DestinationsProvider>
      <AuthProvider>
        <TripsProvider>
          <ReservationsProvider>
            <FavoritesProvider>
              <UsersProvider>
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

       <Route path='/profile' element={
        <>
        <Header/>
          <Profile/>
        </>
       }/>

       <Route path='/trips' element={
        <>
          <Header/>
          <Trips/>
        </>
       }/>


       <Route path='/search' element={
        <>
          <Header/>
          <SearchDestinations/>
        </>
       }/>

       <Route path='/trip/:id' element={
        <>
          <Header/>
          <TripDetails/>
        </>
       }/>


       <Route path='/reservation/:id' element={
        <>
          <Header/>
          <Reservation/>
        </>
       }/>


       <Route path='/reservations' element={
        <>
          <Header/>
          <Reservations/>
        </>
       }/>


       <Route path='/reservationDetails/:id' element={
        <>
          <Header/>
          <ReservationDetails/>
        </>
       }/>

       <Route path='/favoris' element={
        <>
          <Header/>
          <Favorites/>
        </>
       }/>

    </Routes>

            </UsersProvider>
        </FavoritesProvider>
    </ReservationsProvider>
    </TripsProvider>
    </AuthProvider>
    </DestinationsProvider>
  )
}

export default App
