import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDestinationsContext } from "../Contexts/DestinationsContext";
import Icon from "../Icons/Icon";
import { useDestinationAdminContext } from "../AdminContexts/DestinationAdminContext";


const DestinationAdminDetails = () => {

    const { id } = useParams();

    const { getDestination, destinationDetail, loadingDestination, setDestinationDetail } = useDestinationsContext();
    const {updateDestination, loadingUpdateDestination} = useDestinationAdminContext();

    useEffect(() => {
        getDestination(id);
    }, []);

    const [imagesFile, setImagesFile] = useState<File[]>([]);
    const [newAttraction, setNewAttraction] = useState<string>("");
    const [newTip, setNewTip] = useState<string>("");

    // ── Gestion des champs simples ──────────────────────────────────────────
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setDestinationDetail({
            ...destinationDetail!,
            [name]: type === "number" ? Number(value) : value
        });
    };

    // ── Attractions ─────────────────────────────────────────────────────────
    const addAttraction = () => {
        if (!newAttraction || newAttraction === "") return;

        setDestinationDetail({
            ...destinationDetail!,
            attractions: [...destinationDetail!.attractions, newAttraction]
        });

        setNewAttraction("");
    };

    const removeAttraction = (index: number) => {
        setDestinationDetail({
            ...destinationDetail!,
            attractions: destinationDetail!.attractions.filter((_, i) => i !== index)
        });
    };

    // ── Conseils de voyage ───────────────────────────────────────────────────
    const addNewTip = () => {
        if (!newTip || newTip === "") return;

        setDestinationDetail({
            ...destinationDetail!,
            travelTips: [...destinationDetail!.travelTips, newTip]
        });

        setNewTip("");
    };

    const removeTip = (index: number) => {
        setDestinationDetail({
            ...destinationDetail!,
            travelTips: destinationDetail!.travelTips.filter((_, i) => i !== index)
        });
    };

    // ── Soumission du formulaire ─────────────────────────────────────────────
    const submitForm = async () => {
      
        console.log("submit function called");

        if (
            !destinationDetail?.city ||
            !destinationDetail.country ||
            !destinationDetail.continent ||
            !destinationDetail.description ||
            !destinationDetail.language ||
            !destinationDetail.timeZone ||
            !destinationDetail.bestSeason ||
            destinationDetail.averageTemperature === undefined ||
            destinationDetail.longitude === undefined ||
            destinationDetail.rating === undefined
        ) {
             console.log("Validation échouée");
            return;}

        const formData = new FormData();

        formData.append("city", destinationDetail.city);
        formData.append("country", destinationDetail.country);
        formData.append("continent", destinationDetail.continent);
        formData.append("description", destinationDetail.description);
        formData.append("language", destinationDetail.language);
        formData.append("timeZone", destinationDetail.timeZone);
        formData.append("bestSeason", destinationDetail.bestSeason);
        formData.append("averageTemperature", String(destinationDetail.averageTemperature));
        formData.append("longitude", String(destinationDetail.longitude));
        formData.append("rating", String(destinationDetail.rating));
        formData.append("attractions", JSON.stringify(destinationDetail.attractions));
        formData.append("travelTips", JSON.stringify(destinationDetail.travelTips));

        // Images existantes conservées
        formData.append("oldImages", JSON.stringify(destinationDetail.images));

        // Nouvelles images uploadées
        imagesFile.forEach((file) => {
            formData.append("images", file);
        });

        await updateDestination(destinationDetail.id, formData);
    };

    return (
        <>
            <header className="flex flex-row w-full h-[50px] justify-between px-5 items-center shadow-2xl bg-white">
                <div className="flex flex-row items-center gap-2 font-bold text-[1.3em] max-[800px]:text-[0.9em] text-[#1B4332]">
                    <Icon name="MapPin" size={27} />
                    <div className="max-[800px]:w-[150px]">
                        {destinationDetail?.city} - {destinationDetail?.country}
                    </div>
                </div>

                <div className="flex flex-row items-center gap-3">
                   

                    <button
                        type="button"
                        className="w-[140px] text-[14px] font-sans bg-yellow-600 text-white font-semibold py-1 rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                    >
                        + Add Destination
                    </button>
                </div>
            </header>

            <section className="flex flex-col items-center bg-gray-200 min-h-screen w-full">

                {loadingDestination
                    ?
                    <p>Chargement de la destination...</p>
                    :
                    !destinationDetail ?
                        <p>Destination non trouvée</p>
                        :
                        <div className="flex flex-col items-center w-full pb-20">

                            <div className="text-[1.3em] font-[600] mt-15 flex flex-col justify-center items-center">
                                Details/Modification de la destination:
                                <div>{destinationDetail.city} - {destinationDetail.country}</div>
                            </div>

                            {/* ── Informations de base ── */}
                            <div className="flex flex-col w-[700px] bg-white p-5 rounded-[10px] mt-10 shadow-2xl max-[800px]:w-[500px] max-[550px]:w-[320px]">
                                <h1 className="text-[1.3em] font-bold underline">Informations de base</h1>

                                <div className="mt-8 flex flex-col gap-1 w-full">
                                    <p className="font-semibold">Ville:</p>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="Ville"
                                        value={destinationDetail.city}
                                        onChange={handleChange}
                                        
                                        className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                                    />
                                </div>

                                <div className="mt-5 flex flex-col gap-1 w-full">
                                    <p className="font-semibold">Pays:</p>
                                    <input
                                        type="text"
                                        name="country"
                                        
                                        value={destinationDetail.country}
                                        onChange={handleChange}
                                        className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                                    />
                                </div>

                                <div className="mt-5 flex flex-col gap-1 w-full">
                                    <p className="font-semibold">Continent:</p>
                                    <select
                                        name="continent"
                                    
                                        value={destinationDetail.continent}
                                        onChange={handleChange}
                                        className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                                    >
                                        <option value="Europe">Europe</option>
                                        <option value="Asie">Asie</option>
                                        <option value="Afrique">Afrique</option>
                                        <option value="Amerique">Amerique</option>
                                        <option value="Australie">Australie</option>
                                    </select>
                                </div>

                                <div className="mt-5 flex flex-col gap-1 w-full">
                                    <p className="font-semibold">Description:</p>
                                    <textarea
                                        name="description"
                                        
                                        className="bg-gray-100 p-2 border border-gray-300 rounded-[5px] h-[200px]"
                                        value={destinationDetail.description}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* ── Informations pratiques ── */}
                            <div className="flex flex-col w-[700px] bg-white p-5 rounded-[10px] mt-10 shadow-2xl max-[800px]:w-[500px] max-[550px]:w-[320px]">
                                <h1 className="text-[1.3em] font-bold underline">Informations Pratiques</h1>

                                <div className="mt-8 flex flex-col gap-1 w-full">
                                    <p className="font-semibold">Langue:</p>
                                    <input
                                        type="text"
                                        name="language"
                                        placeholder="Langue"
                                        
                                        value={destinationDetail.language}
                                        onChange={handleChange}
                                        className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                                    />
                                </div>

                                <div className="mt-5 flex flex-col gap-1 w-full">
                                    <p className="font-semibold">Fuseau Horaire:</p>
                                    <select
                                        name="timeZone"
                                        value={destinationDetail.timeZone}
                                        onChange={handleChange}
                                        className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                                    >
                                        <option value="UTC">UTC (Temps universel)</option>
                                        <option value="Europe/London">Londres (GMT+0)</option>
                                        <option value="Europe/Paris">Paris (GMT+1)</option>
                                        <option value="Europe/Berlin">Berlin (GMT+1)</option>
                                        <option value="Europe/Madrid">Madrid (GMT+1)</option>
                                        <option value="Europe/Rome">Rome (GMT+1)</option>
                                        <option value="Europe/Amsterdam">Amsterdam (GMT+1)</option>
                                        <option value="Europe/Athens">Athènes (GMT+2)</option>
                                        <option value="Europe/Moscow">Moscou (GMT+3)</option>
                                        <option value="Africa/Algiers">Alger (GMT+1)</option>
                                        <option value="Africa/Cairo">Le Caire (GMT+2)</option>
                                        <option value="Africa/Lagos">Lagos (GMT+1)</option>
                                        <option value="Africa/Johannesburg">Johannesburg (GMT+2)</option>
                                        <option value="Africa/Nairobi">Nairobi (GMT+3)</option>
                                        <option value="America/New_York">New York (GMT-5)</option>
                                        <option value="America/Chicago">Chicago (GMT-6)</option>
                                        <option value="America/Denver">Denver (GMT-7)</option>
                                        <option value="America/Los_Angeles">Los Angeles (GMT-8)</option>
                                        <option value="America/Toronto">Toronto (GMT-5)</option>
                                        <option value="America/Mexico_City">Mexico (GMT-6)</option>
                                        <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                                        <option value="America/Argentina/Buenos_Aires">Buenos Aires (GMT-3)</option>
                                        <option value="Asia/Dubai">Dubai (GMT+4)</option>
                                        <option value="Asia/Riyadh">Riyad (GMT+3)</option>
                                        <option value="Asia/Tehran">Téhéran (GMT+3:30)</option>
                                        <option value="Asia/Karachi">Karachi (GMT+5)</option>
                                        <option value="Asia/Kolkata">New Delhi (GMT+5:30)</option>
                                        <option value="Asia/Bangkok">Bangkok (GMT+7)</option>
                                        <option value="Asia/Jakarta">Jakarta (GMT+7)</option>
                                        <option value="Asia/Shanghai">Shanghai (GMT+8)</option>
                                        <option value="Asia/Hong_Kong">Hong Kong (GMT+8)</option>
                                        <option value="Asia/Singapore">Singapour (GMT+8)</option>
                                        <option value="Asia/Seoul">Séoul (GMT+9)</option>
                                        <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                                        <option value="Australia/Perth">Perth (GMT+8)</option>
                                        <option value="Australia/Adelaide">Adélaïde (GMT+9:30)</option>
                                        <option value="Australia/Sydney">Sydney (GMT+10)</option>
                                        <option value="Pacific/Auckland">Auckland (GMT+12)</option>
                                    </select>
                                </div>

                                <div className="mt-5 flex flex-col gap-1 w-full">
                                    <p className="font-semibold">Meilleure saison:</p>
                                    <input
                                        type="text"
                                        
                                        name="bestSeason"
                                        placeholder="Meilleure saison"
                                        value={destinationDetail.bestSeason}
                                        onChange={handleChange}
                                        className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                                    />
                                </div>

                                <div className="mt-5 flex flex-col gap-1 w-full">
                                    <p className="font-semibold">Température moyenne:</p>
                                    <input
                                        type="number"
                                        name="averageTemperature"
                                        
                                        placeholder="°C"
                                        value={destinationDetail.averageTemperature}
                                        onChange={handleChange}
                                        className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                                    />
                                </div>

                                <div className="mt-5 flex flex-col gap-1 w-full">
                                    <p className="font-semibold">Longitude:</p>
                                    <input
                                        type="number"
                                        name="longitude"
                                        
                                        placeholder="Longitude"
                                        value={destinationDetail.longitude}
                                        onChange={handleChange}
                                        className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                                    />
                                </div>

                                <div className="mt-5 flex flex-col gap-1 w-full">
                                    <p className="font-semibold">Note moyenne:</p>
                                    <input
                                        type="number"
                                        name="rating"
                                        placeholder="Note moyenne"
                                        value={destinationDetail.rating}
                                        min={0}
                                        
                                        max={5}
                                        onChange={handleChange}
                                        className="bg-gray-100 p-2 border border-gray-300 rounded-[5px]"
                                    />
                                </div>
                            </div>

                            {/* ── Attractions ── */}
                            <div className="flex flex-col w-[700px] bg-white p-5 rounded-[10px] mt-10 shadow-2xl max-[800px]:w-[500px] max-[550px]:w-[320px]">
                                <h1 className="text-[1.3em] font-bold underline">Attractions:</h1>

                                <ul className="mt-5 flex flex-col gap-7">
                                    {destinationDetail.attractions.map((a, i) => (
                                        <div key={i} className="flex flex-row justify-center items-center gap-10">
                                            <p className="w-[500px]">{a}</p>
                                            <button
                                                type="button"
                                                onClick={() => removeAttraction(i)}
                                                className="text-red-700 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                                            >
                                                <Icon name="Delete" size={30} />
                                            </button>
                                        </div>
                                    ))}
                                </ul>

                                <h2 className="mt-10 font-semibold text-[1.2em]">Ajouter une attraction</h2>
                                <div className="flex flex-row justify-between items-center gap-5 mt-3">
                                    <input
                                        type="text"
                                        value={newAttraction}
                                        placeholder="Entrez votre attraction"
                                        onChange={(e) => setNewAttraction(e.target.value)}
                                        className="p-2 border border-gray-300 rounded-[5px] bg-gray-100 w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={addAttraction}
                                        className="bg-gray-800 text-white font-semibold w-[90px] py-2 rounded-[5px] transition-opacity cursor-pointer duration-200 hover:opacity-80 active:opacity-60"
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </div>

                            {/* ── Conseils de voyage ── */}
                            <div className="flex flex-col w-[700px] bg-white p-5 rounded-[10px] mt-10 shadow-2xl max-[800px]:w-[500px] max-[550px]:w-[320px]">
                                <h1 className="text-[1.3em] font-bold underline">Conseils de voyage:</h1>

                                <ul className="mt-5 flex flex-col gap-7">
                                    {destinationDetail.travelTips.map((a, i) => (
                                        <div key={i} className="flex flex-row justify-center items-center gap-10">
                                            <p className="w-[500px]">{a}</p>
                                            <button
                                                type="button"
                                                onClick={() => removeTip(i)}
                                                className="text-red-700 cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60"
                                            >
                                                <Icon name="Delete" size={30} />
                                            </button>
                                        </div>
                                    ))}
                                </ul>

                                <h2 className="mt-10 font-semibold text-[1.2em]">Ajouter un conseil:</h2>
                                <div className="flex flex-row justify-between items-center gap-5 mt-3">
                                    <input
                                        type="text"
                                        value={newTip}
                                        placeholder="Entrez votre conseil"
                                        onChange={(e) => setNewTip(e.target.value)}
                                        className="p-2 border border-gray-300 rounded-[5px] bg-gray-100 w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={addNewTip}
                                        className="bg-gray-800 text-white font-semibold w-[90px] py-2 rounded-[5px] transition-opacity cursor-pointer duration-200 hover:opacity-80 active:opacity-60"
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </div>

                            {/* ── Images ── */}
                            <div className="flex flex-col w-[700px] max-[800px]:w-[500px] max-[550px]:w-[320px] bg-white p-5 rounded-[10px] mt-10 shadow-2xl">
                                <h1 className="text-[1.3em] font-bold underline">Images:</h1>

                                {/* Images existantes */}
                                <div className="flex flex-wrap gap-5 justify-center items-center mt-5">
                                    {destinationDetail.images.map((image, i) => (
                                        <div key={i} className="relative w-[150px]">
                                            <img src={image} alt="" className="w-[150px] h-[150px] object-cover rounded-[5px]" />
                                            <button
                                                type="button"
                                                className="absolute top-[-10px] right-[-10px] w-[20px] h-[20px] flex justify-center items-center rounded-full bg-red-600 text-white cursor-pointer"
                                                onClick={() => {
                                                    setDestinationDetail({
                                                        ...destinationDetail,
                                                        images: destinationDetail.images.filter((_, idx) => idx !== i)
                                                    });
                                                }}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Nouvelles images (prévisualisation) */}
                                {imagesFile.length > 0 && (
                                    <div className="flex flex-wrap gap-5 justify-center items-center mt-5">
                                        {imagesFile.map((file, idx) => (
                                            <div key={idx} className="relative w-[150px]">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`preview-${idx}`}
                                                    className="w-[150px] h-[150px] object-cover rounded-[5px]"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute top-[-10px] right-[-10px] w-[20px] h-[20px] flex justify-center items-center rounded-full bg-red-600 text-white cursor-pointer"
                                                    onClick={() => {
                                                        setImagesFile(prev => prev.filter((_, i) => i !== idx));
                                                    }}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Input upload */}
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/jpg"
                                    multiple
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setImagesFile(prev => [...prev, ...Array.from(e.target.files!)]);
                                        }
                                    }}
                                    className="mt-8 p-3 border border-gray-300 bg-gray-100 rounded-full cursor-pointer"
                                />
                            </div>

                            {/* ── Bouton de sauvegarde ── */}
                            <button 
                                type="button"
                                onClick={submitForm}
                                className="mt-10 w-[700px] max-[800px]:w-[500px] max-[550px]:w-[320px] bg-[#1B4332] text-white font-semibold py-3 rounded-[5px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60 text-[1em]"
                            >
                                {loadingUpdateDestination ? "Enregistrement..." : "Sauvegarder les modifications"}
                            </button>

                        </div>
                }
            </section>
        </>
    );
};


export default memo(DestinationAdminDetails);


