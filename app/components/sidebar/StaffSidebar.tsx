"use client";
// 職員用サイドバーです
import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarTodaySharpIcon from "@mui/icons-material/CalendarTodaySharp";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // アクティブなメニューを追跡するための状態

  const Menus = [
    { title: "ホーム", icon: <HomeIcon />, link: "/staff", gap: true },
    {
      title: "カレンダー",
      icon: <CalendarTodaySharpIcon />, //適切なアイコンに変えてください
      link: "/staff/calendar",
      gap: false,
    },
    {
      title: "承認待ちリスト",
      icon: <FormatListBulletedIcon />, //適切なアイコンに変えてください
      link: "/staff/approvallist",
      gap: false,
    },
    {
      title: "学生カルテ一覧",
      icon: <BadgeIcon />, //適切なアイコンに変えてください
      link: "/staff/students",
      gap: false,
    },
    {
      title: "ログアウト",
      icon: <LogoutIcon />, // ログアウトアイコン
      action: () => signOut(), // ログアウト機能
      gap: true,
    },
  ];

  // モバイル向けナビゲーションバーcomponent
  const renderMobileNav = () => (
    <>
      <div className="fixed inset-x-0 top-0 z-30 bg-kd-sub2-cl text-white">
        <div className="flex justify-between items-center p-5">
          <div className="p-2 cursor-pointer" onClick={() => setOpen(!open)}>
            {/* ハンバーガーメニューアイコン */}
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </div>
          <span className="flex-grow text-center text-xl">KD-Reserve</span>
          <div className="p-2" onClick={() => signOut()}>
            {/* ログアウトアイコン */}
            <LogoutIcon />
          </div>
        </div>
        {open && (
          <ul className={`opacity-100 pt-2 pb-2 transition-opacity duration-500 ${open ? "" : "opacity-0"}`}>
            {Menus.map((menu, index) =>
              menu.link ? (
                <Link href={menu.link} key={index}>
                  <li
                    className={`flex items-center gap-x-4 p-2 cursor-pointer hover:bg-white hover:text-kd-button-cl text-sm ${pathname === menu.link ? "bg-white text-kd-button-cl" : ""
                      }`}
                  >
                    {menu.icon}
                    <span>{menu.title}</span>
                  </li>
                </Link>
              ) : (
                <li
                  key={index}
                  onClick={menu.action}
                  className="flex items-center gap-x-4 p-2 cursor-pointer hover:bg-white hover:text-kd-button-cl text-sm"
                >
                  {menu.icon}
                  <span>{menu.title}</span>
                </li>
              )
            )}
          </ul>
        )}
      </div>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );

  //標準ナビゲーションバーcomponent
  const renderSidebar = () => (
    <aside style={{
      position: "absolute",
      zIndex: 100,
      top: 0,
      left: 0,
      width: "200px",
      height: "100%",
    }}>
      <div className="flex">
        <div
          className={`${open ? "w-48" : "w-20"
            } h-screen p-5 pt-8 relative duration-300 bg-kd-sub2-cl`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div
            className={`w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center absolute top-4 left-4 mt-2`}
          >
            職員
          </div>
          <ul className="pt-6 text-white">
            {Menus.map((menu, index) =>
              menu.link ? (
                <Link href={menu.link} key={index}>
                  <li
                    className={`flex rounded-md p-2 cursor-pointe hover:bg-white hover:text-kd-button-cl text-sm items-center gap-x-4 
                  ${menu.gap ? "mt-9" : "mt-2"} 
                  ${pathname === menu.link && " bg-white text-kd-button-cl "}`}
                    style={{ whiteSpace: "nowrap", overflow: "hidden" }} // 日本語対応
                  >
                    {menu.icon}
                    <span
                      className={`${!open && "hidden"} origin-left duration-200`}
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
      {/* モバイル向けナビゲーションバー（mdブレークポイント以下でのみ表示） */}
      <div className="md:hidden">{renderMobileNav()}</div>

      {/* デスクトップ向けサイドバー（mdブレークポイント以上でのみ表示） */}
      <div className="hidden md:flex">{renderSidebar()}</div>
    </>
  );
};

export default Sidebar;
