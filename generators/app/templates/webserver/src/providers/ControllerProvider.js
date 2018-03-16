import container from 'simple-di';
import IndexController from '../controllers/IndexController';

container.register('indexController', () => (
  new IndexController()
));
