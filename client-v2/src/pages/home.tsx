import login from "../api/auth";
import MainBar from "../components/home-mainbar";
import SearchBox from "../components/mainbar-components/search-field";
import SideBar from "../components/home-sidebar";

export default function Home() {
    return (
        <>
        <div className="flex h-screen">
                <div className="">
                    <SideBar />
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="w-full h-16 flex items-center bg-gray-100 shadow-sm">
                        <SearchBox />
                    </div>

                    <div className="flex-1 p-4 overflow-auto bg-gray-100">
                        <MainBar />
                    </div>
                </div>
            </div>
        </>
    )   
}