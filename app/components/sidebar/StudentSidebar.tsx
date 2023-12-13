"use client";
// 生徒用サイドバーです
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodaySharpIcon from "@mui/icons-material/CalendarTodaySharp";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // アクティブなメニューを追跡するための状態

  const Menus = [
    { title: "home", icon: <HomeIcon />, link: "/student", gap: false },
    {
      title: "plofile",
      icon: <BadgeIcon />, //適切なアイコンに変えてください
      link: "/student/profile",
      gap: false,
    },
    {
      title: "booking",
      icon: <CalendarTodaySharpIcon />, //適切なアイコンに変えてください
      link: "/student/booking",
      gap: false,
    },
    {
      title: "setting",
      icon: <SettingsIcon />, //適切なアイコンに変えてください
      link: "/student/setting",
      gap: true,
    },
  ];

  return (
    <aside>
      <div className="flex">
        <div
          className={`${
            open ? "w-40" : "w-20"
          } h-screen p-5 pt-8 relative duration-300 bg-kd-sub2-cl`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <ul className="pt-6">
            {Menus.map((menu, index) => (
              <Link href={menu.link} key={index}>
                <li
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-white text-kd-button-cl text-sm items-center gap-x-4
                  ${menu.gap ? "mt-9" : "mt-2"} 
                  ${pathname === menu.link && " bg-white"}`}
                >
                  {menu.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menu.title}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
