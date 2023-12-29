"use client";
//ここが生徒のホームルートになります

const Student = () => {
  const testUsers = [
    {
      id: '601b92ee95861639c3e2c44b',
      teachername: '○○先生',
      day: '2023/12/3',
      time: '10:00~12:00',
      subject: '面接練習'
    },
    {
      id: '601b95a595861639c3e2c44c',
      teachername: '○○先生',
      day: '2023/12/4',
      time: '13:00~14:00',
      subject: 'エントリーシート作成'
    },
  ];

  const testUsers2 = [
    {
      id: '601b92ee95861639c3e2c44b',
      teachername: '○○先生',
      day1: '2023/12/3',
      time1: '10:00~12:00',
      day2: '2023/12/4',
      time2: '10:00~12:00',
      day3: '2023/12/5',
      time3: '10:00~13:00',
      subject: '面接練習'
    },
    {
      id: '601b95a595861639c3e2c44c',
      teachername: '○○先生',
      day1: '2023/12/3',
      time1: '10:00~12:00',
      day2: '2023/12/4',
      time2: '10:00~12:00',
      day3: '2023/12/5',
      time3: '10:00~13:00',
      subject: 'エントリーシート作成'
    },
  ];

  return (
    <div className="flex flex-col flex-wrap justify-center items-center">

      <div className="flex flex-col mt-4 w-full lg:w-1/2  bg-gray-100 rounded-md shadow-md p-1">

        <div className=" p-2 mx-4 mt-2 rounded-lg text-gray-600">
          ■ 予約確定一覧
        </div>
        <div className="mt-1 mb-1 flex-grow border-b border-gray-400" ></div>
        <div className="mt-3 mb-3">
          {testUsers.map(user => (
            <div className="flex flex-col p-2" key={user.id}>

              <div className="mx-4 p-2 border-2 border-gray-200 bg-white rounded-lg flex flex-row">

                <div className="w-4/5 flex flex-row text-center items-center justify-center text-xs md:text-base lg:text-sm xl:text-base">
                  <div className="w-1/3 px-3 flex flex-col">
                    <div>{user.day}</div>
                    <div className="">{user.time}</div>
                  </div>
                  <div className="w-1/3 px-3">
                    {user.teachername}
                  </div>
                  <div className="w-1/3 px-3">
                    {user.subject}
                  </div>
                </div>

                <div className="w-1/5 flex items-center justify-center">
                  <button type="button" className="rounded-lg bg-red-300 px-2 p-1 text-[8px] md:text-xs font-medium hover:bg-red-500 hover:text-white">キャンセル</button>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="p-2 mx-4 rounded-lg text-gray-600">
          ■ 承認待ち
        </div>
        <div className="mt-1 mb-1 flex-grow border-b border-gray-400" ></div>
        <div className="mt-3 text-xs md:text-base lg:text-sm xl:text-base mb-3">
          {testUsers2.map(user => (
            <div className="flex flex-col p-2" key={user.id}>
              <div className="mx-4 p-2 border-2 bg-white border-gray-200 rounded-lg flex flex-row">
                <div className="w-4/5 flex flex-row text-center items-center justify-center">
                  <div className="w-2/3 px-3 flex flex-col">
                    1.　{user.day1}　{user.time1}<br />
                    2.　{user.day2}　{user.time2}<br />
                    3.　{user.day3}　{user.time3}<br />
                  </div>
                  <div className="w-1/3 border-left-2 border-gray-200 px-3">
                    {user.teachername}<br />
                    {user.subject}
                  </div>
                </div>
                <div className="w-1/5 flex items-center justify-center">
                  <button type="button" className="rounded-lg bg-red-300 px-2 p-1 text-[8px] md:text-xs font-medium hover:bg-red-500 hover:text-white">キャンセル</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Student;
