const GoogleMapsPool = {

  getFirstAvailableMap() {
    if (!window.__gmapsPool) {
      window.__gmapsPool = [];
    }
    for (let i = 0; i < window.__gmapsPool.length; i++) {
      if (window.__gmapsPool[i].available) {
        return {
          map: window.__gmapsPool[i].map,
          index: i,
        };
      }
    }
    return null;
  },

  useAvailableMap(firstAvailableMap, node, options) {
    node.appendChild(firstAvailableMap.map.getDiv());
    firstAvailableMap.map.setOptions({
      ...options,
      center: new google.maps.LatLng(options.lat, options.lng)
    });
    window.__gmapsPool[firstAvailableMap.index].available = false;
    return firstAvailableMap.index;
  },

  createNewMap(node, options) {
    const element = document.createElement('div');
    element.style.width = '100%';
    element.style.height = '100%';
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
    const firstAvailableMap = this.getFirstAvailableMap();
    if (firstAvailableMap) {
      return this.useAvailableMap(firstAvailableMap, node, options);
    } else {
      return this.createNewMap(node, options);
    }
  },

  free(index) {
    if (typeof index === 'undefined') {
      return;
    }
    window.__gmapsPool[index].available = true;
  },

  get(index) {
    return window.__gmapsPool[index].map;
  },

  update(index, options) {
    window.__gmapsPool[index].map.setOptions({
      ...options,
      center: new google.maps.LatLng(options.lat, options.lng)
    });
  }

};

export default GoogleMapsPool;
