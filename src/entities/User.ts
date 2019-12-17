export enum UserRoles {
  Standard,
  Admin,
}

type TUserRoles =
  UserRoles.Standard |
  UserRoles.Admin;


export interface IUser {
  id?: number;
  name: string;
  first_name: string;
  last_name: string;
  pwdHash: string;
  role: TUserRoles;
}


export class User implements IUser {

  public id?: number;
  public name: string;
  public first_name: string;
  public last_name: string;
  public pwdHash: string;
  public role: TUserRoles;


  constructor(
    name: string,
    nameOrUser?: string | IUser,
    first_name?: string,
    last_name?: string,
    pwdHash?: string,
    role?: TUserRoles,
  ) {
    if (typeof nameOrUser === 'string' || typeof nameOrUser === 'undefined') {
      this.name = nameOrUser || '';
      this.first_name = first_name || '';
      this.last_name = last_name || '';
      this.pwdHash = pwdHash || '';
      this.role = role || UserRoles.Standard;
    } else {
      this.name = nameOrUser.name;
      this.first_name = nameOrUser.first_name;
      this.last_name = nameOrUser.last_name;
      this.role = nameOrUser.role;
      this.pwdHash = nameOrUser.pwdHash;
    }
  }
}
