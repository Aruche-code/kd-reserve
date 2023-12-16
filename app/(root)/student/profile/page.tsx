"use client";
import React from "react";
import useSWR from "swr";
import { User } from "@/app/components/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserProfile = () => {
  const { data, error } = useSWR("/api/student/profile", fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  // Assuming your API response structure is { user: User[] }
  const userData = data.user;

  return (
    <div>
      <h1>ユーザープロフィール</h1>
      {userData.map((user: User) => (
        <div key={user.id}>
          <p>{user.id}</p>
          <p>名前: {user.name}</p>
          <p>メール: {user.email}</p>
          {user.studentProfile && (
            <div>
              <p>学科: {user.studentProfile.department}</p>
              <p>学年: {user.studentProfile.schoolYear} 年</p>
              <p>電話番号: {user.studentProfile.tel}</p>
              <p>卒業予定年: {user.studentProfile.graduationYear}</p>
              <p>所持資格: {user.studentProfile.qualification}</p>
              <p>希望勤務地: {user.studentProfile.workLocation}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserProfile;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { User } from "@/app/components/types";

// const UserProfile = () => {
//   const [userData, setUserData] = useState<User[]>([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/api/student/profile");
//         console.log(response);
//         setUserData(response.data.user);
//       } catch (err: any) {
//         setError(err.message);
//       }
//     };

//     fetchData();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>ユーザープロフィール</h1>
//       {userData.map((user) => (
//         <div key={user.id}>
//           <p>名前: {user.name}</p>
//           <p>メール: {user.email}</p>
//           {user.studentProfile && (
//             <div>
//               <h2>マイプロフィール</h2>
//               <p>学科: {user.studentProfile.department}</p>
//               <p>学年: {user.studentProfile.schoolYear} 年</p>
//               <p>電話番号: {user.studentProfile.tel}</p>
//               <p>卒業予定年: {user.studentProfile.graduationYear}</p>
//               <p>所持資格: {user.studentProfile.qualification}</p>
//               <p>希望勤務地: {user.studentProfile.workLocation}</p>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserProfile;
