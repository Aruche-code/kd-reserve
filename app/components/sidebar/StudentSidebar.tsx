"use client";
// 生徒用サイドバーです
import { useState, useEffect } from "react";
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
    { title: "ホーム", icon: <HomeIcon />, link: "/student", gap: false },
    {
      title: "プロフィール",
      icon: <BadgeIcon />, //適切なアイコンに変えてください
      link: "/student/profile",
      gap: false,
    },
    {
      title: "予約",
      icon: <CalendarTodaySharpIcon />, //適切なアイコンに変えてください
      link: "/student/booking",
      gap: false,
    },

    {
      title: "ログアウト",
      icon: <LogoutIcon />, // ログアウトアイコン
      action: () => signOut(), // ログアウト機能
      gap: true,
    },
  ];

  //標準ナビゲーションバーcomponent
  const renderSidebar = () => (
    <aside
      style={
        {
          // position: "absolute",
          // zIndex: 100,
          // top: 0,
          // left: 0,
          // width: "200px",
          // height: "100%",
        }
      }
    >
      <div className="flex">
        <div
          className={`${
            open ? "w-46" : "w-20"
          } h-screen p-5 pt-8 relative duration-300 bg-kd-s`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <ul className="pt-6 text-kd-a">
            {Menus.map((menu, index) =>
              menu.link ? (
                <Link href={menu.link} key={index}>
                  <li
                    className={`flex rounded-md p-2 cursor-pointe hover:bg-kd-m hover:text-kd-button-cl text-sm items-center gap-x-4 
                  ${menu.gap ? "mt-9" : "mt-2"} 
                  ${pathname === menu.link && " bg-kd-m text-kd-button-cl "}`}
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
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-white hover:text-kd-button-cl text-sm items-center gap-x-4
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

  // CSSでレスポンシブデザインを制御
  return (
    <>
      {/* デスクトップ向けサイドバー（mdブレークポイント以上でのみ表示） */}
      <div className="hidden md:flex">{renderSidebar()}</div>
    </>
  );
};

export default Sidebar;
