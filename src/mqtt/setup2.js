import Proxy from './client2.js';
import server from '../../dummy_backend/index.js';


const topics = server.routesToClient();
const conf = {};
conf.registry = {topics: topics};

const proxy = new Proxy(conf);


const tests = {
  canonicalize() {
    const topics = [
      'wristband/scan',
      '/wristband/scan',
      'wristband/scan/',
      '/wristband/scan/',
      'wristband /scan',
    ];
    proxy.registry.canonicalize(...topics);
  },
  replaceParams() {
    const topics = [
      '/wristband/scan',
      '/${clientId}/scan',
      '/${CLIENTID}/scan',
      '/${clientId}/${clientId}',
      '${missing}/scan/',
      '${missing}/${missing}',
    ];
    proxy.registry.setParam('clientId', 'replacedParam');
    proxy.registry.replaceParams(...topics);
  }
}

// tests.canonicalize();
tests.replaceParams();
