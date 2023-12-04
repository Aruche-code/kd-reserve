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
        link: "/",
    },
    {
        title: "プロフィール編集",
        icon: <PersonAddIcon />,
        link: "/profile",
    },
    {
        title: "プロフィール画面",
        icon: <PersonAddIcon />,
        link: "/profile1",
    },
    {
        title: "ホーム画面",
        icon: <EditCalendarIcon />,
        link: "/home",
    },
    {
        title: "予約画面",
        icon: <EditCalendarIcon />,
        link: "/booking",
    },
    {
        title: "新規登録",
        icon: <EditCalendarIcon />,
        link: "/signup",
    },
    {
        title: "ログイン",
        icon: <EditCalendarIcon />,
        link: "/login",
    },
    {
        title: "パスワード再設定画面",
        icon: <EditCalendarIcon />,
        link: "/password",
    },
    {
        title: "学生カルテ",
        icon: <EditCalendarIcon />,
        link: "/record",
    },
    {
        title: "設定",
        icon: <SettingsIcon />,
        link: "/",
    },
    {
        title: "動作確認用",
        icon: <CreateIcon />,
        link: "/user",
    },
];
