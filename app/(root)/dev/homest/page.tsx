import React from "react";

const homest = () => {
    return (

        <div className="flex flex-row flex-wrap ">

            <div className="flex flex-col mt-10 w-full lg:w-1/2">

                <div className="bg-blue-400 p-2 mx-4 border-4 border-blue-400 rounded-lg text-white">
                    予約確定一覧
                </div>

                <div className="flex flex-col p-4">

                    <div className="mt-5 mx-4 p-2 border-2 border-gray-400 rounded-lg flex flex-row">

                        <div className="w-4/5 flex flex-row text-center items-center justify-center font-medium text-xs md:text-base lg:text-sm xl:text-base">
                            <div className="w-1/3 px-3 flex flex-col">
                                <div>2023/12/3</div>
                                <div className="">12:00~13:00</div>
                            </div>
                            <div className="w-1/3 border-x-2 border-gray-200 px-3">
                                ○○先生
                            </div>
                            <div className="w-1/3 px-3">
                                面接練習
                            </div>
                        </div>

                        <div className="w-1/5 flex items-center justify-center">
                            <button type="button" className="rounded-lg bg-red-300 px-2 p-1 text-[8px] md:text-xs font-medium hover:bg-red-500 hover:text-white">キャンセル</button>
                        </div>
                    </div>

                    <div className="mt-5 ml-4 mr-4 p-2 border-2 border-gray-400 rounded-lg flex flex-row">

                        <div className="w-4/5 flex flex-row text-center items-center justify-center font-medium text-xs md:text-base lg:text-sm xl:text-base">
                            <div className="w-1/3 px-3 flex flex-col">
                                <div>2023/12/3</div>
                                <div className="">12:00~13:00</div>
                            </div>
                            <div className="w-1/3 border-x-2 border-gray-200 px-3">
                                ○○先生
                            </div>
                            <div className="w-1/3 px-3">
                                面接練習
                            </div>
                        </div>

                        <div className="w-1/5 flex items-center justify-center">
                            <button type="button" className="rounded-lg bg-red-300 px-2 p-1 text-[8px] md:text-xs font-medium hover:bg-red-500 hover:text-white">キャンセル</button>
                        </div>
                    </div>

                </div>

            </div>



            <div className="flex flex-col mt-10 w-full lg:w-1/2">

                <div className="bg-orange-300 p-2 mx-4 border-4 border-orange-300 rounded-lg text-white">
                    承認待ち
                </div>
                <div className="flex flex-col p-4">

                    <div className="mt-5 mx-4 p-2 border-2 border-gray-400 rounded-lg flex flex-row">

                        <div className="w-4/5 flex flex-row text-center items-center justify-center font-medium text-xs md:text-base lg:text-sm xl:text-base">
                            <div className="w-1/3 px-3 flex flex-col">
                                <div>2023/12/3</div>
                                <div className="">12:00~13:00</div>
                            </div>
                            <div className="w-1/3 border-x-2 border-gray-200 px-3">
                                ○○先生
                            </div>
                            <div className="w-1/3 px-3">
                                面接練習
                            </div>
                        </div>

                        <div className="w-1/5 flex items-center justify-center">
                            <button type="button" className="rounded-lg bg-red-300 px-2 p-1 text-[8px] md:text-xs font-medium hover:bg-red-500 hover:text-white">キャンセル</button>
                        </div>
                    </div>

                    <div className="mt-5 ml-4 mr-4 p-2 border-2 border-gray-400 rounded-lg flex flex-row">

                        <div className="w-4/5 flex flex-row text-center items-center justify-center font-medium text-xs md:text-base lg:text-sm xl:text-base">
                            <div className="w-1/3 px-3 flex flex-col">
                                <div>2023/12/3</div>
                                <div className="">12:00~13:00</div>
                            </div>
                            <div className="w-1/3 border-x-2 border-gray-200 px-3">
                                ○○先生
                            </div>
                            <div className="w-1/3 px-3">
                                面接練習
                            </div>
                        </div>

                        <div className="w-1/5 flex items-center justify-center">
                            <button type="button" className="rounded-lg bg-red-300 px-2 p-1 text-[8px] md:text-xs font-medium hover:bg-red-500 hover:text-white">キャンセル</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default homest