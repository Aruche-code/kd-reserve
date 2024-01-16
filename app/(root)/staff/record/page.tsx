"use client";
import React, { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import './App.css';
import axios from "axios";

//calendar
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomInput from '@/app/components/styles/DatePicker';
import ja from "date-fns/locale/ja"; // date-fnsの日本語ロケール


const Record = () => {
    const [users, setUsers] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [excludeDates, setExcludeDates] = useState<Date[]>([]);

    //トグル部分追加---------------------------------------------------------------------------------------
    const [selectedDay, setselectedDay] = useState<Array<{ time: string; question: string; answer: string }>>([
        { time: "2023/9/19", question: "履歴書の作成", answer: "" }
    ]);

    const addDay = () => {
        const lastDay = selectedDay[selectedDay.length - 1];
        const newDay = { time: String(Number(lastDay.time) + 1), question: "", answer: "" };
        setselectedDay([...selectedDay, newDay]);
    };

    const handleInputChange = (index: number, field: string, value: string) => {
        const updatedSelectedDay = [...selectedDay];
        updatedSelectedDay[index][field] = value;
        setselectedDay(updatedSelectedDay);
    };

    //----------------------------------------------------------------------------------------

    const [profileOpen, setProfileOpen] = useState(false);
    const [reservationOpen, setReservationOpen] = useState(false);
    const [selected, setSelected] = useState(0);

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    }

    const toggleProfile = () => {
        setProfileOpen(!profileOpen);  // 状態を反転させる
    }

    const toggleReservation = () => {
        setReservationOpen(!reservationOpen);
    }

    useEffect(() => {
        const getdata = async () => {
            try {
                const response = await axios.get('/api/staff/record');

                if (response.status === 200) {
                    alert("データの取得に成功しました");

                    const users = response.data.responseData[0];

                    setUsers(users);

                    console.log(response.data);
                    console.log(response.data.responseData[0]);
                    console.log(response.data.responseData[0].name);
                    console.log(response.data.responseData[0].studentProfile);
                    console.log(response.data.responseData[0].studentProfile.department);


                } else {
                    alert("データの取得に失敗しました");
                }
            } catch (error) {
                console.error('エラー:', error);
                alert("データの取得中にエラーが発生しました");
            }
        };
        getdata();
    }, []);

    return (
        <div className="mt-6">
            {/* {users.map(user => ( */}
            {users && (
                <div className="w-full flex justify-center items-center" key={users.id}>
                    <div className="bg-gray-100 w-2/3 rounded-md shadow-md">

                        <div className="flex-col text-center mt-5 mb-5">
                            <div className="text-gray-900 text-3xl">
                                {users.name}
                            </div>
                            <div className="text-gray-900 mt-2 flex flex-row">
                                <div className="w-full ">学籍番号 ： {users.gakuseki}</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap flex-col justify-center items-center">
                            <div className="flex flex-col w-full lg:w-4/5 bg-white rounded-md ">
                                <div className="bg-kd-button-cl p-2 border-4 border-kd-button-cl rounded-lg text-white font-medium flex justify-between items-center" onClick={toggleProfile}>
                                    プロフィール
                                    <span>{profileOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
                                </div>
                                {profileOpen && (
                                    <div className="p-2 ml-5 mr-5 pb-5 pt-5 text-gray-700 px-2 text-sm md:text-base">
                                        <div className="px-5 mb-1 flex flex-row">
                                            <div className="w-1/3 text-right">学科・学年 /</div>
                                            <div className="w-2/3 px-4">{users.studentProfile.department}{users.studentProfile.grade}</div>
                                        </div>
                                        <div className="px-5 mb-1 flex flex-row">
                                            <div className="w-1/3 text-right">卒業予定 /</div>
                                            <div className="w-2/3 px-4">{users.studentProfile.graduationYear}</div>
                                        </div>
                                        <div className="px-5 mb-1 flex flex-row">
                                            <div className="w-1/3 text-right">電話番号 /</div>
                                            <div className="w-2/3 px-4">{users.studentProfile.tel}</div>
                                        </div>
                                        {/* <div className="px-5 mb-1 flex flex-row">
                                            <div className="w-1/3 text-right">志望業界 /</div>
                                            <div className="w-2/3 px-4">{users.studentProfile.industry}</div>
                                        </div> */}
                                        <div className="px-5 mb-1 flex flex-row">
                                            <div className="w-1/3 text-right">志望勤務地 /</div>
                                            <div className="w-2/3 px-4">{users.studentProfile.workLocation}</div>
                                        </div>
                                        <div className="px-5 mb-1 flex flex-row">
                                            <div className="w-1/3 text-right">保有資格 /</div>
                                            <div className="w-2/3 px-4">{users.studentProfile.qualifications}</div>
                                        </div>


                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col w-full lg:w-4/5 bg-white rounded-md mt-5">
                                <div className="bg-kd-button-cl p-2 border-4 border-kd-button-cl rounded-lg text-white font-medium flex justify-between items-center" onClick={toggleReservation}>
                                    予約履歴
                                    <span>{reservationOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
                                </div>
                                {reservationOpen && (
                                    <div className="p-2 ml-5 mr-5 pb-5 pt-5 text-gray-700 px-2 text-sm md:text-base">
                                        <div className="px-5 mb-1 flex flex-row">
                                            <div className="w-1/3 text-right">10月4日　</div>
                                            <div className="w-2/3 px-4">面接練習</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col w-full lg:w-4/5 bg-white rounded-md mt-5 mb-5">

                                <div className="flex bg-kd-button-cl p-2 border-4 border-kd-button-cl rounded-lg text-white font-medium flex-row justify-between">
                                    <div className=''>話し合いメモ</div>
                                    <div className="relative flex items-center">
                                        <button onClick={addDay}><AddIcon /></button>
                                    </div>
                                </div>

                                <div className="mx-5 p-2 mt-2 pt-3 pb-3 text-gray-700 px-2 text-sm md:text-base">
                                    <div>
                                        <div className="wrapper">
                                            <div className="accordion">
                                                {selectedDay.map((item, i) =>
                                                    <div className="item" key={i}>
                                                        <div className='title'>
                                                            <DatePicker
                                                                selected={selectedDate}
                                                                onChange={(date: Date) => handleInputChange(i, 'time', date.toISOString())}
                                                                dateFormat="yyyy-MM-dd"
                                                                locale={ja}
                                                                minDate={new Date()}
                                                                excludeDates={excludeDates}
                                                                customInput={<CustomInput />} //デザインはここ
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="タイトル"
                                                                value={item.question}
                                                                onChange={(e) => handleInputChange(i, 'question', e.target.value)}
                                                                className="border-black"
                                                            />
                                                            <span onClick={() => toggle(i)}>{selected === i ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
                                                        </div>
                                                        <div className={selected === i ? "content show" : "content"}>
                                                            <div>
                                                                <textarea
                                                                    className="w-full border-2 border-gray-300 rounded-lg p-1 px-5 text-gray-800"
                                                                    style={{ resize: "none" }}
                                                                />
                                                                <div className="flex justify-end flex-row">
                                                                    <button type="button" className="mx-2 rounded-lg border border-primary-500 bg-green-300 px-6 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white">保存</button>
                                                                    <button type="button" className="rounded-lg border border-primary-500 bg-red-300 px-6 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 hover:bg-red-500 hover:text-white">削除</button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                // {/* ))
                // } */}
            )}
        </div >
    );
};

export default Record;