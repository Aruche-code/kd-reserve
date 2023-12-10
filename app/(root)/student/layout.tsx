// 生徒用レイアウト
import Sidebar from "@/app/components/sidebar/StudentSidebar";
export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 py-2.5 pr-4 overflow-auto">
          {/* <main className="flex-1 container max-w-screen-xl mx-auto py-4 px-4 "> */}
          {children}
          {/* </main> */}
        </div>
      </div>
    </div>
  );
}
