"use client";
import React, { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './App.css';
import axios from "axios";
import toast from 'react-hot-toast';

//calendar
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import CustomInput from '@/app/components/styles/DatePicker';
// import ja from "date-fns/locale/ja"; // date-fnsの日本語ロケール

interface RecordItem {
    time: string;
    question: string;
    answer: string;
}

interface UserProfile {
    id: string;
    name: string;
    gakuseki: string;
    studentProfile: {
        department: string;
        grade: string;
        graduationYear: string;
        tel: string;
        workLocation: string;
        qualifications: string;
    };
    records: Array<{
        recordId: string;
        content: string;
        progress: string;
        ymd: string;
    }>;
}
type Record = {
    recordId: string;
    content: string;
    progress: string;
    ymd: string;
};


const Record = () => {
    const [users, setUsers] = useState<UserProfile | null>(null);

    //トグル部分追加---------------------------------------------------------------------------------------
    const [selectedDay, setselectedDay] = useState<Array<RecordItem>>([
        { time: "2023/9/19", question: "履歴書の作成", answer: "" }
    ]);

    const handleInputChange = (accordionIndex: number, field: keyof Record, value: string) => {
        if (users) {
            const updatedRecords = [...users.records];
            updatedRecords[accordionIndex][field] = value;
            setUsers({ ...users, records: updatedRecords });
        }
    };


    //----------------------------------------------------------------------------------------

    const [profileOpen, setProfileOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const toggle = (accordionIndex: any, itemIndex: any) => {
        if (selected === accordionIndex) {
            setSelected(null);
        } else {
            setSelected(accordionIndex);
        }
    }

    const toggleProfile = () => {
        setProfileOpen(!profileOpen);  // 状態を反転させる
    }

    const handleChange = async (putrecordId: string, content: string, progress: string, ymd: string) => {
        console.log(putrecordId, content, progress, ymd)
        try {
            const data = {
                recordId: putrecordId,
                content: content,
                progress: progress,
                ymd: ymd,
            }
            const response = await axios.put(`/api/staff/record`, data);

            if (response.status === 200) {
                toast.success("データが更新されました");
                // データ更新後に状態を更新
                // const updatedUsers = { ...users };
                // updatedUsers.records = updatedUsers.records.map(record => {
                //     if (record.id === recordId) {
                //         record.progress = ""; // または他のデフォルトの値に置き換える
                //     }
                //     return record;
                // });
                // setUsers(updatedUsers);
            } else {
                toast.error("データの更新に失敗しました");
            }
        } catch (error) {
            console.error('エラー:', error);
            toast.error("データの更新中にエラーが発生しました");
        }
    };

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
                    <div className="bg-gray-100 w-2/3 rounded-md shadow-md mt-5">
                        <div className="p-3 px-6 rounded-t-lg bg-kd-sub2-cl text-white">
                            ■ 学生カルテ
                        </div>
                        <div className="flex-col text-center mt-5 mb-5">
                            <div className="text-gray-900 text-3xl">
                                {users.name}
                            </div>
                            <div className="text-gray-900 mt-2 mb-2 flex flex-row">
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
                                            <div className="w-1/3 text-right">学科・学年　/</div>
                                            <div className="w-2/3 px-4">{users.studentProfile.department}{users.studentProfile.grade}</div>
                                        </div>
                                        <div className="px-5 mb-1 flex flex-row">
                                            <div className="w-1/3 text-right">卒業予定　/</div>
                                            <div className="w-2/3 px-4">{users.studentProfile.graduationYear}</div>
                                        </div>
                                        <div className="px-5 mb-1 flex flex-row">
                                            <div className="w-1/3 text-right">電話番号　/</div>
                                            <div className="w-2/3 px-4">{users.studentProfile.tel}</div>
                                        </div>
                                        <div className="px-5 mb-1 flex flex-row">
                                            <div className="w-1/3 text-right">志望勤務地　/</div>
                                            <div className="w-2/3 px-4">{users.studentProfile.workLocation}</div>
                                        </div>
                                        <div className="px-5 mb-1 flex flex-row">
                                            <div className="w-1/3 text-right">保有資格　/</div>
                                            <div className="w-2/3 px-4">{users.studentProfile.qualifications}</div>
                                        </div>


                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col w-full lg:w-4/5 bg-white rounded-md mt-5 mb-5">

                                <div className="flex bg-kd-button-cl p-2 border-4 border-kd-button-cl rounded-lg text-white font-medium flex-row justify-between">
                                    <div className=''>話し合いメモ</div>
                                </div>

                                <div className="mx-5 p-2 mt-2 pt-3 pb-3 text-gray-700 px-2 text-sm md:text-base">
                                    {users.records.map((record: any, accordionIndex) => (
                                        <div key={accordionIndex}>
                                            <div className="wrapper">
                                                <div className="accordion">
                                                    {selectedDay.map((item, itemIndex) =>
                                                        <div className="item" key={itemIndex}>
                                                            <div className='title'>
                                                                <div className="pl-3">{record.ymd}</div>
                                                                <input
                                                                    type="text"
                                                                    value={record.content}
                                                                    onChange={(e) => handleInputChange(accordionIndex, 'content', e.target.value)}
                                                                    className="border-black"
                                                                />
                                                                <span onClick={() => toggle(accordionIndex, itemIndex)}>{selected === accordionIndex ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
                                                            </div>
                                                            <div className={selected === accordionIndex ? "content show" : "content"}>
                                                                <div>
                                                                    <textarea
                                                                        className="w-full border-2 border-gray-300 rounded-lg p-1 px-5 mt-2 text-gray-800"
                                                                        style={{ resize: "none" }}
                                                                        value={record.progress}
                                                                        onChange={(e) => handleInputChange(accordionIndex, 'progress', e.target.value)}
                                                                    ></textarea>
                                                                    <div className="flex justify-end flex-row">
                                                                        <button type="button" onClick={() => handleChange(record.recordId, record.content, record.progress, record.ymd)} className="rounded-lg border border-primary-500 bg-green-300 px-6 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white">保存</button>
                                                                        {/* <button type="button" onClick={() => handleDelete(record.id)} className="rounded-lg border border-primary-500 bg-red-300 px-6 py-1 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 hover:bg-red-500 hover:text-white">削除</button> */}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    ))}
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