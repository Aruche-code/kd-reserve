import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function Calendar({
    date, 
    daysInMonth,
    prevMonth,
    nextMonth,
    setShowModal,
    setselectedDay,
    selectedTimes,
    clearState,
    bookings,
    setOpen,
    bookingreload,
}: any) {

const year = date.getFullYear();
const month = date.getMonth();
const lastday = new Date(year, month)

const dayArray = daysInMonth();

return (
    <>
    <div className="flex flex-col justify-start items-center w-full my-6">
        <div className=" text-3xl my-3">{year}年</div>

        <div className="flex justify-start items-center mb-1">
            <ArrowCircleLeftIcon 
            className="mr-5 cursor-pointer"
            onClick={prevMonth} 
            />

            <h2 className="text-4xl font-bold">
            {month + 1}月  
            </h2>

            <ArrowCircleRightIcon
            className="ml-5 cursor-pointer" 
            onClick={nextMonth} 
            />
        </div>
    </div>

    <div className="grid grid-cols-7 w-full mx-auto mt-6">

        {/* 曜日表示 */}
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
            <div key={day} className="text-center font-bol">{day}</div>
        ))}

        {/* 月の初めの調節 */}
        {Array.from({ length: lastday.getDay() }, (_, i) => (
            <div key={`empty-${i}`} className="text-center text-gray-400 border-2 h-20">{''}</div>
        ))}
        
        {/* {dayArray.map((day:any, index:any) => (
            ((index + lastday.getDay()) % 7 === 0 || (index + lastday.getDay()) % 7 === 6) ? (
                <div
                key={day}
                className={`text-center border-2 h-20 bg-gray-100`}
                >
                {day}
                </div>
            ) : (
                <div
                key={day}
                className={`text-center border-2 h-20 hover:border-cyan-400 `}
                onClick={() => { setShowModal(true); setselectedDay(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+day); }}
                >
                    {day}
                    {interview[date.getFullYear()+"-"+(date.getMonth()+1)+"-"+day] ? (
                    <div className="w-9/12 h-auto mx-auto rounded bg-blue-300 text-xxs my-1">予約</div>
                    ):""}
                    {selectedTimes[date.getFullYear()+"-"+(date.getMonth()+1)+"-"+day] ? (
                    <div className="w-9/12 h-auto mx-auto rounded bg-red-300 text-xxs my-1">NG</div>
                    ):""}
                </div>
            )
        ))} */}
        {dayArray.map((day:any, index:any) => {
        const selectedDate = `${date.getFullYear()}-${(date.getMonth() < 9 ? '0' : '')}${date.getMonth() + 1}-${(day < 10 ? '0' : '')}${day}`;
        const hasBookingForDate = bookings.some((booking: { detail: string; name: string; time: string[]; ymd: string }) => booking.ymd === selectedDate);

        return ((index + lastday.getDay()) % 7 === 0 || (index + lastday.getDay()) % 7 === 6) ? (
            <div
                key={day}
                className={`text-center border-2 h-20 bg-gray-100`}
            >
                {day}
            </div>
            ) : (
            <div
                key={day}
                className={`text-center border-2 h-20 hover:border-cyan-400 `}
                onClick={() => { 
                clearState(); 
                setShowModal(true);
                setOpen(false); 
                setselectedDay(selectedDate);
                bookingreload();
                }}
            >
                {day}
                {hasBookingForDate ? (
                <div className="w-9/12 h-auto mx-auto rounded bg-blue-300 text-xxs my-1">予約</div>
                ) : ""}
                {selectedTimes[selectedDate] ? (
                <div className="w-9/12 h-auto mx-auto rounded bg-red-300 text-xxs my-1">NG</div>
                ) : ""}
            </div>
            );
        })}

    </div>
    </>
)
}