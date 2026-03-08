import { memo } from 'react';
import type { Destination } from '../../Contexts/Types';
import { useNavigate } from 'react-router-dom';


const DestinationCard = ({destination} : {destination : Destination}) => {
 
    const navigate = useNavigate();

    return(
        <div className='relative h-[300px] w-[320px] rounded-xl overflow-hidden group cursor-pointer'>

            <img src={destination.images[0]} alt={`${destination.city} ${destination.country}`}
            className='w-full h-full object-cover '
            />

            <div className='absolute flex flex-row justify-between w-full p-3  inset-0 bg-gradient-to-t from-black/70 to-black/10 flex items-end'>
            <div></div>
                 <div className='flex flex-row text-white items-center gap-2'>
                    <h3 className='text-[1.1em] font-bold'>
                        {destination.city},
                    </h3>

                    <p className='text-[1em] font-[500]'>
                        {destination.country}
                    </p>

                    <button
                    onClick={()=>navigate(`/destination/${destination.id}`)}
                    className='bg-black/80 w-[90px] h-[35px] rounded-lg cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 font-bold text-[13px]'>
                        Explorer →
                    </button>
                 </div>
            </div>
            
        </div>
    )
}

export default memo(DestinationCard);