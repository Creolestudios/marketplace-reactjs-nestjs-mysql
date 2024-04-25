const options = [
  {
    key: 'home',
    label: 'sidebar.dashboard',
    leftIcon: 'dashboard-icon',
  },
  {
    key: 'activity',
    label: 'sidebar.activity',
    leftIcon: 'activity-icon',
    children: [
      {
        key: 'activity/users',
        label: 'sidebar.activity.users',
      },
      {
        key: 'activity/calculations',
        label: 'sidebar.activity.calculations',
      },
      {
        key: 'activity/callback-request',
        label: 'sidebar.activity.callbackRequest',
      },
      {
        key: 'activity/documents',
        label: 'sidebar.activity.documents',
      },
    ],
  },
  {
    key: 'app-settings',
    label: 'sidebar.appSettings',
    leftIcon: 'appsetting-icon',
    children: [
      {
        key: 'appSettings/profile',
        label: 'sidebar.appSettings.profile',
      },
      {
        key: 'appSettings/color-schema',
        label: 'sidebar.appSettings.colorScheme',
      },
      {
        key: 'appSettings/menus',
        label: 'sidebar.appSettings.menus',
      },
    ],
  },
  {
    key: 'loan-settings',
    label: 'sidebar.loanSettings',
    leftIcon: 'loan-setting-icon',
    children: [
      {
        key: 'loan-settings/calculators',
        label: 'sidebar.loanSettings.calculators',
      },
      {
        key: 'loan-settings/fees',
        label: 'sidebar.loanSettings.fees',
      },
    ],
  },
  {
    key: 'content',
    label: 'sidebar.content',
    leftIcon: 'content-icon',
    children: [
      {
        key: 'content/learning-center',
        label: 'sidebar.content.learningCenter',
      },
      {
        key: 'content/loan-programs',
        label: 'sidebar.content.loanPrograms',
      },
      {
        key: 'content/checklists',
        label: 'sidebar.content.checklists',
      },
      {
        key: 'content/legal',
        label: 'sidebar.content.legal',
      },
    ],
  },
  {
    key: 'marketing',
    label: 'sidebar.marketing',
    leftIcon: 'market-icon',
    children: [
      {
        key: 'marketing/share-app',
        label: 'sidebar.marketing.shareApp',
      },
      {
        key: 'marketing/qrcode',
        label: 'sidebar.marketing.qRCodes',
      },
      {
        key: 'marketing/email-signature',
        label: 'sidebar.marketing.emailSignature',
      },
      {
        key: 'marketing/auto-responder',
        label: 'sidebar.marketing.autoResponder',
      },
      {
        key: 'marketing/widgets',
        label: 'sidebar.marketing.widgets',
      },
    ],
  },
  {
    key: 'co-brand',
    label: 'sidebar.coBranding',
    leftIcon: 'co-brand-icon',
  },
  {
    key: 'brand-app',
    label: 'sidebar.brandedApp',
    leftIcon: 'brandapp-icon',
  },
  {
    key: 'support',
    label: 'sidebar.support',
    leftIcon: 'support-icon',
    children: [
      {
        key: 'support/guide',
        label: 'sidebar.support.guide',
      },
      {
        key: 'support/faqs',
        label: 'sidebar.support.faqs',
      },
    ],
  },
];
export default options;
