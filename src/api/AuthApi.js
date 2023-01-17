import { BaseApi } from 'src/api/BaseApi';

export class AuthApi extends BaseApi {
  async register(data) {
    let result = {};
    await this.post('/auth/register', data).then((response) => {
      console.log('response', response);
      result = response;
    }).catch((err) => {
      console.log('err', err);
      this.$q.notify('errr');
    });
    return result;
  }
}
