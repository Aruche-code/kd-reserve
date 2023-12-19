import React from "react";
import Link from "next/link";
import { SidebarData } from "./SidebarData";

// Saidbar 共通コンポーネント: アプリケーションのSaidbarを表示する
// Props:
// - none:
const Sidebar2 = () => {
  return (
    <aside className="flex-shrink-0 w-48 bg-blue-600 text-white">
      <nav className="p-4">
        <ul>
          {SidebarData.map((item, key) => (
            <li
              key={key}
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <Link
                className="flex items-center text-sm font-medium"
                href={item.link}
              >
                <span className="pr-5">{item.icon}</span>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar2;

// "use client";
// // プレーンスタイルです
// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import HomeIcon from "@mui/icons-material/Home";
// import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
// import SettingsIcon from "@mui/icons-material/Settings";

// const Sidebar = () => {
//   const [open, setOpen] = useState(false);
//   const pathname = usePathname(); //  アクティブなメニューを追跡するための状態

//   const Menus = [
//     { title: "ホーム画面", icon: <HomeIcon />, link: "/dev/home", gap: false },
//     {
//       title: "NG日程予約管理",
//       icon: <InsertPhotoIcon />,
//       link: "/dev/homest",
//       gap: false,
//     },
//     { title: "none", icon: <SettingsIcon />, link: "/", gap: true },
//   ];

//   return (
//     <aside>
//       <div className="flex bg-blue-400">
//         <div
//           className={`${
//             open ? "w-40" : "w-20"
//           } h-screen p-5 pt-8 relative duration-300`}
//           onMouseEnter={() => setOpen(true)}
//           onMouseLeave={() => setOpen(false)}
//         >
//           <ul className="pt-6">
//             {Menus.map((menu, index) => (
//               <Link href={menu.link} key={index}>
//                 <li
//                   className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-100 text-sm items-center gap-x-4
//                 ${menu.gap ? "mt-9" : "mt-2"} 
//                 ${pathname === menu.link && "bg-cyan-100"}`}
//                 >
//                   {menu.icon}
//                   <span
//                     className={`${!open && "hidden"} origin-left duration-200 `}
//                   >
//                     {menu.title}
//                   </span>
//                 </li>
//               </Link>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

