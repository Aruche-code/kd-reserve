export interface User {
  id: string;
  name: string;
  email: string;
  studentProfile?: {
    department: string;
    schoolYear: string;
    tel: string;
    graduationYear: string;
    qualification: string;
    workLocation: string;
  };
}
