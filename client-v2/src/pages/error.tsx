export type ErrorStatus = {
    status: string,
    description: string,
    solution: string,
    short_description: string
}

export default function Error(
    {status, description,
        solution, short_description
    } : ErrorStatus
) {
    return (
        <>
        <div className="
        flex 
        justify-center items-center 
        h-screen 
        bg-gray-100 p-4">
            <div className="
            flex 
            w-full max-w-3xl 
            justify-between items-center 
            text-center p-4">
                <div className="
                flex flex-col 
                justify-center items-center 
                w-1/3">
                <h1 className="text-6xl font-black">{status}</h1>
                </div>

        <div className="
        flex flex-col 
        text-justify items-start 
        w-2/3 pl-4">
          <p className="text-lg font-semibold text-gray-700">{short_description}</p>
          <p className="text-md text-gray-600 mt-2">Описание: {description}</p>
          <p className="text-md text-green-600 mt-4">Решение: {solution}</p>
        </div>
      </div>
    </div>
    </>
    )
}