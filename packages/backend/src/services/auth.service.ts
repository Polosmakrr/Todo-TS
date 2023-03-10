import { url } from 'gravatar';
import { sign } from 'jsonwebtoken';
import { compare, hashSync } from 'bcryptjs';
import { ObjectId } from 'mongoose';
import { CustomError } from '../error/custom.error';
import { IUser } from '../types/users.type';
import User from '../models/User';

export default class AuthService {
  register = async (body: IUser): Promise<IUser> => {
    const hashedPassword = hashSync(body.password, Number(process.env.SALT));
    const avatar = url(body.email, {
      s: '200',
      r: 'pg',
      d: '404'
    });
    const user = new User({ ...body, password: hashedPassword, avatarURL: avatar });
    try {
      await user.save();
    } catch (error) {
      if (error?.message.includes('duplicate key error collection')) {
        throw new CustomError(400, 'Email in use');
      }
      throw error;
    }
    return user;
  };

  login = async ({ email, password }: IUser): Promise<IUser | null> => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError(401, 'Email or password is wrong');
    }
    const comparedPassword = await compare(password, user.password);

    if (!comparedPassword) {
      throw new CustomError(401, 'Email or password is wrong');
    }
    const token = sign({ id: user._id }, process.env.JWT_SECRET);
    return User.findByIdAndUpdate(user._id, { token }, { new: true });
  };

  logout = async (userId: ObjectId) =>
    User.findByIdAndUpdate(userId, { token: null }, { new: true });
}
