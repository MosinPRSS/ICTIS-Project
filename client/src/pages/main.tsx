function MainPage() {
    return (
    <div className="flex gap-[2%] flex-wrap content-start">
        <div className="w-full h-[10%] bg-purple-700">
            <div className="w-full h-[10%] bg-purple-700 flex items-center p-4">
                <div className="bg-white p-2 rounded">
                    <p className="">ARI-AI</p>
                </div>
            </div>
        </div>
        <div className="w-1/4 h-3/4 bg-purple-600">
            sidebar
        </div>
        <div className="grow h-3/4 bg-purple-800">Content</div>
      </div>
    );
}

export default MainPage;