export type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
  emailVerified: Date | null;
  image: string | null;
  hashedPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
  studentProfile?: StudentProfile | null;
  accounts: Account[];
};

export type StudentProfile = {
  id: string;
  department: string | null;
  schoolYear: string | null;
  tel: string | null;
  graduationYear: string | null;
  qualification: string | null;
  workLocation: string | null;
  user: User;
  userId: string;
  record: Record[];
};

export type Record = {
  id: string;
  content: string | null;
  progress: string | null;
  date: Date;
  studentProfileId: string;
  studentProfile: StudentProfile;
};

export type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
  user: User;
};

export type StaffNg = {
  id: string;
  email: string | null;
  ymd: string | null;
  time: string[];
  staffName: string | null;
};

export type WaitingList = {
  id: string;
  studentEmail: string | null;
  staffEmail: string | null;
  ymd: string | null;
  time: string[];
  details: string | null;
};

export type Booking = {
  id: string;
  studentEmail: string | null;
  staffEmail: string | null;
  ymd: string | null;
  time: string[];
  details: string | null;
};
