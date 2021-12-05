export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Padaria',
    icon: 'folder',
    items: [
      {
        text: 'Clientes',
        path: '/clientes'
      },
      {
        text: 'Produtos',
        path: '/produtos'
      },
      {
        text: 'Pedidos',
        path: '/pedidos'
      }
    ]
  }
  /*{
    text: 'DevExtreme',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/profile'
      },
      {
        text: 'Tasks',
        path: '/tasks'
      },
      {
        text: 'Location',
        path: '/location'
      },
    ]
  },*/

];
