import angular = require('angular');

let loginModule = angular.module('app.login', []);

/* config */
import {LoginConfig} from './config';
loginModule.config(LoginConfig);

/* controllers */
import {LoginCtrl} from './controller';
loginModule.controller('LoginCtrl', LoginCtrl);

export default loginModule;
