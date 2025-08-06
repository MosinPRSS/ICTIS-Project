import { RandomStrings } from "../../../utils/data"


export default function SearchBox() {
    const GetRandom = (max: number) => {
        return Math.floor(Math.random() * max)
    }

    return (
        <>
        <div className="w-5/7 p-4 bg-transparent relative z-10">
            <input type="text" placeholder={RandomStrings[GetRandom(
                RandomStrings.length
            )]} className="
            w-full 
            py-1
            px-2
            rounded-sm
            bg-white
            transition
            duration-300
            hover:shadow-xl/10
            focus:shadow-xl/50
            focus:outline-0
            " />
        </div>
        <div>

        </div>
        </>
    )
}