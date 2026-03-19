import { createContext,  useContext, useEffect, useState } from "react";
import type { Passenger, Reservation } from "./Types";
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";



interface ReservationsContextType{

    userReservations : Reservation[];
    loadingUserReservations : boolean;
    addReservation: (userId : string, tripId : string, passengers : Passenger[])=>Promise<void>
    loadingAddReservation : boolean;
    passagers : Passenger[];
    setPassagers : (p : Passenger[])=>void;
    attenteReservations : Reservation[];
    confirmedReservations : Reservation[];
    reservationDetails: Reservation | null;
    loadingReservationDetails : boolean;
    getReservationDetails : (id : string)=>Promise<void>;
    cancelReservation : (id : string)=>Promise<void>
    loadingCancel : boolean;
}


const ReservationsContext = createContext<ReservationsContextType | null>(null);

export const ReservationsProvider = ({children} : {children: React.ReactNode}) => {

    const [userReservations, setUserReservations] = useState<Reservation[]>([]);
    const [loadingUserReservations, setLoadingUserReservations] = useState<boolean>(false);
    const [loadingAddReservation, setLoadingAddReservation] = useState<boolean>(false);

    const [attenteReservations, setAttenteReservations] = useState<Reservation[]>([]);
    const [confirmedReservations, setConfirmedReservations] = useState<Reservation[]>([]);

    const [loadingCancel, setLoadingCancel] = useState<boolean>(false);

    const [reservationDetails, setReservationDetails] = useState<Reservation |null>(null);
    const [loadingReservationDetails, setLoadingReservationDetails] = useState<boolean>(false);

    const [passagers, setPassagers] = useState<Passenger[]>(()=>{
        const saved = localStorage.getItem('passagers');

        return saved ? JSON.parse(saved) : [];
    });

    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.setItem('passagers', JSON.stringify(passagers));
    } ,[passagers]);

    const {user} = useAuthContext();
    const getUserReservations = async() => {

        try{
            setLoadingUserReservations(true);
        const res = await fetch(`http://localhost:5000/api/v1/reservations/user/${user?.id}`, {
            method : "GET",
            credentials : "include"
        });

        const data = await res.json();

        if(!res.ok){
            throw new Error(data.error || data.message || "Error in getting user reservations");
        }

        console.log('User Reservations : ', data.data);
        setUserReservations(data.data);

    }catch(err){
        console.error(err);
    }finally{
        setLoadingUserReservations(false);
    }
    
    }

    const addReservation = async(userId : string, tripId : string, passengers : Passenger[]) => {

        setLoadingAddReservation(true);
        try{

            const res = await fetch("http://localhost:5000/api/v1/reservations/add/", {
                method : "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({tripId, passengers}),
                credentials :"include"
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in adding a reservation");
            }

            await getUserReservations();
            setPassagers([]);
            navigate("/reservations");
        }catch(err){
           console.error(err);
        }finally{
            setLoadingAddReservation(false);
        }
    }

    const getUserReservationsStats = async() => {

        try{

            const res = await fetch(`http://localhost:5000/api/v1/reservations/statsUser/${user?.id}`, {
                method : "GET",
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error ("Error in getting user reservations stats");
            }

            setAttenteReservations(data.data.attenteReservations);
            setConfirmedReservations(data.data.confirmedReservations);

            console.log("result of fetch: ", data.data.attenteReservations, data.data.confirmedReservations);
        }catch(err){
            console.error(err);
        }
    }

    const getReservationDetails = async(id : string) => {

        setLoadingReservationDetails(true);
        try{

            const res = await fetch(`http://localhost:5000/api/v1/reservations/details/${id}`, {
                method : "GET",
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || data.message || "Error in getting reservation details");
            }

            setReservationDetails(data.data);
            console.log("Reservation Details : ", data.data);
        }catch(err){
           console.error(err);
        }finally{
            setLoadingAddReservation(false);
        }
    }


    const cancelReservation = async(id : string) => {

        setLoadingCancel(true);
        try{

            const res = await fetch(`http://localhost:5000/api/v1/reservations/cancel/${id}`, {
                method: "PUT",
                headers : {
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            });

            const data = await res.json();

            if(!res.ok){
               throw new Error(data.error || data.message || "Error in cancelling the reservation");
            }

            await getUserReservations();
            navigate("/reservations")

        }catch(err){
            console.error(err);
        }finally{
            setLoadingCancel(false);
        }
    }

    useEffect(()=>{
        if(user){
            getUserReservationsStats();
        }
    }, []);
    useEffect(()=>{
        if(user){
            getUserReservations();
        }
    }, []);

    return <ReservationsContext.Provider value={{userReservations,
    passagers, setPassagers, loadingAddReservation, loadingUserReservations, addReservation, attenteReservations, confirmedReservations,
    getReservationDetails, reservationDetails, loadingReservationDetails,
    cancelReservation, loadingCancel
    }}>
        {children}
    </ReservationsContext.Provider>
}


export const useReservationsContext = () => {

    const context = useContext(ReservationsContext);

    if(!context){
        throw new Error("Please use the useReservationsContext inside the ReservationsProvider");
    }

    return context;
}


