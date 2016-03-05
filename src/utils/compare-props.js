export default (props, nextProps) => {

  const propsKeys = Object.keys(props);
  const nextPropsKeys = Object.keys(nextProps);
  if (propsKeys.length !== nextPropsKeys.length) {
    return false;
  }

  for (let i = 0; i < propsKeys.length; i++) {
    const key = propsKeys[i];
    if ((key !== 'children' && key.indexOf('on') !== 0) &&
      (!nextProps.hasOwnProperty(key) || props[key] !== nextProps[key])) {
        return false;
    }
  }

  return true;

};
