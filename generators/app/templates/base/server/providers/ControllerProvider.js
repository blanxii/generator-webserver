import IndexController from '../controllers/IndexController';

export default function controllerProvider(container) {
  container.service('indexController', () => {
    return new IndexController();
  });
}
