import { memo } from "react"
import { useTripsContext } from "../Contexts/TripsContext";
import TripCard from "../Components/TripsComponents/TripCard";
import FilterTripsComponent from "../Components/TripsComponents/FilterTripsComponent";
import { motion, AnimatePresence } from "framer-motion";
import TipsBlock from "../Components/TripsComponents/TipsBlock";
import { tipsData } from "../tipsData";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit:   { opacity: 0, scale: 0.8, transition: { duration: 0.15 } }
};

const Trips = () => {
  const { trips, loadingTrips, filterTripsData, setFilterTripsData, resetFilterTrips } = useTripsContext();

  return (
    <section className="flex flex-col items-center min-h-screen bg-gray-200">
<motion.div
  className="bg-green-700/90 w-full flex flex-col justify-center items-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <motion.h1
    className="mt-10 text-[2em] font-bold text-white text-center px-5"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    Explorez le monde avec Travelio
  </motion.h1>

  <div className="flex flex-row justify-center items-center px-10 mt-15 mb-20 gap-20 max-[950px]:gap-10 max-[800px]:flex-col">
    <motion.p
      className="w-[400px] text-white text-[1.1em] font-[600] max-[950px]:w-[300px] max-[800px]:text-center"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      Trouvez le voyage parfait parmi nos destinations et préparez-vous à vivre une expérience inoubliable.
      Explorez des paysages à couper le souffle, découvrez des cultures authentiques et laissez-vous guider vers des aventures uniques qui resteront gravées dans votre mémoire.
    </motion.p>

    <motion.img
      src="https://res.cloudinary.com/dub4fhabm/image/upload/v1773414703/69f7138b-3a85-4696-b798-2bcd63c73806.png"
      className="w-[400px] max-[500px]:w-[300px]"
      alt=""
      initial={{ opacity: 0, x: 40, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    />
  </div>
</motion.div>

      <div className="flex flex-col min-h-screen w-full bg-[#F1E1C6] items-center">
        <FilterTripsComponent />

        {/* Badges filtres */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
          <AnimatePresence>
            {filterTripsData.city !== "" && (
              <motion.div
                key="badge-city"
                variants={badgeVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                onClick={() => setFilterTripsData({ ...filterTripsData, city: "" })}
                className="flex flex-row items-center justify-between gap-5 bg-gray-100 px-2 py-1 rounded-[5px] font-[500] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
              >
                <p>{filterTripsData.city}</p>
                <div>&times;</div>
              </motion.div>
            )}

            {filterTripsData.country !== "" && (
              <motion.div
                key="badge-country"
                variants={badgeVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                onClick={() => setFilterTripsData({ ...filterTripsData, country: "" })}
                className="flex flex-row items-center justify-between gap-5 bg-gray-100 px-2 py-1 rounded-[5px] font-[500] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
              >
                <p>{filterTripsData.country}</p>
                <div>&times;</div>
              </motion.div>
            )}

            {filterTripsData.duree !== 0 && (
              <motion.div
                key="badge-duree"
                variants={badgeVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                onClick={() => setFilterTripsData({ ...filterTripsData, duree: 0 })}
                className="flex flex-row items-center gap-5 bg-gray-100 px-2 py-1 rounded-[5px] font-[500] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
              >
                <p>Duree {filterTripsData.duree} J</p>
                <div>&times;</div>
              </motion.div>
            )}

            {filterTripsData.maxPrice > filterTripsData.minPrice && (
              <motion.div
                key="badge-price"
                variants={badgeVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                onClick={() => setFilterTripsData({ ...filterTripsData, maxPrice: 0, minPrice: 0 })}
                className="flex flex-row items-center justify-between gap-5 bg-gray-100 px-2 py-1 rounded-[5px] font-[500] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
              >
                <p>Price: {filterTripsData.minPrice}-{filterTripsData.maxPrice}</p>
                <div>&times;</div>
              </motion.div>
            )}

            {(filterTripsData.city !== "" || filterTripsData.country !== "" || filterTripsData.duree !== 0 || filterTripsData.minPrice !== 0 || filterTripsData.maxPrice !== 0) && (
              <motion.div
                key="badge-reset"
                variants={badgeVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                onClick={resetFilterTrips}
                className="flex flex-row items-center justify-between gap-5 bg-gray-100 px-2 py-1 rounded-[5px] font-[500] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
              >
                <i className="fa-solid fa-arrow-rotate-left"></i> Reset Filters
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <TipsBlock data={tipsData.trips}/>

        {/* Trips grid */}
        <AnimatePresence mode="popLayout">
          {loadingTrips ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-center items-center gap-2 mt-5"
            >
              <i className="fa-solid fa-plane fa-spin text-[1.3em]"></i>
              <p className="text-[16px] font-[500]">Chargement des Voyages</p>
            </motion.div>
          ) : trips.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[19px] font-[500] mt-5"
            >
              Aucun voyage trouvé
            </motion.div>
          ) : (
           <motion.div
  key="trips-grid"
  variants={containerVariants}
  initial="hidden"
  animate="show"
  className="flex flex-wrap justify-center items-center mt-5 gap-10 mb-15"
>

  <AnimatePresence mode="popLayout">
    
    {trips.map((t) => (
      <TripCard key={t.id} trip={t} />
    ))}
  </AnimatePresence>
</motion.div>
          )}

          
        </AnimatePresence>
      </div>

      
    </section>
  );
};

export default memo(Trips);