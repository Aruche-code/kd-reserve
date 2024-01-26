// 職員用レイアウト
import Sidebar from "@/app/components/sidebar/StaffSidebar";
export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex flex-col flex-1 px-4 overflow-auto py-20 bg-kd-m md:pl-100px lg:pl-100px md:py-4 lg:py-4">
          {/* <main className="flex-1 container max-w-screen-xl mx-auto py-4 px-4 "> */}
          {children}
          {/* </main> */}
        </div>
      </div>
    </div>
  );
}
