import querystring from 'querystring';

export default {

  callbacks: [],

  appended: false,

  load(params, callback) {
    if (!window.google) {
      this.callbacks.push(callback);
      if (!this.appended) {
        window.mapsCallback = this.mapsCallback.bind(this);
        this.appendScript(params);
      }
    } else {
      setTimeout(callback);
    }
  },

  getSrc(params) {
    let src = 'https://maps.googleapis.com/maps/api/js';
    src += '?callback=mapsCallback&';
    src += querystring.stringify(params);
    return src;
  },

  appendScript(params) {
    const src = this.getSrc(params);
    const script = document.createElement('script');
    script.setAttribute('src', src);
    document.head.appendChild(script);
    this.appended = true;
  },

  mapsCallback() {
    window.mapsCallback = undefined;;
    this.callbacks.forEach(callback => callback());
    this.callbacks = [];
  }

};
