import React from "react";

const homest = () => {
    return (

        <div className="bg-white h-screen w-full flex flex-row">

            <div className="flex flex-col mt-10 w-1/2">

                <div className="bg-blue-400 p-2 ml-5 border-4 border-blue-400 rounded-lg text-white">
                    予約一覧
                </div>
                <div className="flex flex-col p-4 ml-5">

                    <div className="mt-5 ml-4 mr-4 p-2 border-2 border-gray-400 rounded-lg flex flex-row">

                        <div className="w-4/5 flex flex-row">
                            <div className="w-1/3 px-3 flex flex-col items-center justify-center font-medium">
                                <div>2023/12/3</div>
                                <div className="">12:00~13:00</div>
                            </div>
                            <div className="w-1/3 border-x-2 border-gray-200 px-3 flex items-center justify-center font-medium">
                                ○○先生
                            </div>
                            <div className="w-1/3 px-3 flex items-center justify-center font-medium">
                                面接練習
                            </div>
                        </div>

                        <div className="w-1/5 flex items-center justify-center">
                            <button type="button" className="rounded-lg bg-red-400 px-2 p-1 text-xs font-medium">キャンセル</button>
                        </div>
                    </div>

                    <div className="mt-5 ml-4 mr-4 p-2 border-2 border-gray-400 rounded-lg flex flex-row">

                        <div className="w-4/5 flex flex-row">
                            <div className="w-1/3 px-3 flex flex-col items-center justify-center font-medium">
                                <div>2023/12/3</div>
                                <div className="">12:00~13:00</div>
                            </div>
                            <div className="w-1/3 border-x-2 border-gray-200 px-3 flex items-center justify-center font-medium">
                                ○○先生
                            </div>
                            <div className="w-1/3 px-3 flex items-center justify-center font-medium">
                                面接練習
                            </div>
                        </div>

                        <div className="w-1/5 flex items-center justify-center">
                            <button type="button" className="rounded-lg bg-red-400 px-2 p-1 text-xs font-medium">キャンセル</button>
                        </div>
                    </div>

                </div>

            </div>



            <div className="flex flex-col mt-10 w-1/2">

                <div className="bg-orange-300 p-2 ml-5 border-4 border-orange-300 rounded-lg text-white">
                    承認待ち
                </div>
                <div className="flex flex-col p-4 ml-5">

                    <div className="mt-5 ml-4 mr-4 p-2 border-2 border-gray-400 rounded-lg flex flex-row">

                        <div className="w-4/5 flex flex-row">
                            <div className="w-1/3 px-3 flex flex-col items-center justify-center font-medium">
                                <div>2023/12/3</div>
                                <div className="">12:00~13:00</div>
                            </div>
                            <div className="w-1/3 border-x-2 border-gray-200 px-3 flex items-center justify-center font-medium">
                                ○○先生
                            </div>
                            <div className="w-1/3 px-3 flex items-center justify-center font-medium">
                                面接練習
                            </div>
                        </div>

                        <div className="w-1/5 flex items-center justify-center">
                            <button type="button" className="rounded-lg bg-red-400 px-2 p-1 text-xs font-medium">キャンセル</button>
                        </div>
                    </div>

                    <div className="mt-5 ml-4 mr-4 p-2 border-2 border-gray-400 rounded-lg flex flex-row">

                        <div className="w-4/5 flex flex-row">
                            <div className="w-1/3 px-3 flex flex-col items-center justify-center font-medium">
                                <div>2023/12/3</div>
                                <div className="">12:00~13:00</div>
                            </div>
                            <div className="w-1/3 border-x-2 border-gray-200 px-3 flex items-center justify-center font-medium">
                                ○○先生
                            </div>
                            <div className="w-1/3 px-3 flex items-center justify-center font-medium">
                                面接練習
                            </div>
                        </div>

                        <div className="w-1/5 flex items-center justify-center">
                            <button type="button" className="rounded-lg bg-red-400 px-2 p-1 text-xs font-medium">キャンセル</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default homest