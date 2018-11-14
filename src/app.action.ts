class AppAction{

  setVisible = (visible: boolean) => {
    return {
      type: 'sidebarVisible',
      visible
    }
  }
}

export default new AppAction();