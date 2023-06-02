import { Routes } from "@angular/router";

export const contentRoutes: Routes = [
    { path: '', loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'about', loadChildren: () => import('../../components/about/about.module').then(m => m.AboutModule) },
    { path: 'flight', loadChildren: () => import('../../components/flights/flights.module').then(m => m.FlightsModule) },
    { path: 'checkmybooking', loadChildren: () => import('../../components/checkmybooking/checkmybooking.module').then(m => m.CheckmybookingModule)},
    { path: 'bookingconfirmation', loadChildren: () => import('../../components/bookingconfirmation/bookingconfirmation.module').then(m => m.BookingconfirmationModule)},
    { path: 'support', loadChildren: () => import('../../components/support/support.module').then(m => m.SupportModule) },
    { path: 'blog', loadChildren: () => import('../../components/blog/blog.module').then(m => m.BlogModule) },
    { path: 'itinerary', loadChildren: () => import('../../components/itinerary/itinerary.module').then(m => m.ItineraryModule) },
    { path: 'list', loadChildren: () => import('../../components/list/list.module').then(m => m.ListModule) },
    { path: 'emailer', loadChildren: () => import('../../components/emailer/emailer.module').then(m => m.EmailerModule) },
    { path: 'cancellation-refund-policy', loadChildren: () => import('../../components/cancellation-refund-policy/cancellation-refund-policy.module').then(m => m.CancellationRefundPolicyModule) },
    { path: 'privacy-policy', loadChildren: () => import('../../components/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
    { path: 'term-and-Conditions', loadChildren: () => import('../../components/term-and-conditions/term-and-conditions.module').then(m => m.TermAndConditionsModule) },
    { path: 'disclamer', loadChildren: () => import('../../components/disclamer/disclamer.module').then(m => m.DisclamerModule) },
    { path: 'flights-to-miami', loadChildren: () => import('../../components/flights-to-miami/flights-to-miami.module').then(m => m.FlightsToMiamiModule) }       
];