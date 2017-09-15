import angular = require('angular');

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

import { TokenService } from './token.service';
servicesModule.service('Token', TokenService);

import { LibraryService } from './library.service';
servicesModule.service('Library', LibraryService);

import { UserService } from './user.service';
servicesModule.service('User', UserService);

export default servicesModule;
