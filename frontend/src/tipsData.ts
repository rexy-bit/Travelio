// data/tipsData.ts

import type { TipsBlockData } from "./Contexts/Types";



export const tipsData: Record<string, TipsBlockData> = {
  reservations: {
    title: "Conseils pour vos réservations",
    description: "Optimisez vos réservations et évitez les mauvaises surprises.",
    tips: [
      { icon: "CalendarCheck", text: "Réservez à l’avance pour payer moins cher" },
      { icon: "CreditCard", text: "Vérifiez les frais cachés" },
      { icon: "FileText", text: "Lisez les conditions d’annulation" },
      { icon: "Clock", text: "Évitez les périodes de forte demande" }
    ]
  },

  trips: {
    title: "Choisir le bon voyage",
    description: "Trouvez un voyage adapté à vos envies.",
    tips: [
      { icon: "MapPin", text: "Choisissez selon la saison" },
      { icon: "Compass", text: "Comparez plusieurs offres" },
      { icon: "Users", text: "Adaptez à votre style de voyage" },
      { icon: "Star", text: "Regardez les avis clients" }
    ]
  },

  destinations: {
    title: "Explorer une destination",
    description: "Préparez votre séjour efficacement.",
    tips: [
      { icon: "Globe", text: "Apprenez la culture locale" },
      { icon: "CloudSun", text: "Consultez la météo" },
      { icon: "Map", text: "Repérez les lieux importants" },
      { icon: "ShieldCheck", text: "Vérifiez la sécurité" }
    ]
  },

  profile: {
    title: "Optimisez votre expérience",
    description: "Utilisez toutes les fonctionnalités du site.",
    tips: [
      { icon: "Heart", text: "Ajoutez des favoris" },
      { icon: "User", text: "Complétez votre profil" },
      { icon: "BarChart", text: "Suivez vos statistiques" },
      { icon: "Search", text: "Explorez régulièrement" }
    ]
  }
};