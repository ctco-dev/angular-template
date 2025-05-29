export interface GuestEntry {
  name: string;
  email: string;
  message: string;
}

export interface GuestBookState {
  entries: GuestEntry[];
  selectedEntry: GuestEntry | null;
  showPopup: boolean;
  loading: boolean;
}