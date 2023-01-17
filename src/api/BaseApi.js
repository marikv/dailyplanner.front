import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

export class BaseApi {
  constructor() {
    this.api = api;
    this.$q = useQuasar();
  }

  get(url, config) {
    return this.api.get(url, config);
  }

  delete(url, config) {
    return this.api.delete(url, config);
  }

  post(url, data, config) {
    return this.api.post(url, data, config);
  }
}
