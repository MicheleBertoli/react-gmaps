const GoogleMapsPool = {

  getFirstAvailableIndex() {
    return window.__gmapsPool.map(item => item.available).indexOf(true);
  },

  useAvailableMap(index, node, options) {
    const map = this.getMap(index);
    node.appendChild(map.getDiv());
    this.update(index, options);
    window.__gmapsPool[index].available = false;
    return index;
  },

  createElement() {
    const element = document.createElement('div');
    element.style.width = '100%';
    element.style.height = '100%';
    return element;
  },

  createNewMap(node, options) {
    const element = this.createElement();
    node.appendChild(element);
    const map = new google.maps.Map(element, {
      ...options,
      center: new google.maps.LatLng(options.lat, options.lng)
    });
    let index = window.__gmapsPool.push({
      map,
      available: false
    });
    return --index;
  },

  create(node, options) {
    if (!window.__gmapsPool) {
      window.__gmapsPool = [];
    }
    const index = this.getFirstAvailableIndex();
    if (index > -1) {
      return this.useAvailableMap(index, node, options);
    } else {
      return this.createNewMap(node, options);
    }
  },

  free(index) {
    window.__gmapsPool[index].available = true;
  },

  getMap(index) {
    return window.__gmapsPool[index].map;
  },

  update(index, options) {
    const map = this.getMap(index);
    map.setOptions({
      ...options,
      center: new google.maps.LatLng(options.lat, options.lng)
    });
  }

};

export default GoogleMapsPool;
