import { memo } from "react"


const SearchDestinationsComponent = () => {

    return(

        <header className="h-[55px] bg-green-700/80 w-full flex justify-center items-center fixed top-[60px] z-20">
            <form className="flex flex-row justify-center items-center gap-5 max-[450px]:gap-2">
                <input 
                type="text" 
                name="search"
                className="bg-gray-100 w-[500px] h-[40px] p-2 rounded-[10px] text-[15px] max-[700px]:w-[300px] max-[450px]:w-[200px]"
                placeholder="Ville, Pays, Continent.."
                
                />

                <button className="bg-gray-900 text-white w-[50px] h-[40px] rounded-[10px] text-[20px] cursor-pointer transition-opacity duration-200 hover:opacity-80 active:opacity-60">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </header>
    )
}

export default memo(SearchDestinationsComponent);