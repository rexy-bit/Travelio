
import {motion} from "framer-motion"

import  { memo } from "react"
import Icon from "../../Icons/Icon";

const ConfianceReservation = () => {

    return(
        <motion.div
  
  whileHover={{ scale: 1.02 }}
 className="w-[400px] max-[450px]:w-[320px] p-3 flex flex-col bg-white shadow-2xl rounded-[10px]"
>
  <h3 className="text-lg font-semibold">
    Pourquoi réserver avec nous ?
  </h3>

  <ul className="flex flex-col gap-3 text-gray-600 text-sm mt-5">
    <li className="flex flex-row gap-2 items-center"><Icon name={"KeySquare"} />  Paiement 100% sécurisé</li>
    <li className="flex flex-row gap-2 items-center"><Icon name="Handshake" /> Agence fiable et vérifiée</li>
    <li className="flex flex-row gap-2 items-center"><Icon name="Phone" /> Support client 24/7</li>
    <li className="flex flex-row gap-2 items-center"><Icon name="Banknote" /> Aucun frais caché</li>
    <li className="flex flex-row gap-2 items-center"><Icon name="ReceiptText" /> Conditions flexibles selon le voyage</li>
  </ul>
</motion.div>
    )
}


export default memo(ConfianceReservation);