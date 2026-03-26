
import './App.css'
import { Route, Routes } from 'react-router-dom'
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
import UserRoute from './Layouts/UserRoute'
import PublicLayout from './Layouts/PublicLayout'
import AdminRoute from './Layouts/AdminRoute'
import AdminLayout from './Layouts/AdminLayout'
import Dashboard from './AdminPages/Dashboard'
import DestinationsAdmin from './AdminPages/DestinationsAdmin'
import DestinationAdminDetails from './AdminPages/DestinationAdminDetails'
import { DestinationAdminProvider } from './AdminContexts/DestinationAdminContext'
import AddDestination from './AdminPages/AddDestination'
import { HotelsAdminProvider } from './AdminContexts/HotelsAdminContext'
import HotelsAdmin from './AdminPages/HotelsAdmin'

function App() {
  
     
  return (
    <DestinationsProvider>
      <AuthProvider>
        <TripsProvider>
          <ReservationsProvider>
            <FavoritesProvider>
              <UsersProvider>
                <DestinationAdminProvider>
                  <HotelsAdminProvider>
    <Routes>

      <Route element={
        <UserRoute>
          <PublicLayout/>
        </UserRoute>
      }>

      <Route path='/' element={
        <>
          
          <Home/>
        </> 
      }/>

      <Route path='/destinations' element={
        <>
          

          <Destinations/>
        </>
      }/> 

      <Route path='/destination/:id' element={
        <>
          
          <DestinationDetail/>
        </>
      }/>

       <Route path='/profile' element={
        <>
        
          <Profile/>
        </>
       }/>

       <Route path='/trips' element={
        <>
          
          <Trips/>
        </>
       }/>


       <Route path='/search' element={
        <>
          
          <SearchDestinations/>
        </>
       }/>

       <Route path='/trip/:id' element={
        <>
          
          <TripDetails/>
        </>
       }/>


       <Route path='/reservation/:id' element={
        <>
          
          <Reservation/>
        </>
       }/>


       <Route path='/reservations' element={
        <>
          
          <Reservations/>
        </>
       }/>


       <Route path='/reservationDetails/:id' element={
        <>
          
          <ReservationDetails/>
        </>
       }/>

       <Route path='/favoris' element={
        <>
          <Favorites/>
        </>
       }/>

       </Route>


       <Route path='/admin/*' element={
        <AdminRoute>
          <AdminLayout/>
        </AdminRoute>
       }>
      
       <Route path='dashboard' element={
        <Dashboard/>
       }/>
 
       <Route path='destinations' element={
        <DestinationsAdmin/>
       }/>

       <Route path='destinationDetail/:id' element={
        <DestinationAdminDetails/>
       }/>

        <Route path='addDestination' element={
          <AddDestination/>
        }/>

        <Route path='hotels' element={
          <HotelsAdmin/>
        }/>
   
     </Route>
 


    </Routes>


                     </HotelsAdminProvider>
                </DestinationAdminProvider>
            </UsersProvider>
        </FavoritesProvider>
    </ReservationsProvider>
    </TripsProvider>
    </AuthProvider>
    </DestinationsProvider>
  )
}

export default App
