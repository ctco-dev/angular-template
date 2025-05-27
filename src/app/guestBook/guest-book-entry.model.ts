import { Author } from "./author.model";

export interface GuestBookEntry {
  author: Author,
  message: string,
  creationDate: Date,
}
