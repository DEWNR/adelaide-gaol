<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

return [
    // Global (base) settings
    '*' => [
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 0,

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        // Control Panel trigger word
        'cpTrigger' => 'admin',

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => getenv('SECURITY_KEY'),

        // Whether to save the project config out to config/project.yaml
        // (see https://docs.craftcms.com/v3/project-config.html)
        'useProjectConfigFile' => true,

        // Base site URL
        'siteUrl' => getenv('SITE_URL'),

        'devMode' => false,

        'alllowAutoUpdates' => false,

        'aliases' => [
          '@siteUrl' => getenv('SITE_URL'),
        ],

    ],

    // Development (local) environment settings
    'dev' => [
        // Dev Mode (see https://craftcms.com/guides/what-dev-mode-does)
        'devMode' => true,

        'enableTemplateCaching' => false,

        'alllowAutoUpdates' => true,

        'aliases' => [

        ],
    ],

    // Staging (pre-production) environment settings
    'staging' => [
        // Prevent administrative changes from being made on staging
        'allowAdminChanges' => false,

        'allowTemplateCaching' => false,

        'aliases' => [

        ],

    ],

    // Production (live) environment settings
    'production' => [
        // Prevent administrative changes from being made on production
        'allowAdminChanges' => false,

        'enableTemplateCaching' => true,
    ],
];
