

export interface Destination{

    id : string;
    city : string;
    county : string;
    description : string;
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



export interface Reservation{
    id : string;
    userId : User;
    tripId : Trip;
    status : string;
    createdAt : Date;
    updatedAt : Date;
}

export interface User{
    id : string;
    firstName : string;
    lastName : string;
    email : string;
    password? : string;
    role : string;
       createdAt : Date;
    updatedAt : Date;
}



