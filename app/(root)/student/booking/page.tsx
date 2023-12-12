"use client";
// 予約画面
import useSWR from "swr";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface ApiResponse {
  message: string;
  staffusers: StaffUser[];
}

// SWR

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const StaffUsersComponent = () => {
//   const { data, error } = useSWR<ApiResponse>("/api/getstaffusers", fetcher);

//   if (error) return <div>Failed to load</div>;
//   if (!data) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Staff Users</h1>
//       <ul>
//         {data.staffusers.map((user) => (
//           <li key={user.id}>{user.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StaffUsersComponent;

//axios
const fetchStaffUsers = async (): Promise<StaffUser[]> => {
  try {
    const response = await axios.get<ApiResponse>("/api/getstaffusers");
    return response.data.staffusers;
  } catch (error) {
    console.error("Error fetching staff users", error);
    return [];
  }
};

const StaffUsersComponent = () => {
  const [staffUsers, setStaffUsers] = useState<StaffUser[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const users = await fetchStaffUsers();
      setStaffUsers(users);
    };

    loadData();
  }, []);

  return (
    <div>
      <h1>Staff Users</h1>
      <ul>
        {staffUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StaffUsersComponent;
