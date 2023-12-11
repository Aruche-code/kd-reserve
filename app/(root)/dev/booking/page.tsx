// import { Linkicon } from "@mui/material";
import Link from 'next/link';

const Booking= () => {

    return (
        <div className='w-full h-screen bg-white font-banana'>
            <div className="">
                <div className="bg-white p-2">
					{/* 内容　 */}
                    <p className="mt-0 mb-3 text-1xl">1. 予約内容を選択してください</p>
                        <div className="flex flex-row -mx-2">
                                <li className="list-none mr-3">
                                    <input type="radio" id="hosting-1" name="hosting" value="hosting-1" className="hidden peer" required />
                                        <label htmlFor="hosting-1" className="inline-flex items-center justify-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">                           
                                            <div className="block">
                                                <div className="text-xs">面談</div>
                                            </div>
                                        </label>
                                </li>
                                <li className="list-none mr-2">
                                    <input type="radio" id="hosting-2" name="hosting" value="hosting-2" className="hidden peer" />
                                        <label htmlFor="hosting-2" className="inline-flex items-center justify-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 ">
                                            <div className="block">
                                                <div className="text-xs">履歴書の作成・添削</div>
                                            </div>                                                    
                                        </label>
                                </li>
                                <li className="list-none mr-2">
                                    <input type="radio" id="hosting-3" name="hosting" value="hosting-3" className="hidden peer" />
                                        <label htmlFor="hosting-3" className="inline-flex items-center justify-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 ">
                                            <div className="block">
                                                <div className="text-xs">エントリーシートの作成</div>
                                            </div>                                            
                                        </label>
                                </li>
                                <li className="list-none mr-2">
                                    <input type="radio" id="hosting-4" name="hosting" value="hosting-4" className="hidden peer" required />
                                        <label htmlFor="hosting-4" className="inline-flex items-center justify-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 ">                           
                                            <div className="block">
                                                <div className="text-xs">企業探し</div>
                                            </div>
                                        </label>
                                </li>
                                <li className="list-none mr-2">
                                    <input type="radio" id="hosting-5" name="hosting" value="hosting-5" className="hidden peer" required />
                                            <label htmlFor="hosting-5" className="inline-flex items-center justify-center w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 ">                           
                                                <div className="block">
                                                    <div className="text-xs">企業の相談</div>
                                                </div>
                                            </label>
                                </li>
                                <li className="list-none mr-2">
                                    <input type="radio" id="hosting-6" name="hosting" value="hosting-6" className="hidden peer" required />
                                        <label htmlFor="hosting-6" className="inline-flex items-center justify-center p-3 w-full text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 ">                           
                                            <div className="block">
                                                <div className="text-xs">その他</div>
                                            </div>
                                        </label>
                                </li>
                        </div>
				</div>
            </div> 
                <div className="mb-2">
                    <div className="bg-white p-2">
						{/* 内容 */}
                        <p className="mb-3 text-1xl">2. 担当教員を選択してください</p>
                        <div className="flex flex-wrap -mx-2">
                            <ul className="grid w-full gap-6 md:grid-cols-6">
                                <li>
                                    <input type="radio" id="t-1" name="teacher" value="t-1" className="hidden peer" required />
                                        <label htmlFor="t-1" className="inline-flex items-center justify-center w-full p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                            <div className="block">
                                                <div className="w-full text-lg">
                                                    <div className="flex flex-row justify-between items-center">
                                                         <div className="bg-gray-100 flex items-center justify-center h-12 w-12 rounded-full">
                                                            <svg className="h-1/2 w-1/2 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h1 1 14H20z"></path>
                                                            </svg>
                                                        </div>
                                                        <div className="text-xs">〇〇先生</div>
                                                    </div>
                                                <div className="text-center">
                                                    <div className="bg-gray-50 w-full border rounded-lg mt-2">
                                                        <table className=" divide-gray-200 ">
                                                        <thead>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">性別</td>
                                                                <td className="border border-slate-200 text-xs">女性</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">得意なこと</td>
                                                                <td className="border border-slate-200 text-xs">スポーツ</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">趣味</td>
                                                                <td className="border border-slate-200 text-xs">映画鑑賞</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">勤務歴</td>
                                                                <td className="border border-slate-200 text-xs">4年</td>
                                                            </tr>
                                                        </thead>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>  
                                            </div>
                                        </label>
                                </li>
                                <li>
                                    <input type="radio" id="t-2" name="teacher" value="t-2" className="hidden peer"  />
                                        <label htmlFor="t-2" className="inline-flex items-center justify-center w-full p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                            <div className="block">
                                                <div className="w-full text-lg">
                                                    <div className="flex flex-row justify-between items-center">
                                                         <div className="bg-gray-100 flex items-center justify-center h-12 w-12 rounded-full">
                                                            <svg className="h-1/2 w-1/2 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h1 1 14H20z"></path>
                                                            </svg>
                                                        </div>
                                                        <div className=" text-xs">
                                                        〇〇先生
                                                        </div>
                                                    </div>
                                                <div className="text-center">
                                                    <div className="bg-gray-50 w-full border rounded-lg mt-2">
                                                        <table className=" divide-gray-200">
                                                        <thead>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">性別</td>
                                                                <td className="border border-slate-200 text-xs">女性</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">得意なこと</td>
                                                                <td className="border border-slate-200 text-xs">スポーツ</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">趣味</td>
                                                                <td className="border border-slate-200 text-xs">映画鑑賞</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">勤務歴</td>
                                                                <td className="border border-slate-200 text-xs">4年</td>
                                                            </tr>
                                                        </thead>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>  
                                            </div>
                                        </label>
                                </li>
                                <li>
                                    <input type="radio" id="t-3" name="teacher" value="t-3" className="hidden peer"  />
                                        <label htmlFor="t-3" className="inline-flex items-center justify-center w-full p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer hecked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 ">
                                            <div className="block">
                                                <div className="w-full text-lg">
                                                    <div className="flex flex-row justify-between items-center">
                                                         <div className="bg-gray-100 flex items-center justify-center h-12 w-12 rounded-full">
                                                            <svg className="h-1/2 w-1/2 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h1 1 14H20z"></path>
                                                            </svg>
                                                        </div>
                                                        <div className=" text-xs">
                                                        〇〇先生
                                                        </div>
                                                    </div>
                                                <div className="text-center">
                                                    <div className="bg-gray-50 w-full border rounded-lg mt-2">
                                                        <table className="min-w-full divide-y divide-gray-200 ">
                                                        <thead>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">性別</td>
                                                                <td className="border border-slate-200  text-xs">女性</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200  text-xs">得意なこと</td>
                                                                <td className="border border-slate-200  text-xs">スポーツ</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200  text-xs">趣味</td>
                                                                <td className="border border-slate-200  text-xs">映画鑑賞</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200  text-xs">勤務歴</td>
                                                                <td className="border border-slate-200  text-xs">4年</td>
                                                            </tr>
                                                        </thead>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>  
                                            </div>
                                        </label>
                                </li>
                                <li>
                                    <input type="radio" id="t-4" name="teacher" value="t-4" className="hidden peer"  />
                                        <label htmlFor="t-4" className="inline-flex items-center justify-center w-full p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 ">
                                            <div className="block">
                                                <div className="w-full text-lg">
                                                    <div className="flex flex-row justify-between items-center">
                                                         <div className="bg-gray-100 flex items-center justify-center h-12 w-12 rounded-full">
                                                            <svg className="h-1/2 w-1/2 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h1 1 14H20z"></path>
                                                            </svg>
                                                        </div>
                                                        <div className=" text-xs">
                                                        〇〇先生
                                                        </div>
                                                    </div>
                                                <div className="text-center">
                                                    <div className="bg-gray-50 w-full border rounded-lg mt-2">
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                        <thead>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">性別</td>
                                                                <td className="border border-slate-200 text-xs">女性</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">得意なこと</td>
                                                                <td className="border border-slate-200 text-xs">スポーツ</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">趣味</td>
                                                                <td className="border border-slate-200 text-xs">映画鑑賞</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">勤務歴</td>
                                                                <td className="border border-slate-200 text-xs">4年</td>
                                                            </tr>
                                                        </thead>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>  
                                            </div>
                                        </label>
                                </li>
                                <li>
                                    <input type="radio" id="t-5" name="teacher" value="t-5" className="hidden peer" />
                                        <label htmlFor="t-5" className="inline-flex items-center justify-center w-full p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 ">
                                            <div className="block">
                                                <div className="w-full text-lg">
                                                    <div className="flex flex-row justify-between items-center">
                                                         <div className="bg-gray-100 flex items-center justify-center h-12 w-12 rounded-full">
                                                            <svg className="h-1/2 w-1/2 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h1 1 14H20z"></path>
                                                            </svg>
                                                        </div>
                                                        <div className=" text-xs">
                                                        〇〇先生
                                                        </div>
                                                    </div>
                                                <div className="text-center">
                                                    <div className="bg-gray-50 w-full border rounded-lg mt-2">
                                                        <table className="min-w-full divide-y divide-gray-200 ">
                                                        <thead>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">性別</td>
                                                                <td className="border border-slate-200 text-xs">女性</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">得意なこと</td>
                                                                <td className="border border-slate-200 text-xs">スポーツ</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">趣味</td>
                                                                <td className="border border-slate-200 text-xs">映画鑑賞</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">勤務歴</td>
                                                                <td className="border border-slate-200 text-xs">4年</td>
                                                            </tr>
                                                        </thead>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>  
                                            </div>
                                        </label>
                                </li>
                                <li>
                                    <input type="radio" id="t-6" name="teacher" value="t-6" className="hidden peer"  />
                                        <label htmlFor="t-6" className="inline-flex items-center justify-center w-full p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                            <div className="block">
                                                <div className="w-full text-lg">
                                                    <div className="flex flex-row justify-between items-center">
                                                         <div className="bg-gray-100 flex items-center justify-center h-12 w-12 rounded-full">
                                                            <svg className="h-1/2 w-1/2 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h1 1 14H20z"></path>
                                                            </svg>
                                                        </div>
                                                        <div className=" text-xs">
                                                        〇〇先生
                                                        </div>
                                                    </div>
                                                <div className="text-center">
                                                    <div className="bg-gray-50 w-full border rounded-lg mt-2">
                                                        <table className="min-w-full divide-y divide-gray-200 ">
                                                        <thead>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">性別</td>
                                                                <td className="border border-slate-200 text-xs">女性</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">得意なこと</td>
                                                                <td className="border border-slate-200 text-xs">スポーツ</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">趣味</td>
                                                                <td className="border border-slate-200 text-xs">映画鑑賞</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-200 text-xs">勤務歴</td>
                                                                <td className="border border-slate-200 text-xs">4年</td>
                                                            </tr>
                                                        </thead>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>  
                                            </div>
                                        </label>
                                </li>  
                                </ul>       
                                </div>
                            
		                        
   
                                
				            </div>
                    </div>     
                    <div className="mb-2">
                        <div className="bg-white p-2">
                            {/* 日時 */}
                            <p className="mb-3 text-1xl">3. 日時を選択してください</p>

                            <div className="flex flex-row -mx-1 bg-slate-300">
                                <div className="flex flex-col w-1/3">
                                    <div className='bg-red-100'>
                                        <p>1. 第1希望を選択してください</p>
                                    </div>
                                    <div className='bg-red-200'>
                                        <div className="flex flex-row">
                                            <div className='bg-white w-1/3'>
                                            <select className="py-1 px-6 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                                            <option selected>選択する</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                        </select>
                                            </div>
                                            <div className='bg-white text-center w-1/3'>
                                                <p>～</p>
                                            </div>
                                            <select className="py-1 px-6 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                                            <option selected>選択する</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                        </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                
                            

                            
                                                  
                        </div>  
                    </div>              
        {/* ボタン */}
            <div className="flex justify-end gap-3 bg-secondary-50 px-3 py-4">
                <Link href="../dev/booking2">
                <button type="button" className="rounded-lg border border-primary-500 bg-green-300 px-5 py-1 text-center text-sm text-black shadow-sm transition-all hover:border-primary-700 hover:bg-green-500 hover:text-white">
                    確認
                </button>
                </Link>
            </div>
        
    </div>
    );
}

export default Booking