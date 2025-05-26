export interface GuestBookEntry {
  author: GuestBookAuthor;
  message: string;
}

export interface GuestBookAuthor {
  name: string;
  email: string;
}
