
import Sidebar from "../../components/sidebar2";
import "../../globals.css";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <div className="flex flex-col h-screen">
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 p-4 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    </div>
  );
}
