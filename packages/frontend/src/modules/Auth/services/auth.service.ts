import { HttpService } from '../../common/services/http.service';
import { BACKEND_KEYS } from '../../common/consts/app-keys.const';
import { IUser } from '../../common/types/user';

export class AuthService extends HttpService {
  async login(param: IUser): Promise<IUser> {
    return this.post(`${BACKEND_KEYS.USER}/${BACKEND_KEYS.LOGIN}`, param);
  }

  async register(param: IUser): Promise<IUser> {
    return this.post(`${BACKEND_KEYS.USER}/${BACKEND_KEYS.REGISTER}`, param);
  }

  async current(): Promise<IUser> {
    return this.get(`${BACKEND_KEYS.USER}/${BACKEND_KEYS.CURRENT}`);
  }

  async logout() {
    return this.post(`${BACKEND_KEYS.USER}/${BACKEND_KEYS.LOGOUT}`, {});
  }
}

export const authService = new AuthService();
