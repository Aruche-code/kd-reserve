const Booking2= () => {

    return (

    <div className="flex justify-center items-center bg-gray-200">
        <div className="flex items-center">
                <table>
                    <caption className="caption-top">
                    予約確認
                    </caption>
                        <thead>
                            <tr>
                                <th>内容</th>
                                <th>詳細</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>面接</td>
                                <td>面接練習</td>
                            </tr>
                            <tr>
                                <td>担当教員</td>
                                <td>〇〇先生</td>
                            </tr>
                            <tr>
                                <td>予約日程</td>
                                <td>10/12 13:00</td>
                            </tr>
                        </tbody>
                </table>
                
            {/* <div className="flex flex-row">
                <button className="mb-3 py-2 px-1 inline-flex items-center rounded-full border border-gray-200 bg-red-400 text-white shadow-sm hover:bg-red-700">戻る</button>
                <button className="mb-3 py-2 px-1 inline-flex items-center rounded-full border border-gray-200 bg-green-500 text-white shadow-sm hover:bg-green-700">完了</button>
            </div> */}
            
        </div>
    </div>
      
        );
    }
    
    export default Booking2 