"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { User } from "@/app/components/types";

const UserProfile = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/student/profile");
        console.log(response);
        setUserData(response.data.user);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {userData.map((user) => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {user.studentProfile && (
            <div>
              <h2>Student Profile</h2>
              <p>Department: {user.studentProfile.department}</p>
              <p>tel: {user.studentProfile.tel}</p>
              <p>graduationYear: {user.studentProfile.graduationYear}</p>
              <p>qualification: {user.studentProfile.qualification}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
