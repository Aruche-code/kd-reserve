import React from "react";
import Link from "next/link";

const Students = () => {
    const testUsers = [
        {
            id: '601b92ee95861639c3e2c44b',
            kana: 'コウベタロウ',
            name: '神戸太郎',
            number: '1111111',
            email: 'john@example.com'
        },
        {
            id: '601b95a595861639c3e2c44c',
            kana: 'コウベジロウ',
            name: '神戸次郎',
            number: '2222222',
            email: 'jane@example.com'
        },
        {
            id: '601b95a595861639c3e2c44c',
            kana: 'コウベサブロウ',
            name: '神戸三郎',
            number: '3333333',
            email: 'jane@example.com'
        },
        {
            id: '601b95a595861639c3e2c44c',
            kana: 'コウベシロウ',
            name: '神戸四郎',
            number: '4444444',
            email: 'jane@example.com'
        },
        {
            id: '601b95a595861639c3e2c44c',
            kana: 'コウベゴロウ',
            name: '神戸五郎',
            number: '5555555',
            email: 'jane@example.com'
        },
        {
            id: '601b95a595861639c3e2c331',
            kana: 'コウベロクロウ',
            name: '神戸六郎',
            number: '6666666',
            email: 'jane@example.com'
        }
    ];

    return (
        <div className="flex flex-col">
            <div className="p-5">

                <div className="relative flex justify-end">
                    <div className="w-20px bg-green-100 rounded-full">
                        <div className="absolute right-60 top-3 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                    <input className="w-20px rounded-full hover:shadow-lg focus:shadow-lg focus:outline-0 p-2.5 px-6 border pl-10" type="text" placeholder="検索" />
                </div>

            </div>

            <div className="">
                {testUsers.map(user => (
                    <Link href="../dev/record">
                        <button
                            key={user.id}
                            className={'mt-5 ml-10 px-8 p-5 border-2 border-gray-100 shadow-md rounded-lg hover:border-4 hover:border-blue-300'}
                        >
                            {user.name}<br />
                            学籍番号：{user.number}
                        </button>
                    </Link>
                ))
                }
            </div >
        </div>
    );
}

export default Students;
