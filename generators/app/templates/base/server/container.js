import Blister from 'blister';
import requireDir from 'require-dir';

const container = new Blister();
const providers = requireDir('./provider');

Object.keys(providers).forEach(providerName => {
  container.register(providers[providerName].default);
});

export default container;
