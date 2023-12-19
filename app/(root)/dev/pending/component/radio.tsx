import { useState } from "react";

const YourComponent = () => {
    const [selectedOption, setSelectedOption] = useState(""); // 選択されたラジオボタンの値を格納する state

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="flex flex-col">
            <label>
                <input
                    type="radio"
                    value="firstChoice"
                    checked={selectedOption === "firstChoice"}
                    onChange={handleRadioChange}
                />
                <span>第1希望</span>
            </label>
            <label>
                <input
                    type="radio"
                    value="secondChoice"
                    checked={selectedOption === "secondChoice"}
                    onChange={handleRadioChange}
                />
                <span>第2希望</span>
            </label>
            <label>
                <input
                    type="radio"
                    value="thirdChoice"
                    checked={selectedOption === "thirdChoice"}
                    onChange={handleRadioChange}
                />
                <span>第3希望</span>
            </label>
        </div>
    );
};