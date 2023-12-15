import Link from 'next/link';

const Profile1 = () => {

  const testUsers = [
    {
      id: '601b92ee95861639c3e2c44b',
      name: "杉浦怜奈",
      kana: "スギウラレイナ",
      tel: "000-0000-0000",
      department: "ITエキスパート",
      grade: "3年",
      graduationYear: "2025年",
      graduationMonth: "3月",
      industry: "IT系",
      workLocation: "兵庫県",
      qualifications: "基本情報技術者試験",
    }
  ];

  return (
    <div className="flex flex-col justify-center items-center">
      {testUsers.map(user => (
        <div className="p-1.5 px-2 inline-block w-full md:w-4/5 lg:w-2/3 xl:w-1/2" key={user.id}>
          <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-2 border-gray-200">
              <h2 className="text-xl font-semibold flex justify-center text-gray-800 mt-6">
                プロフィール
              </h2>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="p-2 inline-block w-8/12">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="px-0 py-0 border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">

                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td scope="col" className="px-6 py-3 text-start   border-r">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              氏名(漢字)
                            </span>
                          </td>
                          <td scope="col" className="px-6 py-3 text-start  ">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              {user.name}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td scope="col" className="px-6 py-3 text-start   border-r">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              氏名(カナ)
                            </span>
                          </td>
                          <td scope="col" className="px-6 py-3 text-start  ">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              {user.kana}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td scope="col" className="px-6 py-3 text-start   border-r">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              電話番号
                            </span>
                          </td>
                          <td scope="col" className="px-6 py-3 text-start  ">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              {user.tel}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td scope="col" className="px-6 py-3 text-start   border-r">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              学科
                            </span>
                          </td>
                          <td scope="col" className="px-6 py-3 text-start  ">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              {user.department}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td scope="col" className="px-6 py-3 text-start   border-r">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              学年
                            </span>
                          </td>
                          <td scope="col" className="px-6 py-3 text-start  ">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              {user.grade}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td scope="col" className="px-6 py-3 text-start   border-r">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              卒業予定
                            </span>
                          </td>
                          <td scope="col" className="px-6 py-3 text-start  ">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              {user.graduationYear}{user.graduationMonth}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td scope="col" className="px-6 py-3 text-start   border-r">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              志望業界
                            </span>
                          </td>
                          <td scope="col" className="px-6 py-3 text-start whitespace-nowrap  ">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              {user.industry}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td scope="col" className="px-6 py-3 text-start   border-r">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              志望勤務地
                            </span>
                          </td>
                          <td scope="col" className="px-6 py-3 text-start  ">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              {user.workLocation}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td scope="col" className="px-6 py-3 text-start   border-r">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              保有資格
                            </span>
                          </td>
                          <td scope="col" className="px-6 py-3 text-start  ">
                            <span className="text-xs font-semibold uppercase tracking-wide flex justify-center text-gray-800">
                              {user.qualifications}
                            </span>
                          </td>
                        </tr>
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Link href="../dev/profile">
                <button className="mr-10 mb-5 py-1 px-5 items-center text-sm font-medium rounded-lg border border-gray-200 bg-green-500 text-white shadow-sm hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none ">
                  編集
                </button>
              </Link>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile1