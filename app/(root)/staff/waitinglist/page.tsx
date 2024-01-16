"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { Staff, StaffNgData } from "@/app/components/types";
import { toast } from "react-hot-toast";

interface selectedUser {

    testUsers: {
        id: string;
        kana: string;
        name: string;
        day1: string;
        time1: string;
        day2: string;
        time2: string;
        day3: string;
        time3: string;

    };
    testUsers2: {
        id: string;
        kana: string;
        name: string;
        day1: string;
        time1: string;
        day2: string;
        time2: string;
        day3: string;
        time3: string;
    };
}

interface TimeSelectMenuProps {
    firsttime: string;
    endtime: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);


const selectedUser: React.FC<selectedUser> = ({ testUsers, testUsers2 }) => {

    // 選択されたオプションと時間を管理するためのState
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedTimes, setSelectedTimes] = useState<string[]>(["", "", ""]);


    // 選択されたオプションに基づいて使用するデータセットを判断
    const selectedData = selectedOption === "firstChoice" ? testUsers : testUsers2;



    return (
        <div className="">

        </div >
    );
};


const Waiting = () => {

    //モーダルウィンドウ
    // const [showModal, setShowModal] = useState(false);
    // const [showModal2, setShowModal2] = useState(false);


    // ユーザーの型を定義
    interface User {
        id: string;
        kana: string;
        name: string;
        details: string;
        day1: string;
        firsttime1: string;
        endtime1: string;
        day2: string;
        firsttime2: string;
        endtime2: string;
        day3: string;
        firsttime3: string;
        endtime3: string;
    }
    const [nowUser, setNowUser] = useState<User[]>([]);

    //状態の管理
    const [timeRanges, setTimeRanges] = useState<Record<number, string[]>>({});
    //選択済みの入れ替え
    const clearTimeRanges = () => {
        setTimeRanges({});
    };

    // stateでtimeRangesを保持
    const [selectedTimes, setSelectedTimes] = useState(timeRanges); 

    // timeRangesが変化時にstateを更新
    useEffect(() => {
        setSelectedTimes(timeRanges);
    }, [timeRanges]);

    // ユーザー選択時のハンドラ
    const handleSelect = (id: number, index: string, firsttime: string, endtime: string) => {
        setTimeRanges(prev => ({
        ...prev,
        [id]: [index, firsttime, endtime]
        }));
        console.log(selectedTimes);
    }

    const getIndex = (id: number): string => {
        return selectedTimes[id] ? selectedTimes[id][0] : '';
    }
    
    const getFirstTime = (id: number): string => {
        return selectedTimes[id] ? selectedTimes[id][1] : '';
    }
    
    const getEndTime = (id: number): string => {
        return selectedTimes[id] ? selectedTimes[id][2] : '';
    }

    // useEffect(() => {
    //     console.log(timeRanges);
    // }, [timeRanges]);

    //指名ありテストユーザー
    const testUsers = [
        {
        id: '601b92ee95861639c3e2c44b', 
        kana: 'コウベタロウ',
        name: '神戸太郎',
        details: "ES相談",
        day1: '2023/12/3',
        firsttime1: '10:00',
        endtime1: '12:00',
        day2: '2023/12/4',
        firsttime2: '10:00',
        endtime2: '12:00',  
        day3: '2023/12/5',
        firsttime3: '10:00',
        endtime3: '13:00'
        },
    
        {
        id: '601b95a595861639c3e2c44c',
        kana: 'コウベジロウ', 
        name: '神戸次郎',
        details: "面接練習",
        day1: '2023/12/5', 
        firsttime1: '10:00',
        endtime1: '12:00',
        day2: '2023/12/6',
        firsttime2: '10:00',
        endtime2: '12:00',
        day3: '2023/12/7',
        firsttime3: '10:00',
        endtime3: '13:00'
        },
    
        {
        id: '601b95a595861639c3e2c44c',
        kana: 'コウベサブロウ',
        name: '神戸三郎',
        details: "ES相談",
        day1: '2023/12/8',
        firsttime1: '10:00', 
        endtime1: '12:00',
        day2: '2023/12/9',
        firsttime2: '10:00',
        endtime2: '12:00',
        day3: '2023/12/10',
        firsttime3: '10:00',
        endtime3: '13:00'
        },
    
        {
        id: '601b95a595861639c3e2c44c',
        kana: 'コウベシロウ',
        name: '神戸四郎',
        details: "ES相談",
        day1: '2023/12/11',
        firsttime1: '10:00',
        endtime1: '12:00',
        day2: '2023/12/12', 
        firsttime2: '10:00',
        endtime2: '12:00',
        day3: '2023/12/13',
        firsttime3: '10:00', 
        endtime3: '13:00'
        }
    ];
    //指名なしテストユーザー
    const testUsers2 = [
        {
        id: '601b92ee95861639c3e2c44b',
        kana: 'コウベゴロウ',
        name: '神戸五郎',
        details: "ES相談",
        day1: '2023/12/14',
        firsttime1: '10:00',
        endtime1: '12:00',
        day2: '2023/12/15',
        firsttime2: '10:00',
        endtime2: '12:00',
        day3: '2023/12/16',
        firsttime3: '10:00',
        endtime3: '13:00'
        },
    
        {
        id: '601b92ee95861639c3e2c44b',
        kana: 'コウベロクロウ',
        name: '神戸六郎', 
        details: "ES相談",
        day1: '2023/12/17',
        firsttime1: '10:00',
        endtime1: '12:00',
        day2: '2023/12/18',
        firsttime2: '10:00',
        endtime2: '12:00',
        day3: '2023/12/19',
        firsttime3: '10:00',
        endtime3: '13:00'
        }
    ];


    const [isNominationSelected, setIsNominationSelected] = useState(true);

    const setUser = (users: any) => {
        setNowUser(users);
        setIsNominationSelected(true);
    }
    const setUser2 = (users: any) => {
        setNowUser(users);
        setIsNominationSelected(false);
    }

    useEffect(() => {
        setNowUser(testUsers);
    }, []);

    //プルダウンのコンポーネント
    const TimeSelectMenu: React.FC<TimeSelectMenuProps> = ({ firsttime, endtime }) => {

        const startParts = firsttime.split(':');
        const startHour = parseInt(startParts[0], 10);
        const startMinute = parseInt(startParts[1], 10);
      
        const endParts = endtime.split(':'); 
        const endHour = parseInt(endParts[0], 10);
        const endMinute = parseInt(endParts[1], 10);
      
        const timeOptions = [];
      
        for (let hour = startHour; hour <= endHour; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            if (hour === startHour && minute < startMinute) {
              continue;
            }
            if (hour === endHour && minute > endMinute) {
              break;
            }
      
            const timeValue = new Date(0, 0, 0, hour, minute);
            const formattedTime = timeValue.toLocaleTimeString('ja-JP', {
              hour12: false,
              hour: '2-digit', 
              minute: '2-digit'
            });
      
            timeOptions.push(
              <option key={`${hour}:${minute}`} value={`${hour}:${minute}`}>
                {formattedTime}  
              </option>
            );
          }
        }
      
        return <select className="py-1 px-5 w-full bg-white border border-gray-300 rounded-lg text-xs shadow-md">{timeOptions}</select>;
      
    };

    // スタッフデータを取得
    const { data: staffData, error: staffError } = useSWR(
        "/api/student/booking",
        fetcher
    );
    const staff: Staff[] = staffData?.staffUsers || [];

    //bookingに追加
    const addBooking = async(data:any, value:any) => {
        const body = {
            ymd: data,
            time: value, 
        }

        const response = await axios.post("/api/staff/calendar",body)

        if (response.status === 201) {
            toast.success("保存できました");
        } else {
            toast.error("保存できませんでした");
        }
    }

    //waitinglistから削除
    const deleteWaiting = () => {

    }

    return (
        <div className="flex flex-col items-center min-h-full bg-gray-100">
            <div className=" flex w-full items-center justify-center mt-10">
                <div className="flex flex-row justify-center fixed w-9/12 z-20 rounded-r-lg">
                    <button
                        className={`w-1/2 p-3 pb-5 shadow-lg border rounded-l-lg ${isNominationSelected ? 'border-kd-sub2-cl bg-kd-sub2-cl text-white' : 'border-gray-200 bg-gray-50'}`}
                        onClick={() => (setUser(testUsers),clearTimeRanges())}
                    >
                        指名あり
                    </button>
                    <button
                        className={`w-1/2 p-3 pb-5 shadow-lg border rounded-r-lg ${!isNominationSelected ? 'border-kd-sub2-cl bg-kd-sub2-cl text-white' : 'border-gray-200 bg-gray-50'}`}
                        onClick={() => (setUser2(testUsers2), clearTimeRanges())}
                    >
                        指名なし
                    </button>
                </div>
            </div>
            <div className="mt-12 w-full bg-gray-100 h-auto">
                <div className="flex flex-col items-center h-full">
                {isNominationSelected ?
                    nowUser.map((user, index) => (
                        <div className="mt-2">
                            <Link href="" key={user.id}>
                                <div
                                    // onClick={() => [setShowModal(true), setNowUser(user)]}
                                    className=""
                                >
                                    <div className="mt-3 mb-5 w-full border-2 bg-white border-gray-200 shadow-md rounded-lg hover:border-2 hover:border-kd-sub2-cl">
                                        <div className="flex flex-row ">
                                            <div className="text-base p-3 px-5 mx-2 my-2 flex justify-center items-center">
                                                {user.name}<br />
                                            </div>
                                            <div className="p-3 px-5 mx-2 my-2 flex justify-center items-center flex-col">
                                                <div className="border-b-2 border-gray-200" onClick={() => handleSelect(index, user.day1, user.firsttime1, user.endtime1)}>
                                                    1.　{user.day1}　{user.firsttime1}~{user.endtime1}
                                                </div>
                                                <div className="border-b-2 border-gray-200" onClick={() => handleSelect(index, user.day2, user.firsttime2, user.endtime2)}>
                                                    2.　{user.day2}　{user.firsttime2}~{user.endtime2}
                                                </div>
                                                <div className="border-b-2 border-gray-200" onClick={() => handleSelect(index, user.day3, user.firsttime3, user.endtime3)}>
                                                    3.　{user.day3}　{user.firsttime3}~{user.endtime3}
                                                </div>
                                            </div>
                                            <div className="p-3 px-5 mx-2 my-2 border-l-2">
                                                <div className="flex flex-row">
                                                    {getIndex(index) ? (
                                                        <div>
                                                        {getIndex(index)}　[{user.details}]
                                                        </div>
                                                    ) : (
                                                        <div>
                                                        {user.details} 
                                                        </div>
                                                    )}
                                                </div>
                                                {/* firsttimeselect */}
                                                <div className="flex flex-row">
                                                    <div className="m-2 w-24">
                                                        <TimeSelectMenu firsttime={getFirstTime(index)} endtime={getEndTime(index)} />
                                                    </div>
                                                    <div className="m-1 mt-2">
                                                        ～
                                                    </div>
                                                    <div className="m-2 w-24">
                                                        <TimeSelectMenu firsttime={getFirstTime(index)} endtime={getEndTime(index)} />
                                                    </div>
                                                </div>
                                                {/* endtimeselect */}
                                                <div className="flex justify-end">
                                                    <button className="bg-kd-button-cl hover:bg-blue-500 text-white rounded-md px-4 py-1 mt-3 text-xs">
                                                        承認
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </Link >

                        </div >


                    ))
                    :
                    nowUser.map((user, index) => (
                        <div className="mt-2">
                            <Link href="" key={user.id}>
                                <div
                                    // onClick={() => [setShowModal(true), setNowUser(user)]}
                                    className=""
                                >
                                    <div className="mt-3 mb-5 w-full border-2 bg-white border-gray-200 shadow-md rounded-lg hover:border-2 hover:border-kd-sub2-cl">
                                        <div className="flex flex-row ">
                                            <div className="text-base p-3 px-5 mx-2 my-2 flex justify-center items-center">
                                                {user.name}<br />
                                            </div>
                                            <div className="p-3 px-5 mx-2 my-2 flex justify-center items-center flex-col">
                                                <div className="border-b-2 border-gray-200" onClick={() => handleSelect(index, user.day1, user.firsttime1, user.endtime1)}>
                                                    1.　{user.day1}　{user.firsttime1}~{user.endtime1}
                                                </div>
                                                <div className="border-b-2 border-gray-200" onClick={() => handleSelect(index, user.day2, user.firsttime2, user.endtime2)}>
                                                    2.　{user.day2}　{user.firsttime2}~{user.endtime2}
                                                </div>
                                                <div className="border-b-2 border-gray-200" onClick={() => handleSelect(index, user.day3, user.firsttime3, user.endtime3)}>
                                                    3.　{user.day3}　{user.firsttime3}~{user.endtime3}
                                                </div>
                                            </div>
                                            <div className="p-3 px-5 mx-2 my-2 border-l-2">
                                                <div className="flex flex-row">
                                                    {getIndex(index) ? (
                                                        <div>
                                                        {getIndex(index)}　[{user.details}]
                                                        </div>
                                                    ) : (
                                                        <div>
                                                        {user.details} 
                                                        </div>
                                                    )}
                                                </div>
                                                {/* firsttimeselect */}
                                                <div className="flex flex-row">
                                                    <div className="m-2 w-24">
                                                        <TimeSelectMenu firsttime={getFirstTime(index)} endtime={getEndTime(index)} />
                                                    </div>
                                                    <div className="m-1 mt-2">
                                                        ～
                                                    </div>
                                                    <div className="m-2 w-24">
                                                        <TimeSelectMenu firsttime={getFirstTime(index)} endtime={getEndTime(index)} />
                                                    </div>
                                                </div>
                                                {/* endtimeselect */}
                                                <div className="flex justify-end">
                                                    <select className="px-2 py-1 mt-3 mr-3 w-32 text-sm border-gray-400 border rounded-md">
                                                        {staff.map(staff => (
                                                            <option className="text-sm" key={staff.name} value={staff.name}>
                                                            {staff.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button className="bg-kd-button-cl hover:bg-blue-500 text-white rounded-md px-4 py-1 mt-3 text-xs">
                                                        承認
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </Link >

                        </div >


                    ))
                
                }
                    {/* {
                        showModal && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                                <div className="" key={nowuser!.id}>
                                    <div className="flex justify-center items-center">
                                        <div
                                            className="fixed inset-0 bg-gray-600 bg-opacity-70 transition-opacity"
                                            onClick={() => setShowModal(false)}
                                        />
                                        <div className="fixed px-10 py-2 w-auto h-auto bg-white shadow-xl rounded-xl">
                                            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3">
                                                <svg
                                                    className="w-6 h-6 text-4xl"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                            <div className="flex flex-col">
                                                <div className="mb-5 text-xl text-gray-500">予約確定申請</div>
                                                {nowuser && (
                                                    <div>
                                                        <div>{nowuser.name}</div>
                                                        {[1, 2, 3].map((num) => (
                                                            <label key={num} className="text-gray-700 flex items-start">
                                                                <input type="radio" name="radio-example" className="mr-5 w-4 h-4" />
                                                                <div className={`px-5 mb-3 border-2 border-gray-300 rounded-lg hover:border-sky-700 shadow-sm ${num !== 3 && 'mb-2'}`}>
                                                                    <span className="flex flex-col p-2 text-xs text-gray-500">{`第${num}希望`}</span>
                                                                    <div className="flex flex-col">
                                                                        <div className="m-1 mb-2 text-gray-500"></div>
                                                                        <div className="flex flex-row flex-wrap w-full">
                                                                            <div>
                                                                                <div className="flex flex-row justify-center">
                                                                                    {[1, 2].map((part) => (
                                                                                        <React.Fragment key={part}>
                                                                                            <div className="mb-2 w-full">
                                                                                                <select
                                                                                                    className="py-1 px-5 w-full bg-white border border-gray-300 rounded-lg text-xs shadow-md"
                                                                                                    defaultValue=""
                                                                                                >
                                                                                                    <option value="" disabled>
                                                                                                        選択する
                                                                                                    </option>
                                                                                                    {Array.from({ length: 18 }, (_, hour) => {
                                                                                                        const timeValue = new Date(0, 0, 0, 9 + Math.floor(hour / 2), (hour % 2) * 30);
                                                                                                        const formattedTime = timeValue.toLocaleTimeString('ja-JP', {
                                                                                                            hour12: false,
                                                                                                            hour: '2-digit',
                                                                                                            minute: '2-digit',
                                                                                                        });

                                                                                                        return (
                                                                                                            <option key={hour} value={formattedTime}>
                                                                                                                {formattedTime}
                                                                                                            </option>
                                                                                                        );
                                                                                                    })}
                                                                                                </select>
                                                                                            </div>
                                                                                            {part === 1 && num !== 4 && (
                                                                                                <div className="text-center w-full md:w-1/6 lg:w-1/9 text-xs p-1 mx-3 flex justify-center">
                                                                                                    <p>～</p>
                                                                                                </div>
                                                                                            )}
                                                                                        </React.Fragment>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="flex justify-end">
                                                    <button
                                                        type="button"
                                                        className="rounded-lg bg-green-300 my-2 px-3 py-1 text-center text-sm text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white"
                                                    >
                                                        申請
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    } */}

                </div >
            </div >
        </div >
    );

};

export default Waiting;
