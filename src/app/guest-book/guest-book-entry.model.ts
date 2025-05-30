import { Author } from "./author.model";

export interface GuestBookEntry {
  id: string,
  author: Author,
  message: string,
  creationDate?: Date,
}
