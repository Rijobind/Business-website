import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/home/home').then(a => a.Home) },
    { path: 'header', loadComponent: () => import('./shared-components/header/header').then(a => a.Header) },
    { path: 'footer', loadComponent: () => import('./shared-components/footer/footer').then(a => a.Footer) },
    { path: 'contact', loadComponent: () => import('./shared-components/contact/contact').then(a => a.Contact) },
    { path: 'returns-policy', loadComponent: () => import('./components/returns-policy/returns-policy').then(a => a.ReturnsPolicy) },
    { path: 'acceptable-use-policy', loadComponent: () => import('./components/acceptable-use-policy/acceptable-use-policy').then(a => a.AcceptableUsePolicy) },
    { path: 'cookie-policy', loadComponent: () => import('./components//cookie-policy/cookie-policy').then(a => a.CookiePolicy) },
    { path: 'terms-of-service', loadComponent: () => import('./components/terms-of-service/terms-of-service').then(a => a.TermsOfService) },
    { path: 'privacy-policy', loadComponent: () => import('./components/privacy-policy/privacy-policy').then(a => a.PrivacyPolicy) },
];
