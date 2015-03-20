(function() {
'use strict';
function config(tmhDynamicLocaleProvider, $translateProvider, LANG) {
  tmhDynamicLocaleProvider.localeLocationPattern('scripts/i18n/angular-locale_{{locale}}.js');
  $translateProvider.translations('en', {
    HEADLINE: 'Hello there, This is my awesome app!'
  })
  .translations('it', {
    HEADLINE: 'Ciao, questa è la mia cool app!',
  }); 
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

