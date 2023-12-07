import React from "react";

const homest = () => {
    return (
        <div className="flex flex-row p-4 place-content-center">
            <div className="mt-5 mr-3 w-1/2 p-3 border-2 border-gray-400 rounded-lg flex flex-row">

                <div className="w-5/6 flex flex-row">
                    <div className="w-1/3 px-3 font-medium">
                        2023/12/3<br />
                        12:00~13:00
                    </div>
                    <div className="w-1/3 border-x-2 border-gray-200 px-3 flex items-center justify-center font-medium">
                        ○○先生
                    </div>
                    <div className="w-1/3 px-3 flex items-center justify-center font-medium">
                        面接練習
                    </div>
                </div>

                <div className="w-1/6 flex items-center justify-center">
                    <button type="button" className="rounded-lg bg-red-400 px-2 p-1 text-xs font-medium">キャンセル</button>
                </div>
            </div>
        </div>

    );
}

export default homest