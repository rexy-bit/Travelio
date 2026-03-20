import  { memo } from "react"
import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import DestinationCard from "../Components/DestinationsComponents/DestinationCard";

const Favorites = () => {

    const {user} = useAuthContext();

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
    return(
        <section className="flex flex-col min-h-screen items-center bg-gray-200 w-full">
 
             {!user ?
                <div className="flex flex-col justify-center items-center mt-15">
                    <h2 className="text-2xl font-semibold text-center px-3">Vos favoris vous attendent</h2>

                    <p className="text-gray-500 text-center max-w-md px-5 mt-4">
    Connectez-vous pour enregistrer vos destinations préférées et les retrouver à tout moment.
                   </p>

                      <button 
                      onClick={()=>navigate("/profile")}
                      className="bg-green-800/80 font-bold mt-5 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 text-white px-6 py-2 rounded-xl">
                            Se connecter
                        </button>
                </div> 
                : 
                  user.favorites.length === 0
                    ?
                     <div className="flex flex-col justify-center items-center mt-15">
                         <h2 className="text-2xl font-semibold text-center px-3">Aucun favori pour le moment 🌍</h2>

                    <p className="text-gray-500 text-center max-w-md px-5 mt-4">
                       Explorez des destinations et ajoutez-les à vos favoris pour les retrouver facilement.
                   </p>

                      <button 
                      onClick={()=>navigate("/destinations")}
                      className="bg-green-800/80 font-bold mt-5 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 text-white px-6 py-2 rounded-xl">
                             Explorer les destinations
                        </button>
                     </div>

                    : 
                    <>
                       <h2 className="text-2xl font-semibold text-center px-3 mt-15">Vos destinations favorites </h2>

                       <motion.div
        className="flex flex-wrap justify-center items-center gap-10 mt-15 mb-15"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {user.favorites.map((d) => (
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
                    </>
            }
             
        </section>
    )
}

export default memo(Favorites);