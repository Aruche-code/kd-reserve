"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserEmail = () => {
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // API エンドポイントへのリクエスト
    const fetchUserEmail = async () => {
      try {
        const response = await axios.get("/api/student/profile"); // ここに適切なエンドポイントのパスを設定
        setUserEmail(response.data.useremail);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUserEmail();
  }, []);

  return (
    <div>
      {error ? (
        <p>エラーが発生しました: {error}</p>
      ) : (
        <p>ユーザーのメール: {userEmail}</p>
      )}
    </div>
  );
};

export default UserEmail;
