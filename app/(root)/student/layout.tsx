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
        {/* px-4 py-4 お試し削除 */}
        <div className="flex flex-col flex-1  overflow-auto">
          {/* <main className="flex-1 container max-w-screen-xl mx-auto px-52"> */}
          {children}
          {/* </main> */}
        </div>
      </div>
    </div>
  );
}
