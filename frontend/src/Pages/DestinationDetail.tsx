import { memo,  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDestinationsContext } from "../Contexts/DestinationsContext";
import Galerie from "../Components/DestinationsComponents/Galerie";
import { motion, AnimatePresence } from "framer-motion";
import { useTripsContext } from "../Contexts/TripsContext";
import { useAuthContext } from "../Contexts/AuthContext";
import { useFavoritesContext } from "../Contexts/FavoritesContext";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { destinationDetail, getDestination, loadingDestination } = useDestinationsContext();


  useEffect(() => {
    getDestination(id);
  }, [id]);

  const [currentImg, setCurrentImg] = useState<number>(() => {
    const saved = localStorage.getItem("currentImg");
    return saved ? JSON.parse(saved) : 0;
  });

  const [showGalerie, setShowGalerie] = useState<boolean>(() => {
    const saved = localStorage.getItem("showGalerie");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("showGalerie", JSON.stringify(showGalerie));
  }, [showGalerie]);

  const slideLeft = () => {
    if (currentImg - 1 < 0) {
      setCurrentImg(destinationDetail?.images.length! - 1);
    } else {
      setCurrentImg((prev) => prev - 1);
    }
  };

  const slideRight = () => {
    if (currentImg + 1 >= destinationDetail?.images.length!) {
      setCurrentImg(0);
    } else {
      setCurrentImg((prev) => prev + 1);
    }
  };

  const {user} = useAuthContext();
  const {toggleFavorite} = useFavoritesContext();

  const isFavorite = user?.favorites.find((f)=>f.id === destinationDetail?.id);


  const {setFilterTripsData, filterTripsData} = useTripsContext();

  return (
    <section className="flex flex-col min-h-screen bg-gray-200 items-center w-full">
      {loadingDestination ? (
        <div className="font-bold text-[1.2em] mt-10 text-center">Loading...</div>
      ) : !destinationDetail ? (
        <div className="font-bold text-[1.2em] mt-10 text-center">Destination not found</div>
      ) : (
        <>
          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[1.7em] font-bold mt-20 underline"
          >
            {destinationDetail.city}, {destinationDetail.country}
          </motion.h1>

          {/* Bouton Galerie */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowGalerie(true)}
            className="mt-7 bg-[#1B4332] text-white font-bold w-[100px] h-[35px] rounded-[10px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
          >
            Galerie
          </motion.button>

          <div onClick={()=>toggleFavorite(destinationDetail.id)} 
          className="bg-black/20 cursor-pointer mt-10 h-[50px] w-[50px] rounded-full flex justify-center items-center">
              {!isFavorite ? <i className="fa-regular fa-star text-xl"></i> : <i className="fa-solid fa-star text-xl text-yellow-600"></i>}
          </div>

          {/* Slider */}
          <div className="flex flex-row justify-center items-center gap-5 mt-3 max-[600px]:gap-3">
            <motion.div
              onClick={slideLeft}
              whileTap={{ scale: 0.9 }}
              className="text-[2.5em] max-[600px]:text-[1.5em] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
            >
              <i className="fa-solid fa-angle-left"></i>
            </motion.div>

            <div className="flex flex-col justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImg}
                  src={destinationDetail.images[currentImg]}
                  alt=""
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-[700px] h-[500px] object-contain max-[900px]:w-[500px] max-[900px]:h-[300px] max-[700px]:w-[290px] max-[700px]:h-[200px]"
                />
              </AnimatePresence>
              <div className="font-bold">{currentImg + 1}/{destinationDetail.images.length}</div>
            </div>

            <motion.div
              onClick={slideRight}
              whileTap={{ scale: 0.9 }}
              className="text-[2.5em] max-[600px]:text-[1.5em] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
            >
              <i className="fa-solid fa-angle-right"></i>
            </motion.div>
          </div>

          {/* Cards info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center items-center gap-10"
          >
            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="w-[600px] max-[650px]:w-[400px] max-[450px]:w-[300px] flex flex-col gap-5 p-5 bg-white shadow-2xl rounded-xl mt-10"
            >
              <div className="text-[1.2em] font-bold flex flex-row items-center gap-2">
                <p>Description</p> <i className="fa-brands text-[1.3em] fa-readme"></i> :
              </div>
              <div className="text-[16px] leading-6">{destinationDetail.description}</div>
            </motion.div>

            {/* Infos pratiques */}
            <motion.div
              variants={itemVariants}
              className="p-5 flex flex-col bg-white rounded-[10px] shadow-2xl w-[600px] max-[650px]:w-[400px] max-[450px]:w-[300px]"
            >
              <div className="text-[1.3em] flex flex-row items-center gap-2 underline">
                <p className="font-bold">Informations Pratiques</p>{" "}
                <i className="fa-solid text-[1.4em] fa-circle-info"></i>:
              </div>
              <div className="mt-5 flex flex-col gap-1">
                <div className="text-[1.1em]"><strong>Continent: </strong>{destinationDetail.continent}</div>
                <div className="text-[1.1em]"><strong>Langue: </strong>{destinationDetail.language}</div>
                <div className="text-[1.1em]"><strong>Fuseau Horaire: </strong>{destinationDetail.timeZone}</div>
                <div className="text-[1.1em]"><strong>Meilleure saison: </strong>{destinationDetail.bestSeason}</div>
                <div className="text-[1.1em]"><strong>Température moyenne: </strong>{destinationDetail.averageTemperature}°C</div>
                <div className="text-[1.1em]"><strong>Latitude: </strong>{destinationDetail.latitude}</div>
                <div className="text-[1.1em]"><strong>Longitude: </strong>{destinationDetail.longitude}</div>
                <div className="text-[1.1em]"><strong>Note Moyenne: </strong>{destinationDetail.rating}</div>
              </div>
            </motion.div>

            {/* Attractions */}
            <motion.div
              variants={itemVariants}
              className="p-5 flex flex-col bg-white rounded-[10px] shadow-2xl w-[600px] max-[650px]:w-[400px] max-[450px]:w-[300px]"
            >
              <div className="text-[1.3em] flex flex-row items-center gap-2 underline">
                <p className="font-bold">Attractions</p>{" "}
                <i className="fa-solid text-[1.4em] fa-landmark"></i>:
              </div>
              <motion.ul
                variants={containerVariants}
                className="mt-5 flex flex-col gap-2"
              >
                {destinationDetail.attractions.map((at, idx) => (
                  <motion.li key={idx} variants={listItemVariants}>
                    - {at}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Travel Tips */}
            <motion.div
              variants={itemVariants}
              className="p-5 flex flex-col bg-white rounded-[10px] shadow-2xl w-[600px] max-[650px]:w-[400px] max-[450px]:w-[300px]"
            >
              <div className="text-[1.3em] flex flex-row items-center gap-2 underline">
                <p className="font-bold">Conseils de voyage</p>{" "}
                <i className="fa-solid text-[1.4em] fa-campground"></i>
              </div>
              <motion.ul
                variants={containerVariants}
                className="mt-5 flex flex-col gap-2"
              >
                {destinationDetail.travelTips.map((tip, idx) => (
                  <motion.li key={idx} variants={listItemVariants}>
                    - {tip}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Map */}
            <motion.div variants={itemVariants} className="h-96 w-full flex justify-center">
              <iframe
                src={`https://www.google.com/maps?q=${destinationDetail.latitude},${destinationDetail.longitude}&hl=fr&z=14&output=embed`}
                className="w-[600px] h-[400px] max-[700px]:w-[400px] max-[700px]:h-[300px] max-[500px]:w-[300px] max-[500px]:h-[200px] rounded-lg shadow-md"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </motion.div>
          </motion.div>

          <motion.button
           onClick={()=>{
            setFilterTripsData({
              ...filterTripsData,
              country : destinationDetail.country,
              city : destinationDetail.city
            });
            navigate('/trips');
           }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#1B4332] mt-10 px-5 text-white font-[500] h-[40px] rounded-lg mb-10 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
          >
            Voir les voyages vers {destinationDetail.city}
          </motion.button>
        </>
      )}

      {/* Galerie overlay */}
      <AnimatePresence>
        {showGalerie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          >
            <Galerie destination={destinationDetail!} setShowPop={setShowGalerie} />
          </motion.div>
        )}
      </AnimatePresence>

      
      <motion.button
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate(-1)}
        className="absolute top-19 left-5 bg-[#1B4332] text-white w-[90px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 h-[35px] text-[15px] font-[600] rounded-full"
      >
        <i className="fa-solid fa-left-long"></i> Back
      </motion.button>
    </section>
  );
};

export default memo(DestinationDetail);