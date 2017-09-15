import angular = require('angular');

const homepageModule = angular.module('app.homepage', []);

/* config */
import {HomepageConfig} from './config';
homepageModule.config(HomepageConfig);

/* controllers */
import {HomepageCtrl} from './controller';
homepageModule.controller('HomepageCtrl', HomepageCtrl);


export default homepageModule;
