"use client";
// 職員用サイドバーです
import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodaySharpIcon from "@mui/icons-material/CalendarTodaySharp";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // アクティブなメニューを追跡するための状態

  const Menus = [
    { title: "ホーム", icon: <HomeIcon />, link: "/staff", gap: false },
    {
      title: "カレンダー",
      icon: <BadgeIcon />, //適切なアイコンに変えてください
      link: "/staff/calendar",
      gap: false,
    },
    {
      title: "承認待ちリスト",
      icon: <CalendarTodaySharpIcon />, //適切なアイコンに変えてください
      link: "/staff/waitinglist",
      gap: false,
    },

    {
      title: "ログアウト",
      icon: <LogoutIcon />, // ログアウトアイコン
      action: () => signOut(), // ログアウト機能
      gap: true,
    },
  ];

  return (
    <aside>
      <div className="flex">
        <div
          className={`${
            open ? "w-46" : "w-20"
          } h-screen p-5 pt-8 relative duration-300 bg-kd-sub2-cl`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <ul className="pt-6">
            {Menus.map((menu, index) =>
              menu.link ? (
                <Link href={menu.link} key={index}>
                  <li
                    className={`flex rounded-md p-2 cursor-pointer hover:bg-white text-kd-button-cl text-sm items-center gap-x-4
                  ${menu.gap ? "mt-9" : "mt-2"} 
                  ${pathname === menu.link && " bg-white"}`}
                    style={{ whiteSpace: "nowrap", overflow: "hidden" }} // 日本語対応
                  >
                    {menu.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {menu.title}
                    </span>
                  </li>
                </Link>
              ) : (
                <li
                  key={index}
                  onClick={menu.action} // アクションを追加
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-white text-kd-button-cl text-sm items-center gap-x-4
                  ${menu.gap ? "mt-9" : "mt-2"} 
                  ${pathname === menu.link && " bg-white"}`}
                  style={{ whiteSpace: "nowrap", overflow: "hidden" }} // 日本語対応
                >
                  {menu.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menu.title}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
