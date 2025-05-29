export interface GuestBookEntry {
  id?: number;
  author: GuestBookAuthor;
  message: string;
}

export interface GuestBookAuthor {
  name: string;
  email: string;
}
