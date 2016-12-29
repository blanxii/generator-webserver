import container from 'simple-di';
import indexController from '../controllers/IndexController';

container.register('indexController', () => {
  return new indexController();
});
