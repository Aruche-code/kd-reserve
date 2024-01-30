// 生徒用レイアウト
import Sidebar from "@/app/components/sidebar/StudentSidebar2";
export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 px-4 overflow-auto py-20 bg-kd-m md:pl-100px lg:pl-100px md:py-4 lg:py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
