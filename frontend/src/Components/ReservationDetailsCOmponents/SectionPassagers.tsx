import  { memo } from 'react';
import type { Reservation } from '../../Contexts/Types';


const SectionPassagers = ({reservation} : {reservation : Reservation}) => {

    return(
        <div className="bg-white p-4 rounded-[10px] shadow-2xl w-[400px] max-[450px]:w-[320px]">
            <h3 className="text-[1.2em] font-bold underline">Passagers <i className="fa-solid fa-person-walking-luggage ml-2"></i></h3>

  {reservation.passengers.map((p, i) => (
    <div key={i} className="border-b py-2">
      <p>{p.firstName} {p.lastName}</p>
      <p className="text-sm text-gray-500">
        {p.age} ans • {p.nationality}
      </p>
    </div>
  ))}
        </div>
    )
}


export default memo(SectionPassagers);