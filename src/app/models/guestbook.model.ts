import { Author } from "./author.model";

export interface GuestbookEntry {
  id: number;
  author: Author
  message: string;
  createdAt: Date;
}

export interface GuestbookEntryForm {
  name: string,
  email: string;
  message: string;
}