
import { initFederation } from '@angular-architects/native-federation';

let manifestEnv = 'dev';

switch (window.location.hostname) {
   case 'http://prod.nl':
       manifestEnv = 'prod';
       break;
    case 'http://acc.nl':
        manifestEnv = 'acc';
        break;
    case 'http://test.nl':
        manifestEnv = 'test';
        break;
   default:
       manifestEnv = 'local';
       break;
}

let location = `/assets/manifests/manifest.${manifestEnv}.json`;

if (manifestEnv === 'prod' || manifestEnv === 'bpr' || manifestEnv === 'ont') {
    location = window.location.pathname + location;
}

initFederation(location)
    .catch(err => console.error('failed', err))
    .then(_ => import('./bootstrap'))
    .catch(err => console.error(err));
