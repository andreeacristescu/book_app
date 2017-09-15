import angular = require('angular');

let componentsModule = angular.module('app.components', []);

import {ShowIfAuthed} from './show-if-authed/directive';
componentsModule.directive('showIfAuthed', ShowIfAuthed);

import {BookBox} from './book-box/component';
componentsModule.component('bookBox', BookBox);

import {ConfirmationForm} from './confirmation-form/component';
componentsModule.component('confirmationForm', ConfirmationForm);

import {NhInput, NhFile} from './nh-input/component';
componentsModule.component('nhInput', NhInput);
componentsModule.directive('nhFile', NhFile);

import {NhInfoBox} from './nh-info-box/component';
componentsModule.component('nhInfoBox', NhInfoBox);

import {NhButton} from './nh-button/component';
componentsModule.component('nhButton', NhButton);

import {NhSearchInput} from './nh-search-input/component';
componentsModule.component('nhSearchInput', NhSearchInput);

import {AddBooksForm} from './add-books-form/component';
componentsModule.component('addBooksForm', AddBooksForm);

import {UserHeader} from './user-header/component';
componentsModule.component('userHeader', UserHeader);

export default componentsModule;