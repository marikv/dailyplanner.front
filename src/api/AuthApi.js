import { BaseApi } from 'src/api/BaseApi';
import { User } from 'src/db/User';
import { uid } from 'quasar';
import { useAuthStore } from 'stores/authStore';

export class AuthApi extends BaseApi {
  async register(data) {
    return this.post('/auth/register', data);
  }

  async login(data) {
    return this.post('/auth/login', data);
  }

  static setCurrentUser(data) {
    if (data
      && data.accessToken
      && data.user
      && data.user.id
    ) {
      const currentUserData = {
        hash: uid(),
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        token: data.accessToken,
      };
      User.update(currentUserData);

      (useAuthStore()).setCurrentUser(currentUserData);
    }
  }
}
