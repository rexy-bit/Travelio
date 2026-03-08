import { memo, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useDestinationsContext } from "../Contexts/DestinationsContext";
import Galerie from "../Components/DestinationsComponents/Galerie";




const DestinationDetail = () => {

    const {id} = useParams();

    const {destinationDetail, getDestination, loadingDestination} = useDestinationsContext();

    useEffect(()=>{
        getDestination(id);
    }, [id]);


    const [currentImg, setCurrentImg] = useState<number>(()=>{
        const saved = localStorage.getItem('currentImg');

        return saved ? JSON.parse(saved) : 0;
    });

    const [showGalerie, setShowGalerie] = useState<boolean>(()=>{
        const saved = localStorage.getItem('showGalerie');

        return saved ? JSON.parse(saved) : false;

    });

    useEffect(()=>{
        localStorage.setItem('showGalerie', JSON.stringify(showGalerie));
    }, [showGalerie]);

    const slideLeft = () => {

          if(currentImg - 1 < 0){
            setCurrentImg(destinationDetail?.images.length - 1);
          }else{
            setCurrentImg(prev => prev - 1 );
          }
    }

    const slideRight = () => {

        if(currentImg + 1 >= destinationDetail?.images.length){
            setCurrentImg(0);
        }else{
            setCurrentImg(prev => prev + 1);
        }
    }

    return(
        <section className="flex flex-col min-h-screen bg-gray-200 items-center w-full"> 
            {loadingDestination
              ?
              <div className="font-bold text-[1.2em] mt-10 text-center">
                Loading...
              </div>
              : 
                !destinationDetail ?
                   <div className="font-bold text-[1.2em] mt-10 text-center">Destination not found</div>
                   : 
                    <>
                      <h1  className="text-[1.7em] font-bold mt-20 underline">{destinationDetail.city}, {destinationDetail.country}</h1>

                          <button onClick={()=>setShowGalerie(true)} className="mt-7 bg-[#1B4332] text-white font-bold w-[100px] h-[35px] rounded-[10px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">Galerie</button>
                      <div className="flex flex-row justify-center items-center gap-5 mt-3 max-[600px]:gap-3">
                        <div onClick={slideLeft} 
                        className="text-[2.5em] max-[600px]:text-[1.5em] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                        ><i className="fa-solid fa-angle-left"></i></div>
                        <div className="flex flex-col justify-center items-center">
                        <img src={destinationDetail.images[currentImg]} className="w-[500px] h-[400px] object-contain max-[600px]:w-[300px] " alt="" />
                        <div className="font-bold">{currentImg + 1}/{destinationDetail.images.length}</div>
                        </div>
                        <div onClick={slideRight}
                        className="text-[2.5em] max-[600px]:text-[1.5em] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                        ><i className="fa-solid fa-angle-right"></i></div>
                      </div>

                      <div className="w-[500px] max-[600px]:w-[400px] max-[450px]:w-[300px] flex flex-col gap-5 p-5 bg-white shadow-2xl rounded-xl mt-10">
                        <h2 className="text-[1.2em] font-bold">Description:</h2>
                        <div className="text-[16px] leading-6">
                            {destinationDetail.description}
                        </div>
                      </div>

                      <button className="bg-[#1B4332] mt-5 px-5 text-white font-[500] h-[40px] rounded-lg mb-10 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">Voir des les voyages vers {destinationDetail.city}</button>

                    </>
            }

            {showGalerie && <Galerie destination={destinationDetail!} setShowPop={setShowGalerie}/>}
           
        </section>
    )
}


export default memo(DestinationDetail);