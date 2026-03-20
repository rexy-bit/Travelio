import { memo, useEffect } from "react";
import { motion } from "framer-motion";
import { useReservationsContext } from "../Contexts/ReservationsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";

import SectionVoyage from "../Components/ReservationDetailsCOmponents/SectionVoyage";
import SectionDestination from "../Components/ReservationDetailsCOmponents/SectionDestination";
import SectionHotel from "../Components/ReservationDetailsCOmponents/SectionHotel";
import SectionPassagers from "../Components/ReservationDetailsCOmponents/SectionPassagers";
import SectionConditions from "../Components/ReservationDetailsCOmponents/SectionConditions";
import SectionResume from "../Components/ReservationDetailsCOmponents/SectionResume";
import ConfianceReservation from "../Components/ReservationDetailsCOmponents/ConfianceReservation";

const ReservationDetails = () => {

  const { getReservationDetails, reservationDetails } = useReservationsContext();
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && id) {
      getReservationDetails(id);
    }
  }, [user, id]);

  // 🔥 Variants pour animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center min-h-screen bg-gray-200"
    >

      {!reservationDetails ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-20 text-center text-gray-700"
        >
          Reservation non trouvée
        </motion.div>
      ) : (
        <>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[1.5em] font-bold mt-15 px-3 text-center"
          >
            Détails de la réservation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-700 text-center px-3 mt-5"
          >
            Consultez toutes les informations de votre voyage et de vos passagers.
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-row justify-center items-baseline gap-5 mt-10 mb-15 max-[900px]:flex-col"
          >

            {/* LEFT SIDE */}
            <div className="flex flex-col gap-5 border-r max-[900px]:pr-0 max-[900px]:border-none border-r-gray-400 pr-4 order-1 max-[900px]:order-2 max-[900px]:mt-5">

              <motion.div variants={item} whileHover={{ scale: 1.02 }}>
                <SectionVoyage reservation={reservationDetails} />
              </motion.div>

              <motion.div variants={item} whileHover={{ scale: 1.02 }}>
                <SectionDestination reservation={reservationDetails} />
              </motion.div>

              <motion.div variants={item} whileHover={{ scale: 1.02 }}>
                <SectionHotel reservation={reservationDetails} />
              </motion.div>

              <motion.div variants={item} whileHover={{ scale: 1.02 }}>
                <SectionPassagers reservation={reservationDetails} />
              </motion.div>

              <motion.div variants={item} whileHover={{ scale: 1.02 }}>
                <SectionConditions reservation={reservationDetails} />
              </motion.div>

            </div>

            {/* RIGHT SIDE */}
            <div className="order-2 max-[900px]:order-1 flex flex-col gap-5 max-[900px]:border-b max-[900px]:border-b-gray-400 max-[900px]:pb-8">
            
                <SectionResume reservation={reservationDetails} />
                <ConfianceReservation/>
              
            </div>

          </motion.div>
        </>
      )}

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
    </motion.section>
  );
};

export default memo(ReservationDetails);