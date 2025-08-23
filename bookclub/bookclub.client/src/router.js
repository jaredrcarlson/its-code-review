import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'
import { servePath } from './env.js'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/bookclubs',
    name: 'Book Clubs',
    component: loadPage('BookClubsPage')
  },
  {
    path: '/createbookclub',
    name: 'Create Book Club',
    component: loadPage('CreateBookClubPage'),
    beforeEnter: authGuard
  },
  {
    path: '/nytbooks',
    name: 'NYT Best Sellers',
    component: loadPage('NYTBestPage')
  },
  {
    path: '/booksearch',
    name: 'Book Search',
    component: loadPage('BookSearchPage')
  },
  {
    path: '/bookdetails/:gbId',
    name: 'Book Details',
    component: loadPage('BookDetailsPage')
  },
  {
    path: '/aboutus',
    name: 'About Us',
    component: loadPage('AboutUsPage')
  },
  {
    path: '/bookclubdetails/:clubId',
    name: 'Book Club Details',
    component: loadPage('BookClubDetailsPage'),
    beforeEnter: authSettled,
    children: [
      {
        path: 'clublist',
        name: 'Club List Page',
        component: loadPage('ClubListPage'),
      },
      {
        path: 'clubabout',
        name: 'Club About Page',
        component: loadPage('ClubAboutPage'),
      },
      {
        path: 'clubannouncement',
        name: 'Club Announcement Page',
        component: loadPage('ClubAnnouncementPage'),
      },
      {
        path: 'announcementdetails/:postId',
        name: 'Announcement Details Page',
        component: loadPage('AnnouncementDetailsPage'),
      },
      {
        path: 'clubdiscussion',
        name: 'Club Discussion Page',
        component: loadPage('ClubDiscussionPage'),
      },
      {
        path: 'discussiondetails/:postId',
        name: 'Discussion Details Page',
        component: loadPage('DiscussionDetailsPage'),
      },
      {
        path: 'clubmembers',
        name: 'Club Member Page',
        component: loadPage('ClubMemberPage'),
      },
    ]
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/editaccount',
    name: 'Edit Account Page',
    component: loadPage('EditAccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/profile/:profileId',
    name: 'Profile Page',
    component: loadPage('ProfilePage')
  },
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(servePath),
  routes
})
