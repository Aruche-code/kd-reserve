"use client";

import React, { useState } from "react";
import Link from "next/link";

const Waiting = () => {
  const [selectedName, setSelectedName] = useState("田中 次郎");
  const [isNominationSelected, setIsNominationSelected] = useState(true);

  const handleNominationClick = () => {
    setSelectedName("田中 次郎");
    setIsNominationSelected(true);
  };

  const handleNoNominationClick = () => {
    setSelectedName("山田 次郎");
    setIsNominationSelected(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-1/2">
        <div className="flex flex-row justify-center">
          <button
            className={`w-1/2 p-2 rounded-lg shadow-lg border ${isNominationSelected ? 'border-sky-700 bg-sky-700 text-white' : 'border-gray-400 bg-gray-400'}`}
            onClick={handleNominationClick}
          >
            指名あり
          </button>
          <button
            className={`w-1/2 p-2 rounded-lg shadow-lg border ${!isNominationSelected ? 'border-sky-700 bg-sky-700 text-white' : 'border-gray-400 bg-gray-400'}`}
            onClick={handleNoNominationClick}
          >
            指名なし
          </button>
        </div>
      </div>
      <div className="h-full -m-2 w-1/2 shadow-lg border border-gray-400 bg-white">
        <div className="flex flex-col justify-center items-center">
          <div className="p-3 m-4 shadow-lg rounded-lg border border-gray-300 bg-white">
            {selectedName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waiting;
