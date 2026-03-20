

export interface Destination{

    id : string;
    city : string;
    country : string;
    continent : string;
    latitude : number;
    longitude : number;
    description : string;
    bestSeason : string;
    currency  :string;
    language : string;
    timeZone : string;
    attractions : string[];
    activities : string[];
    travelTips : string[];
    rating : number;
    averageTemperature : number;
    images : string[];
    createdAt : Date;
    updatedAt : Date;
    
}


export interface Hotel{
    id : string;
    nom : string;
    etoiles : number;
    pointsPositifs : string[];
    createdAt : Date;
    updatedAt : Date;
}


export interface Trip{

    id : string;
    title : string;
    destinationId : string;
    aller : Date;
    retour : Date;
    duree : number;
    description : string;
    prix : number;
    places : number;
    hotel : Hotel;
    destination : Destination;
    conditionsVoyage : string[];
        createdAt : Date;
    updatedAt : Date;
    hotelId : string;
}


export interface Passenger{
    id? : string;
     firstName : string,
          lastName : string,
          age : number;
          dateNaiss: string,
          passeportNum : string;
          genre: string;
          nationality : string
    
}

export interface Reservation{
    id : string;
    userId : User;
    tripId : Trip;
    passengers : Passenger[];
    totalPrice : number;
    status : string;
    createdAt : Date;
    updatedAt : Date;
    user? : User;
    trip? : Trip;
}


export interface User{
    id : string;
    firstName : string;
    lastName : string;
    email : string;
    password? : string;
    role : string;
    favorites : Destination[];
    createdAt : Date;
    updatedAt : Date;
}


export interface FilterTripType{

    city : string;
    country : string;
    duree : number;
    minPrice : number;
    maxPrice : number;

}