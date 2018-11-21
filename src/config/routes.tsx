import React from 'react';
interface State {
  component: null | React.ComponentClass;
}

// tslint:disable-next-line:no-any
function dynamicLoad(importComponent: any) {
  class DynamicLoad extends React.Component {
    state: State = {
      component: null
    };

    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({
        component
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return DynamicLoad;
}
const Routes: RouteData[] = [
  {
    path: '/vr/home',
    name: 'home',
    component: dynamicLoad(() => import('../pages/home'))
  },
  {
    path: '/vr/article/detail/:index',
    name: 'article',
    component: dynamicLoad(() => import('../pages/article'))
  },
  {
    path: '/vr/categories',
    name: 'categories',
    component: dynamicLoad(() => import('../pages/category'))
  },
  {
    path: '/vr/tags',
    name: 'tags',
    component: dynamicLoad(() => import('../pages/tag'))
  },
  {
    path: '/vr/archives',
    name: 'archives',
    component: dynamicLoad(() => import('../pages/archive'))
  }
];

export default Routes;