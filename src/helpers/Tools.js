import {
  Loading,
  Notify,
  date,
} from 'quasar';

export class Tools {
  static isEmail(str) {
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    return regexExp.test(str);
  }

  static isPassword(str) {
    return str && typeof str === 'string' && str.length >= 6 && str.length <= 100;
  }

  static strToDate(dateStr, formatStr) {
    return date.extractDate(dateStr, formatStr);
  }

  static dateFormat(dateObj, formatStr) {
    return date.formatDate(dateObj, formatStr);
  }

  static showLoading(message = 'Please wait..') {
    Loading.show({
      message,
      // spinner: QSpinnerGears,
    });
  }

  static hideLoading() {
    Loading.hide();
  }

  static showNotify(params = {}, error = {}) {
    if (!params.message
      && error
      && error.response
      && error.response.data
      && error.response.data.message
    ) {
      params.message = error.response.data.message;
    }
    const defaultParams = {
      icon: params.icon !== undefined ? params.icon : 'warning',
      position: params.position || 'top',
      timeout: params.timeout || 2500,
      progress: params.progress !== undefined ? params.progress : true,
      color: params.color || 'red-14',
      html: params.html || false,
      multiLine: params.multiLine || false,
      textColor: params.textColor || 'white',
      message: params.message || 'Connection error',
      actions: params.actions || [{ icon: 'las la-times', color: 'white' }],
    };
    Notify.create(defaultParams);
  }

  static getMiniPhotoFromServer(str) {
    return String(str)
      .replace('.png', '_mini.png')
      .replace('.PNG', '_mini.PNG')
      .replace('.gif', '_mini.gif')
      .replace('.GIF', '_mini.GIF')
      .replace('.bmp', '_mini.bmp')
      .replace('.BMP', '_mini.BMP')
      .replace('.jpg', '_mini.jpg')
      .replace('.JPG', '_mini.JPG')
      .replace('.svg', '_mini.svg')
      .replace('.SVG', '_mini.SVG')
      .replace('.jpeg', '_mini.jpeg')
      .replace('.JPEG', '_mini.JPEG');
  }

  static str(v) {
    return (v ? String(v) : '');
  }
}
