import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserWithThatEmailAlreadyExistsException } from "../exceptions/UserWithThatEmailAlreadyExistsException";
import CreateUserDto from "../users/user.dto";
import userModel from "../users/user.model";
import { IUser } from "../users/user.interface";
import { IDataStoredInToken, ITokenData } from "./authentication.interface";
import LogInDto from "./logIn.dto";
import { WrongCredentialsException } from "../exceptions/WrongCredentialsException";

class AuthenticationService {
  public user = userModel;
  public async register(userData: CreateUserDto) {
    if (await this.user.findOne({ email: userData.email })) {
      throw new UserWithThatEmailAlreadyExistsException();
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await this.user.create({
      ...userData,
      password: hashedPassword,
    });

    // user.password = undefined;
    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    return {
      user,
      cookie,
      token: tokenData.token,
    };
  }

  public async login(logInData: LogInDto) {
    const user = await this.user.findOne({ email: logInData.email });
    if (user) {
      const vp = await bcrypt.compare(logInData.password, user.password);
      if (vp) {
        const tokenData = this.createToken(user);
        const cookie = this.createCookie(tokenData);
        return { user, cookie, token: tokenData.token };
      } else {
        throw new WrongCredentialsException();
      }
    } else {
      throw new WrongCredentialsException();
    }
  }

  public createToken = (user: IUser): ITokenData => {
    const expiresIn = 60 * 60;
    const secret = process.env.SECRET_KEY ?? "";

    const dataStoredInToken: IDataStoredInToken = {
      _id: user._id,
    };

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  };

  public createCookie = (tokenData: ITokenData) => {
    return `Authorization=${tokenData.token}; HttpOnly; MaxAge=${tokenData.expiresIn}`;
  };
}

export default AuthenticationService;
