import querystring from 'querystring';

export default {

  callbacks: [],

  added: false,

  loadMaps(params, callback) {
    if (!window.google) {
      this.callbacks.push(callback);
      if (!this.added) {
        window.mapsCallback = this.mapsCallback.bind(this);
        this.addScript(params);
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

  addScript(params) {
    const src = this.getSrc(params);
    const script = document.createElement('script');
    script.setAttribute('src', src);
    document.head.appendChild(script);
    this.added = true;
  },

  mapsCallback() {
    delete window.mapsCallback;
    this.callbacks.forEach(callback => callback());
    this.callbacks = [];
  }

};
