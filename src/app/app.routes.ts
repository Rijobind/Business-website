import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/home/home').then(a => a.Home) },
    { path: 'header', loadComponent: () => import('./shared-components/header/header').then(a => a.Header) },
    { path: 'footer', loadComponent: () => import('./shared-components/footer/footer').then(a => a.Footer) },
    { path: 'contact', loadComponent: () => import('./shared-components/contact/contact').then(a => a.Contact) },
    { path: 'registration', loadComponent: () => import('./shared-components/registration/registration').then(a => a.Registration) },
    { path: 'login', loadComponent: () => import('./shared-components/login/login').then(a => a.Login) },
    { path: 'terms-of-service', loadComponent: () => import('./components/terms-of-service/terms-of-service').then(a => a.TermsOfService) },
    { path: 'returns-policy', loadComponent: () => import('./components/returns-policy/returns-policy').then(a => a.ReturnsPolicy) },
    { path: 'acceptable-use-policy', loadComponent: () => import('./components/acceptable-use-policy/acceptable-use-policy').then(a => a.AcceptableUsePolicy) },
    { path: 'cookie-policy', loadComponent: () => import('./components/cookie-policy/cookie-policy').then(a => a.CookiePolicy) },
    { path: 'privacy-policy', loadComponent: () => import('./components/privacy-policy/privacy-policy').then(a => a.PrivacyPolicy) },
    { path: 'cancellations-billing', loadComponent: () => import('./components/cancellations-billing/cancellations-billing').then(a => a.CancellationsBilling) },
    { path: 'shop', loadComponent: () => import('./components/shop/shop').then(a => a.Shop) },
    { path: 'cart', loadComponent: () => import('./components/cart/cart').then(a => a.Cart) },
    { path: 'product-details/:id', loadComponent: () => import('./components/product-details/product-details').then(a => a.ProductDetails) },
    { path: 'user-profile', loadComponent: () => import('./components/user-profile/user-profile').then(a => a.UserProfile) },
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
