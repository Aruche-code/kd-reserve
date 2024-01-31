import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function Calendar({
    date, 
    daysInMonth,
    prevMonth,
    nextMonth,
    setselectedDay,
    selectedTimes,
    setOpen,
    clearState,
    bookings,
    bookingreload,
    handleTabClick
}: any) {

const year = date.getFullYear();
const month = date.getMonth();
const lastday = new Date(year, month)

const dayArray = daysInMonth();

return (
    <>
    <div className="bg-white">
        <div className="text-xl w-full text-center">{year}年</div>

        <div className="flex justify-center items-center mb-1">
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

        <div className="grid grid-cols-7 w-11/12 mx-auto h-20 bg-white">

            {/* 曜日表示 */}
            {['日', '月', '火', '水', '木', '金', '土'].map(day => (
                <div key={day} className="text-center font-bol">{day}</div>
            ))}

            {/* 月の初めの調節 */}
            {Array.from({ length: lastday.getDay() }, (_, i) => (
                <div key={`empty-${i}`} className="text-center text-gray-400 border-2 h-20">{''}</div>
            ))}
            
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
                    setOpen(true); 
                    clearState(); 
                    setselectedDay(selectedDate);
                    bookingreload();
                    handleTabClick("ng")
                    }}
                >
                    {day}
                    {hasBookingForDate ? (
                    <div className="w-9/12 h-auto mx-auto rounded bg-blue-300 text-xxs my-1">予約あり</div>
                    ) : ""}
                    {selectedTimes[selectedDate] ? (
                    <div className="w-9/12 h-auto mx-auto rounded bg-red-300 text-xxs my-1">NG日程あり</div>
                    ) : ""}
                </div>
                );
            })}

        </div>
    </div>
    </>
)
}