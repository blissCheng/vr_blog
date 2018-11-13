class IndexAction{

  setVisible = (visible: boolean) => {
    return {
      type: 'sidebarVisible',
      visible
    }
  }
}

export default new IndexAction();