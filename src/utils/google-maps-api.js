import querystring from 'querystring';

export default {

  callbacks: [],

  appended: false,

  load(params, callback) {
    const index = this.callbacks.push(callback);
    if (window.google) {
      setTimeout(this.fireCallbacks.bind(this));
    } else {
      if (!this.appended) {
        window.mapsCallback = this.mapsCallback.bind(this);
        this.appendScript(params);
      }
    }
    return index;
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
    window.mapsCallback = undefined;
    this.fireCallbacks();
  },

  fireCallbacks() {
    this.callbacks.forEach(callback => callback());
    this.callbacks = [];
  },

  removeCallback(index) {
    this.callbacks.splice(index - 1, 1);
  }

};
