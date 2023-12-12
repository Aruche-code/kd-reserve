"use client";

// children を使用するタイプの予備として残しておきます
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // アクティブなメニューを追跡するための状態

  const Menus = [
    { title: "home", icon: <HomeIcon />, link: "/student", gap: false },
    {
      title: "plofile",
      icon: <InsertPhotoIcon />, //適切なアイコンに変えてください
      link: "/student/plofile",
      gap: false,
    },
    {
      title: "booking",
      icon: <SettingsIcon />, //適切なアイコンに変えてください
      link: "/student/booking",
      gap: true,
    },
  ];

  return (
    <aside>
      <div className="flex">
        <div
          className={`${
            open ? "w-40" : "w-20"
          } h-screen p-5 pt-8 relative duration-300`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <ul className="pt-6">
            {Menus.map((menu, index) => (
              <Link href={menu.link} key={index}>
                <li
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-cyan-100 text-sky-500 text-sm items-center gap-x-4
                  ${menu.gap ? "mt-9" : "mt-2"} 
                  ${pathname === menu.link && "bg-cyan-100"}`}
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
        {children}
      </div>
    </aside>
  );
};

export default Sidebar;
