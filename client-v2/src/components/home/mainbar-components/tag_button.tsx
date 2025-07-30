export default function tagButton({
    name, amount, isClicked
}) {

    return (
        <>
        <div className="flex bg-gray-600 rounded-sm hover:shadow-xl/20">
            <div className="flex items-center justify-center w-3/4">
                <p className="bg-white">{name}</p>
            </div>
        </div>
        </>
    )
}