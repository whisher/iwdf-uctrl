(function() {
'use strict';
var translationTable = {};

translationTable.en = {
    home :{
      prologue: 'Hello there, This is my awesome app!'
    },
    support :{
      welcome : 'Welcome!',
      header: 'Support live chat',
      placeholder: 'Type your message (min 10 characters 500 max)'
    }
};

translationTable.it = {
  home :{
      prologue: 'Ciao, questa è la mia cool app!'
  },
  support :{
      welcome :  'Benvenuto!',
      header: 'Supporto live chat',
      placeholder: 'Scrivi il tuo messaggio (min 10 caratteri 500 max)'
  }
};
function config(tmhDynamicLocaleProvider, $translateProvider, LANG) {
  tmhDynamicLocaleProvider.localeLocationPattern('scripts/i18n/angular-locale_{{locale}}.js');
  $translateProvider.translations('en', translationTable.en)
    .translations('it', translationTable.it); 
  $translateProvider.preferredLanguage(LANG);
}
function run($rootScope, $locale, tmhDynamicLocale, $translate, LANG) {
   $rootScope.global.changeLanguage = function (langKey) {
      tmhDynamicLocale.set(langKey);
      $translate.use(langKey);
      $rootScope.global.currentTranslate = $translate.use();
    };
    tmhDynamicLocale.set(LANG);
    $rootScope.global.locale = $locale;
    $rootScope.global.currentTranslate = $translate.use();
}
angular.module('i18n', [
      	'tmh.dynamicLocale',
      'pascalprecht.translate',
      'i18n.services',
])
  .config(config)
  .run(run);

})();

