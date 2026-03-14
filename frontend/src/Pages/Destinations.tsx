import { memo } from "react"
import { motion } from "framer-motion"
import { useDestinationsContext } from "../Contexts/DestinationsContext";
import DestinationCard from "../Components/DestinationsComponents/DestinationCard";
import SearchDestinationsComponent from "../Components/DestinationsComponents/SearchDestinationsComponent";

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

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Destinations = () => {
  const { destinations } = useDestinationsContext();

  return (
    <section className="w-full flex flex-col min-h-screen items-center bg-gray-200">
 <SearchDestinationsComponent/>
      <motion.h1
        className="mt-25 text-[1.4em] font-bold underline"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Découvrez nos destinations
      </motion.h1>

      {/* Bloc texte en cascade */}
      <motion.div
        className="flex flex-col items-center justify-center w-[900px] max-[1000px]:w-[500px] max-[550px]:w-[300px] mt-10 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={textVariants} className="text-center text-[1.1em]">
          Explorez des <strong>villes incroyables</strong> et des lieux fascinants à
          travers le monde. Que vous rêviez de <strong>plages paradisiaques</strong>,
          de <strong>capitales culturelles</strong> ou de
          <strong> paysages naturels spectaculaires</strong>,
          Travelio vous aide à trouver la
          <strong> destination parfaite</strong> pour votre prochain voyage.
        </motion.div>

        <motion.div variants={textVariants} className="text-center">
          Chaque destination propose des <strong>expériences uniques</strong> :
          découvrir de nouvelles cultures, explorer des
          <strong> monuments historiques</strong>, goûter à des
          <strong> spécialités locales</strong> ou simplement profiter d'un
          <strong> moment de détente</strong> dans un cadre exceptionnel.
        </motion.div>

        <motion.div variants={textVariants} className="text-center">
          Parcourez nos destinations, laissez-vous inspirer et
          <strong> commencez à planifier votre prochaine aventure</strong>
          {" "}avec Travelio.
        </motion.div>
      </motion.div>

      {/* Cards en cascade */}
      <motion.div
        className="flex flex-wrap justify-center items-center gap-10 mt-15 mb-15"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {destinations.map((d) => (
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

    </section>
  );
};

export default memo(Destinations);