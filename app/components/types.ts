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

//------予約画面で使用する教師一覧情報とNG日時です。-----------------------------------------

//職員プロフィールの定義
export interface StaffProfile {
  gender: string;
  Strengths: string;
  tastes: string;
  workhistory: string;
}

//
export interface Staff {
  id: string;
  name: string;
  staffProfile?: StaffProfile | null;
}

export interface StaffNgData {
  ymd: string;
  time: string[];
}
