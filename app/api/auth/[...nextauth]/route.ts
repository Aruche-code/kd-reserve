//ハンドラを呼び出し
import { handler } from "@/app/libs/auth";
// ハンドラをGETおよびPOSTリクエスト用にエクスポート
export { handler as GET, handler as POST };
