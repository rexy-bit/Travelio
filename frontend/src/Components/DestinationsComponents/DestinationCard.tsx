import { memo } from 'react';
import { motion } from 'framer-motion';
import type { Destination } from '../../Contexts/Types';
import { useNavigate } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
};

const DestinationCard = ({ destination }: { destination: Destination }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className='relative h-[300px] w-[320px] rounded-xl overflow-hidden group cursor-pointer shadow-lg'
      style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
      onClick={() => navigate(`/destination/${destination.id}`)}
    >
      <img
        src={destination.images[0]}
        alt={`${destination.city} ${destination.country}`}
        className='w-full h-full object-cover'
      />

      {/* Overlay animé au hover */}
      <motion.div
        className='absolute inset-0 bg-gradient-to-t from-black/80 to-black/10'
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Contenu bas de carte */}
      <motion.div
        className='absolute flex flex-row justify-between w-full p-3 inset-0 flex items-end'
        initial={{ y: 5, opacity: 0.8 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div></div>
        <div className='flex flex-row text-white items-center gap-2'>
          <h3 className='text-[1.1em] font-bold'>
            {destination.city},
          </h3>
          <p className='text-[1em] font-[500]'>
            {destination.country}
          </p>
          <motion.button
            
            whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.93 }}
            transition={{ duration: 0.15 }}
            className='bg-black/80 w-[90px] h-[35px] rounded-lg cursor-pointer font-bold text-[13px] text-white'
          >
            Explorer →
          </motion.button>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default memo(DestinationCard);