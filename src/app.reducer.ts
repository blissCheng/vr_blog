export interface AppStore {
  siderbarVisible: boolean;
}

const initState: AppStore = {
  siderbarVisible: false
};

const AppReducer = (state: AppStore = initState, action: Action) => {
  switch (action.type) {
    case 'sidebarVisible':
      return {
        ...state,
        siderbarVisible: action.visible
      }
    case 'sidebarModel':
      return {
        ...state,
        sidebarModel: action.siderbarModel
      }
    default:
      return state;
  }
}
export default AppReducer;
