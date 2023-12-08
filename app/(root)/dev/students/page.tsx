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
        <div className="">
            {testUsers.map(user => (
                <Link href="../dev/record">
                    <button
                        key={user.id}
                        className={'mt-5 ml-10 w-1/5 p-3 border-2 border-gray-100 shadow-md rounded-lg'}
                    >
                        {user.name}<br />
                        学籍番号：{user.number}
                    </button>
                </Link>
            ))
            }
        </div >
    );
}

export default Students;
