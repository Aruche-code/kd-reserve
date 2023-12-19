//-----プロフィールページで使用しています。--------------------------------------------------------------
// プロフィールStudentProfileの定義
export interface StudentProfile {
  department: string;
  schoolYear: string;
  tel: string;
  graduationYear: string;
  qualification: string;
  workLocation: string;
}

// プロフィールUserの定義
export interface User {
  name: string;
  email: string;
  studentProfile: StudentProfile | null;
}

// プロフィールApiResponseの定義
export interface ApiResponse {
  message: string;
  user: User[];
}
//-----------------------------------------------------------------------------------------
