import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/home/home').then(a => a.Home) },
    { path: 'header', loadComponent: () => import('./shared-components/header/header').then(a => a.Header) },
    { path: 'footer', loadComponent: () => import('./shared-components/footer/footer').then(a => a.Footer) },
    { path: 'contact', loadComponent: () => import('./shared-components/contact/contact').then(a => a.Contact) },
    { path: 'registration', loadComponent: () => import('./shared-components/registration/registration').then(a => a.Registration) },
    { path: 'login', loadComponent: () => import('./shared-components/login/login').then(a => a.Login) },
    { path: 'forgot-password', loadComponent: () => import('./shared-components/forgot-password/forgot-password').then(a => a.ForgotPassword) },
    { path: 'forgot-password-verify-success', loadComponent: () => import('./shared-components/forgot-password-verify-success/forgot-password-verify-success').then(a => a.ForgotPasswordVerifySuccess) },
    { path: 'reset-password', loadComponent: () => import('./shared-components/reset-password/reset-password').then(a => a.ResetPassword) },
    { path: 'terms-of-service', loadComponent: () => import('./components/terms-of-service/terms-of-service').then((m) => m.TermsOfService), },
    { path: 'terms-of-service/:traccp_code', loadComponent: () => import('./components/terms-of-service/terms-of-service').then((m) => m.TermsOfService), },
    { path: 'returns-policy', loadComponent: () => import('./components/returns-policy/returns-policy').then(m => m.ReturnsPolicy), },
    { path: 'returns-policy/:traccp_code', loadComponent: () => import('./components/returns-policy/returns-policy').then(m => m.ReturnsPolicy), },
    { path: 'acceptable-use-policy', loadComponent: () => import('./components/acceptable-use-policy/acceptable-use-policy').then(m => m.AcceptableUsePolicy), },
    { path: 'cookie-policy', loadComponent: () => import('./components/cookie-policy/cookie-policy').then((m) => m.CookiePolicy), },
    { path: 'cookie-policy/:traccp_code', loadComponent: () => import('./components/cookie-policy/cookie-policy').then((m) => m.CookiePolicy), },
    { path: 'privacy-policy', loadComponent: () => import('./components/privacy-policy/privacy-policy').then(m => m.PrivacyPolicy), },
    { path: 'privacy-policy/:traccp_code', loadComponent: () => import('./components/privacy-policy/privacy-policy').then(m => m.PrivacyPolicy), },
    { path: 'cancellations-and-billing', loadComponent: () => import('./components/cancellations-and-billing/cancellations-and-billing').then((m) => m.CancellationsAndBilling), },
    { path: 'cancellations-billing/:traccp_code', loadComponent: () => import('./components/cancellations-and-billing/cancellations-and-billing').then((m) => m.CancellationsAndBilling), },
    { path: 'shop', loadComponent: () => import('./components/shop/shop').then(a => a.Shop) },
    { path: 'cart', loadComponent: () => import('./components/cart/cart').then(a => a.Cart) },
    { path: 'product-details/:id', loadComponent: () => import('./components/product-details/product-details').then(a => a.ProductDetails) },
    { path: 'user-profile', loadComponent: () => import('./components/user-profile/user-profile').then(a => a.UserProfile) },
    { path: 'checkout-success', loadComponent: () => import('./components/checkout-success/checkout-success').then(a => a.CheckoutSuccess) },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'top',
            anchorScrolling: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
