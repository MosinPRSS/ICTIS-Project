import { RandomStrings } from "../../../utils/data.tsx"


export default function SearchBox() {
    const GetRandom = (max: number) => {
        return Math.floor(Math.random() * max)
    }

    return (
        <>
        <div className="w-2/8 p-4 bg-transparent relative z-10">
            <input type="text" placeholder={RandomStrings[GetRandom(
                RandomStrings.length
            )]} className="
            flex
            w-full 
            py-1
            px-2
            rounded-sm
            bg-white
            text-center
            text-gray-400
            transition
            duration-300
            hover:shadow-sm
            focus:text-black
            focus:shadow-sm/50
            focus:outline-0
            " />
        </div>
        <div>

        </div>
        </>
    )
}