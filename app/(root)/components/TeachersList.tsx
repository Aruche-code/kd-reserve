"use client";
import React from "react";

const TeachersList = ({ teachers, onSelect, selectedTeacherId }: any) => {
  return (
    <div>
      <h1>先生一覧</h1>
      {teachers.map((teacher: any) => (
        <div
          key={teacher.id}
          onClick={() => onSelect(teacher.id)}
          style={{
            padding: "10px",
            margin: "5px",
            border: "1px solid black",
            backgroundColor:
              selectedTeacherId === teacher.id ? "#ADD8E6" : "#FFFFFF",
            cursor: "pointer",
          }}
        >
          <h2>{teacher.name}</h2>
          {/* 他の情報も必要に応じて */}
        </div>
      ))}
    </div>
  );
};

export default TeachersList;
