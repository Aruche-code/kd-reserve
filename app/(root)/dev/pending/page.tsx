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

    return (
        <div className="flex flex-col justify-center items-center">
            {testUsers.map(user => (
                <div className="w-1/2">
                    <Link href="../dev/record" key={user.id}>
                        <button className="mt-5 p-3 w-full border-2 border-gray-100 shadow-md rounded-lg">
                            <div className="text-xl">
                                {user.name}<br />
                            </div>

                            1.希望日時：{user.day1}　{user.time1}<br />
                            2.希望日時：{user.day2}　{user.time2}<br />
                            3.希望日時：{user.day3}　{user.time3}<br />

                        </button>
                    </Link>
                </div>
            ))}
        </div>
    );

}

export default Pending;