import App from './App';
import Home from './pages/Home';
import Character from './pages/Character';

export default [
  {
    component: App,
    routes: [
      {
        component: Home,
        path: '/',
        exact: true,
      },
      {
        component: Character,
        path: '/character/:id',
        exact: true,
      },
    ],
  },
];
