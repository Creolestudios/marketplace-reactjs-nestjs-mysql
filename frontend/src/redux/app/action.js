export function getView(width) {
  let newView = 'MobileView';
  if (width > 1220) {
    newView = 'DesktopView';
  } else if (width > 767) {
    newView = 'TabView';
  }
  return newView;
}
const actions = {
  COLLPSE_CHANGE: 'COLLPSE_CHANGE',
  GLOBAL_LOADER: 'GLOBAL_LOADER',
  GLOBAL_LOADER_INCREMENT: 'GLOBAL_LOADER_INCREMENT',
  GLOBAL_LOADER_DECREMENT: 'GLOBAL_LOADER_DECREMENT',
  COLLPSE_OPEN_DRAWER: 'COLLPSE_OPEN_DRAWER',
  CHANGE_OPEN_KEYS: 'CHANGE_OPEN_KEYS',
  TOGGLE_ALL: 'TOGGLE_ALL',
  CHANGE_CURRENT: 'CHANGE_CURRENT',
  CLEAR_MENU: 'CLEAR_MENU',
  globalLoaderHandler: (isIncrement = false) => ({
    type: actions.GLOBAL_LOADER,
    isIncrement,
  }),
  toggleCollapsed: () => ({
    type: actions.COLLPSE_CHANGE,
  }),
  toggleOpenDrawer: () => ({
    type: actions.COLLPSE_OPEN_DRAWER,
  }),
  toggleAll: (width, height) => {
    const view = getView(width);
    const collapsed = view !== 'DesktopView';
    return {
      type: actions.TOGGLE_ALL,
      collapsed,
      view,
      height,
    };
  },
  changeOpenKeys: (openKeys) => ({
    type: actions.CHANGE_OPEN_KEYS,
    openKeys,
  }),
  changeCurrent: (current) => ({
    type: actions.CHANGE_CURRENT,
    current,
  }),
  clearMenu: () => ({ type: actions.CLEAR_MENU }),
};
export default actions;
