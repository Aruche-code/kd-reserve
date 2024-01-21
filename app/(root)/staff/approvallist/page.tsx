"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { Staff, StaffNgData } from "@/app/components/types";
import { toast } from "react-hot-toast";

interface TimeSelectMenuProps {
    firsttime: string;
    endtime: string;
}
interface WaitingList {
    details: string;
    firstEndTime: string;
    firstStartTime: string;
    firstYmd: string;
    id: string;
    secondEndTime: string;
    secondStartTime: string;
    secondYmd: string;
    staffName: string;
    thirdEndTime: string;
    thirdStartTime: string;
    thirdYmd: string;
    studentName: string,
}
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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);


const Approval = () => {
    const [nowUser, setNowUser] = useState<WaitingList[]>([]);

    //状態の管理
    const [timeRanges, setTimeRanges] = useState<Record<number, string[]>>({});
    //選択済みの入れ替え
    const clearTimeRanges = () => {
        setTimeRanges({});
    };

    // stateでtimeRangesを保持
    const [selectedTimes, setSelectedTimes] = useState(timeRanges); 

    //timeRangesが変化時にstateを更新
    useEffect(() => {
        setSelectedTimes(timeRanges);
    }, [timeRanges]);

    // ユーザー選択時のハンドラ
    const handleSelect = (id: number, index: string, firsttime: string, endtime: string) => {
        setTimeRanges(prev => ({
        ...prev,
        [id]: [index, firsttime, endtime]
        }));
        //console.log(selectedTimes);
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


    //選択時間のプルダウンのコンポーネント
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

    // データを取得(GET){
        const { data: staffDat, error: staffEr } = useSWR(
            "/api/staff/approvallist",
            fetcher
        );

        //staffデータの取得
        const staff: Staff[] = staffDat?.wait.staffList || [];
        //console.log(staffDat)

        //waitinglistの取得
        const waitinglist: WaitingList[] = staffDat?.wait.waitingList || [];
        const waitingnull: WaitingList[] = waitinglist.filter(user => user.staffName === "指名なし");

        // staffName が "指名なし" ではない場合の処理を記述する
        const waitingnomi: WaitingList[] = waitinglist.filter(user => user.staffName !== "指名なし");
        console.log(waitinglist)

        useEffect(() => {
            setNowUser(waitinglist); 
            //console.log("変更しました")
        }, [staffDat]);

    //}
    

    //bookingに追加
    const addBooking = async(data:string, time1:string, time2:string) => {
        const body = {
            ymd: data,
            starttime: time1, 
            endtime: time2
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
                        onClick={() => (setUser(waitingnomi),clearTimeRanges())}
                    >
                        指名あり
                    </button>
                    <button
                        className={`w-1/2 p-3 pb-5 shadow-lg border rounded-r-lg ${!isNominationSelected ? 'border-kd-sub2-cl bg-kd-sub2-cl text-white' : 'border-gray-200 bg-gray-50'}`}
                        onClick={() => (setUser2(waitingnull), clearTimeRanges())}
                    >
                        指名なし
                    </button>
                </div>
            </div>
            <div className="mt-12 w-full bg-gray-100 h-auto">
                <div className="flex flex-col items-center h-full">
                {isNominationSelected ?
                    nowUser.map((user, index) => (
                        <div className="mt-2" key={user.id}>
                                <div
                                    // onClick={() => [setShowModal(true), setNowUser(user)]}
                                    className=""
                                >
                                    <div className="mt-3 mb-5 w-full border-2 bg-white border-gray-200 shadow-md rounded-lg hover:border-2 hover:border-kd-sub2-cl">
                                        <div className="flex flex-row ">
                                            <div className="text-base p-3 px-5 mx-2 my-2 flex justify-center items-center" key={user.id}>
                                                {user.studentName}<br />
                                            </div>
                                            <div className="p-3 px-5 mx-2 my-2 flex justify-center items-center flex-col">
                                                <div className="border-b-2 cursor-pointer border-gray-200" onClick={() => handleSelect(index, user.firstYmd, user.firstStartTime, user.firstEndTime)}>
                                                    1. {user.firstYmd} {user.firstStartTime}~{user.firstEndTime}
                                                </div>
                                                <div className="border-b-2 cursor-pointer border-gray-200" onClick={() => handleSelect(index, user.secondYmd, user.secondStartTime, user.secondEndTime)}>
                                                    2. {user.secondYmd} {user.secondStartTime}~{user.secondEndTime}
                                                </div>
                                                <div className="border-b-2 cursor-pointer border-gray-200" onClick={() => handleSelect(index, user.thirdYmd, user.thirdStartTime, user.thirdEndTime)}>
                                                    3. {user.thirdYmd} {user.thirdStartTime}~{user.thirdEndTime}
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
                        </div >


                    ))
                :
                    nowUser.map((user, index) => (
                        <div className="mt-2">
                            <Link href="" key={user.id}>
                                <div className="">
                                    <div className="mt-3 mb-5 w-full border-2 bg-white border-gray-200 shadow-md rounded-lg hover:border-2 hover:border-kd-sub2-cl">
                                        <div className="flex flex-row ">
                                            <div className="text-base p-3 px-5 mx-2 my-2 flex justify-center items-center">
                                                {user.studentName}<br />
                                            </div>
                                            <div className="p-3 px-5 mx-2 my-2 flex justify-center items-center flex-col">
                                            <div className="border-b-2 cursor-pointer border-gray-200" onClick={() => handleSelect(index, user.firstYmd, user.firstStartTime, user.firstEndTime)}>
                                                . {user.firstYmd} {user.firstStartTime}{" "}~{" "}{user.firstEndTime}
                                            </div>
                                            <div className="border-b-2 cursor-pointer border-gray-200" onClick={() => handleSelect(index, user.secondYmd, user.secondStartTime, user.secondEndTime)}>
                                                2. {user.secondYmd} {user.secondStartTime}~{user.secondEndTime}
                                            </div>
                                            <div className="border-b-2 cursor-pointer border-gray-200" onClick={() => handleSelect(index, user.thirdYmd, user.thirdStartTime, user.thirdEndTime)}>
                                                3. {user.thirdYmd} {user.thirdStartTime}~{user.thirdEndTime}
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
                </div >
            </div >
        </div >
    );

};

export default Approval;
