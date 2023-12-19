import Link from "next/link";
import React from "react";

const Hometeacher = () => {

    const testUsers = [
        {
            id: '601b92ee95861639c3e2c44b',
            kana: 'コウベタロウ',
            name: '神戸太郎',
            gakuseki: '1111111',
            day: '2023/12/3',
            time: '10:00~12:00',
            subject: '面接練習'
        },
        {
            id: '601b95a595861639c3e2c44c',
            kana: 'コウベジロウ',
            name: '神戸次郎',
            gakuseki: '2222222',
            day: '2023/12/3',
            time: '13:00~14:00',
            subject: 'エントリーシート作成'
        },
    ];

    return (

        <div className="flex flex-row items-center justify-center">

            <div className="flex flex-col mt-10 w-full lg:w-1/2  bg-gray-100 rounded-md shadow-md p-1">

                <div className="p-2 mx-4 mt-2 rounded-lg text-gray-600">
                    ■ 本日の予定
                </div>
                <div className="mt-1 mb-1 flex-grow border-b border-gray-400" ></div>
                <div className="mt-3 mb-3">
                    {testUsers.map(user => (
                        <div className="flex flex-col p-2" key={user.id}>

                            <Link href="../dev/record">
                                <div className="mx-4 p-2 border-2 border-gray-200 bg-white rounded-lg flex flex-row">

                                    <div className="w-full flex flex-row text-center items-center justify-center text-xs md:text-base lg:text-sm xl:text-base">

                                        <div className="w-1/3 px-3">
                                            {user.time}
                                        </div>
                                        <div className="w-1/3 px-3">
                                            {user.gakuseki}<br />
                                            {user.name}
                                        </div>
                                        <div className="w-1/3 px-3">
                                            {user.subject}
                                        </div>
                                    </div>
                                </div>

                            </Link>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Hometeacher