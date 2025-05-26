export interface GuestEntry {
  id?: string;
  author: {
    name: string;
    email: string;
  };
  message: string;
  createdAt: Date;
}