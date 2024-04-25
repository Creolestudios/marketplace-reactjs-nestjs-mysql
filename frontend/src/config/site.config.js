export default {
  siteName: 'LoanTack',
  version: process.env.REACT_APP_VERSION || '3.1.11',
  footerText: (isAdmin) =>
    `LoanTack ${isAdmin ? 'ADMIN' : 'LO'} @ ${new Date().getFullYear()}`,
  enableAnimatedRoute: false,
  apiUrl: 'http://yoursite.com/api/',
  google: {
    analyticsKey: 'UA-xxxxxxxxx-1',
  },
  dashboard: '/dashboard',
};
