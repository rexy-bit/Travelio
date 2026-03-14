import { memo } from "react"
import { useDestinationsContext } from "../Contexts/DestinationsContext";
import { motion } from "framer-motion"
import DestinationCard from "../Components/DestinationsComponents/DestinationCard";
import { useNavigate } from "react-router-dom";


const SearchDestinations = () => {


    const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
};

      const navigate = useNavigate();


    const {searchDestinationsInput, searchDestinationsResult} = useDestinationsContext();
    return(
        <section className="min-h-screen flex flex-col items-center bg-gray-200">

           <div className="flex flex-col gap-5 mt-15">
            <div className="text-[17px]">Resultat de recherche pour : <strong className="text-[1.3em]">{searchDestinationsInput}</strong></div>

             <motion.div
        className="flex flex-wrap justify-center items-center gap-10 mb-15 mt-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {searchDestinationsResult.map((d) => (
          <motion.div
            key={d.id}
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0 25px 40px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.97 }}
          >
            <DestinationCard destination={d} />
          </motion.div>
        ))}
      </motion.div>
           </div>

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
    )
}

export default memo(SearchDestinations); 

