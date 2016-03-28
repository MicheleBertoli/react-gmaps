const getFirstAvailableMap = () => {
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
};

const useAvailableMap = (firstAvailableMap, node, options) => {
  node.appendChild(firstAvailableMap.map.getDiv());
  firstAvailableMap.map.setOptions({
    ...options,
    center: new google.maps.LatLng(options.lat, options.lng)
  });
  window.__gmapsPool[firstAvailableMap.index].available = false;
  return firstAvailableMap.index;
};

const createNewMap = (node, options) => {
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
};

const GoogleMapsPool = {

  create(node, options) {
    const firstAvailableMap = getFirstAvailableMap();
    if (firstAvailableMap) {
      return useAvailableMap(firstAvailableMap, node, options);
    } else {
      return createNewMap(node, options);
    }
  },

  free(index) {
    if (!index) {
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
