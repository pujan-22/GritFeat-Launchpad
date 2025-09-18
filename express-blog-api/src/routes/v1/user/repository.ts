import User, { IUser } from "../../../models/User";

const UserRepository = {
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  },

  async findUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  },

  async createUser(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "admin" | "blogger";
  }): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }
};

export default UserRepository;