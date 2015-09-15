export default {

  callbacks: [],

  added: false,

  loadMaps(libraries, callback) {
    if (!window.google) {
      this.callbacks.push(callback);
      if (!this.added) {
        window.mapsCallback = this.mapsCallback.bind(this);
        this.addScript(libraries);
      }
    } else {
      setTimeout(callback);
    }
  },

  addScript(libraries) {
    let src = 'https://maps.googleapis.com/maps/api/js';
    src += '?callback=mapsCallback';
    src += `&libraries=${libraries || ''}`;
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
