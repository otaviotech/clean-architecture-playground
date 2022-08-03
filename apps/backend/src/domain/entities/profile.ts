export class Profile {
  id: string;
  username: string;
  email: string;
  password: string;
  followers: Profile[];
  following: Profile[];
  createdAt: Date;
  updatedAt: Date;
}
