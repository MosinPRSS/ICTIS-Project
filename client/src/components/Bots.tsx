import { Button } from "./ui/button";

export default function Bots() {
    return (
        <div className="grid grid-cols-4 gap-4 mt-5">
            {[...Array(32)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg overflow-hidden">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/900)' }}></div>
                <div className="p-4 bg-gray-100">
                  <p className="text-sm text-black">Описание</p>
                </div>
              </div>
            ))}
        </div>
    )
}