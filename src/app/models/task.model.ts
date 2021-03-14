export class Task {
  public user: string;
  public status: string;
  public date: string;

  constructor(user: string, status: string, date) {
    this.user = user;
    this.status = status;
    this.date = date;
  }
}
