import React from "react";
import { Staff } from "@/app/components/types";

/**
 * StaffList Component
 * @param {Array} staff - 職員のデータを含む配列。
 * @param {Function} onSelect - 職員が選択された時に呼び出される関数。選択された職員のIDを引数として受け取る。
 * @param {String} selectedTeacherId - 現在選択されている職員のID。このIDは選択された職員をハイライト表示するために使用される。
 */

interface StaffListProps {
  staff: Staff[];
  onSelect: (id: string) => void;
  selectedTeacherId: string | null;
}

const StaffList: React.FC<StaffListProps> = ({
  staff,
  onSelect,
  selectedTeacherId,
}) => {
  return (
    <div className="flex flex-wrap">
      <h1 className="w-full">先生一覧</h1>
      {staff.map((staffMember) => (
        <div
          key={staffMember.id}
          onClick={() => onSelect(staffMember.id)}
          className={`p-2 m-1 border rounded cursor-pointer ${
            selectedTeacherId === staffMember.id ? "bg-blue-200" : "bg-white"
          }`}
        >
          <h2>{staffMember.name}</h2>
          {/* 必要に応じて取り出してください */}
          {/* {staffMember.staffProfile ? (
            <div>
              <p>性別: {staffMember.staffProfile.gender}</p>
              <p>特技: {staffMember.staffProfile.Strengths}</p>
              <p>趣味: {staffMember.staffProfile.tastes}</p>
              <p>勤務歴: {staffMember.staffProfile.workhistory}</p>
            </div>
          ) : (
            <p>プロフィ―ル情報はありません</p>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default StaffList;
