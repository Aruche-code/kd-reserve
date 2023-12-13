import React from "react";
import Link from "next/link";

const Pending = () => {
    const testUsers = [
        {
            id: '601b92ee95861639c3e2c44b',
            kana: 'コウベタロウ',
            name: '神戸太郎',
            day1: '2023/12/3',
            time1: '10:00~12:00',
            day2: '2023/12/4',
            time2: '10:00~12:00',
            day3: '2023/12/5',
            time3: '10:00~13:00'
        },
        {
            id: '601b95a595861639c3e2c44c',
            kana: 'コウベジロウ',
            name: '神戸次郎',
            day1: '2023/12/3',
            time1: '10:00~12:00',
            day2: '2023/12/4',
            time2: '10:00~12:00',
            day3: '2023/12/5',
            time3: '10:00~13:00'
        },
        {
            id: '601b95a595861639c3e2c44c',
            kana: 'コウベサブロウ',
            name: '神戸三郎',
            day1: '2023/12/3',
            time1: '10:00~12:00',
            day2: '2023/12/4',
            time2: '10:00~12:00',
            day3: '2023/12/5',
            time3: '10:00~13:00'
        },
        {
            id: '601b95a595861639c3e2c44c',
            kana: 'コウベシロウ',
            name: '神戸四郎',
            day1: '2023/12/3',
            time1: '10:00~12:00',
            day2: '2023/12/4',
            time2: '10:00~12:00',
            day3: '2023/12/5',
            time3: '10:00~13:00'
        }
    ];
    const testUsers2 = [
        {
            id: '601b92ee95861639c3e2c44b',
            kana: 'コウベゴロウ',
            name: '神戸五郎',
            day1: '2023/12/3',
            time1: '10:00~12:00',
            day2: '2023/12/4',
            time2: '10:00~12:00',
            day3: '2023/12/5',
            time3: '10:00~13:00'
        }
    ];

    return (

        <div className="flex flex-wrap text-xs md:text-base">
            <div className="flex flex-col mt-10 w-full lg:w-1/2">

                <div className="bg-blue-400 p-2 mx-4 border-4 border-blue-400 rounded-lg text-white">
                    指名あり
                </div>
                {testUsers.map(user => (
                    <div className="mt-2">
                        <Link href="" key={user.id}>
                            <div className="flex items-center justify-center">
                                <button className="mt-5 p-3 w-5/6 border-2 border-gray-100 shadow-md rounded-lg hover:border-2 hover:border-blue-300">
                                    <div className="text-base md:text-xl">
                                        {user.name}<br />
                                    </div>

                                    1.　{user.day1}　{user.time1}<br />
                                    2.　{user.day2}　{user.time2}<br />
                                    3.　{user.day3}　{user.time3}<br />

                                </button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="flex flex-col mt-10 w-full lg:w-1/2">

                <div className="bg-orange-300 p-2 mx-4 border-4 border-orange-300 rounded-lg text-white">
                    指名なし
                </div>
                {testUsers2.map(user => (
                    <div className="mt-2">
                        <Link href="" key={user.id}>
                            <div className="flex items-center justify-center">
                                <button className="mt-5 p-3 w-5/6 border-2 border-gray-100 shadow-md rounded-lg hover:border-2 hover:border-orange-200">
                                    <div className="text-base md:text-xl">
                                        {user.name}<br />
                                    </div>

                                    1.　{user.day1}　{user.time1}<br />
                                    2.　{user.day2}　{user.time2}<br />
                                    3.　{user.day3}　{user.time3}<br />

                                </button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );

}

export default Pending;