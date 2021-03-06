'use strict';

// Webpack styles imports
import './styles.css';

import log from 'services/log';
import i18n from 'services/i18n';
import router from 'services/router';

import 'pages/home';
import 'pages/form';

import { LocaleChooser } from 'components/locale-chooser';
import { Link } from 'components/link'

import routes from './routes.json';

log.level = process.env.RUN_MODE === 'production' ? 'error' : 'debug';

log.info('Initializing...');

log.debug('Adding services components!');
const services = document.querySelector('.services');
services.append(i18n);

log.debug('Initializing routes!');
router.subscribe(document.querySelector('.page'), routes);

log.debug('Initializing header!');
const header = document.querySelector('.header');
const homeLink = document.createElement('router-link');
homeLink.setAttribute('path', '/home');
homeLink.setAttribute('label', 'Home');
header.append(homeLink);
const homeJohnLink = new Link();
homeJohnLink.path = '/home/John';
homeJohnLink.label = 'John\'s space';
header.append(homeJohnLink);
const formLink = new Link();
formLink.label = 'Form';
formLink.path = '/form';
header.append(formLink);
header.append(new LocaleChooser());

log.debug('Initializing footer!');
document.querySelector('.footer').append(new LocaleChooser());

log.info('Application ready!');

// Webpack default PWA script
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            log.info('SW registered: ', registration);
        }).catch(registrationError => {
            log.warn('SW registration failed: ', registrationError);
        });
    });
}
