export interface Agent {
  uuid: string;
  email: string;
  fullName: string;
  phone: string | null;
  agencyName: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
