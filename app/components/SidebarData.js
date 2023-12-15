import HomeIcon from "@mui/icons-material/Home";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
//import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CreateIcon from "@mui/icons-material/Create";
import SettingsIcon from "@mui/icons-material/Settings";

export const SidebarData = [
    {
        title: "初来ページ",
        icon: <HomeIcon />,
        link: "/dev/",
    },
    {
        title: "プロフィール編集",
        icon: <PersonAddIcon />,
        link: "/dev/profile",
    },
    {
        title: "プロフィール画面",
        icon: <PersonAddIcon />,
        link: "/dev/profile1",
    },
    {
        title: "NG日程管理画面",
        icon: <EditCalendarIcon />,
        link: "/dev/home",
    },
    {
        title: "生徒用ホーム画面",
        icon: <EditCalendarIcon />,
        link: "/dev/homest",
    },
    {
        title: "教員用ホーム画面",
        icon: <EditCalendarIcon />,
        link: "/dev/hometeacher",
    },
    {
        title: "予約画面",
        icon: <EditCalendarIcon />,
        link: "/dev/booking",
    },
    {
        title: "承認待ち画面",
        icon: <EditCalendarIcon />,
        link: "/dev/waiting",
    },
    {
        title: "学生カルテ",
        icon: <EditCalendarIcon />,
        link: "/dev/record",
    },
    {
        title: "学生カルテ一覧",
        icon: <EditCalendarIcon />,
        link: "/dev/students",
    },
    {
        title: "設定",
        icon: <SettingsIcon />,
        link: "/dev/",
    },
    {
        title: "動作確認用",
        icon: <CreateIcon />,
        link: "/dev/user",
    },
];
