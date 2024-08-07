/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicRouteImport } from './routes/_public/route'
import { Route as AppRouteImport } from './routes/_app/route'
import { Route as PublicIndexImport } from './routes/_public/index'
import { Route as PublicAboutImport } from './routes/_public/about'
import { Route as AppDashboardRouteImport } from './routes/_app/dashboard/route'
import { Route as AppDashboardIndexImport } from './routes/_app/dashboard/index'

// Create/Update Routes

const PublicRouteRoute = PublicRouteImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any)

const AppRouteRoute = AppRouteImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const PublicIndexRoute = PublicIndexImport.update({
  path: '/',
  getParentRoute: () => PublicRouteRoute,
} as any)

const PublicAboutRoute = PublicAboutImport.update({
  path: '/about',
  getParentRoute: () => PublicRouteRoute,
} as any)

const AppDashboardRouteRoute = AppDashboardRouteImport.update({
  path: '/dashboard',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppDashboardIndexRoute = AppDashboardIndexImport.update({
  path: '/',
  getParentRoute: () => AppDashboardRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppRouteImport
      parentRoute: typeof rootRoute
    }
    '/_public': {
      id: '/_public'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicRouteImport
      parentRoute: typeof rootRoute
    }
    '/_app/dashboard': {
      id: '/_app/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AppDashboardRouteImport
      parentRoute: typeof AppRouteImport
    }
    '/_public/about': {
      id: '/_public/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof PublicAboutImport
      parentRoute: typeof PublicRouteImport
    }
    '/_public/': {
      id: '/_public/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof PublicIndexImport
      parentRoute: typeof PublicRouteImport
    }
    '/_app/dashboard/': {
      id: '/_app/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof AppDashboardIndexImport
      parentRoute: typeof AppDashboardRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AppRouteRoute: AppRouteRoute.addChildren({
    AppDashboardRouteRoute: AppDashboardRouteRoute.addChildren({
      AppDashboardIndexRoute,
    }),
  }),
  PublicRouteRoute: PublicRouteRoute.addChildren({
    PublicAboutRoute,
    PublicIndexRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app",
        "/_public"
      ]
    },
    "/_app": {
      "filePath": "_app/route.tsx",
      "children": [
        "/_app/dashboard"
      ]
    },
    "/_public": {
      "filePath": "_public/route.tsx",
      "children": [
        "/_public/about",
        "/_public/"
      ]
    },
    "/_app/dashboard": {
      "filePath": "_app/dashboard/route.tsx",
      "parent": "/_app",
      "children": [
        "/_app/dashboard/"
      ]
    },
    "/_public/about": {
      "filePath": "_public/about.tsx",
      "parent": "/_public"
    },
    "/_public/": {
      "filePath": "_public/index.tsx",
      "parent": "/_public"
    },
    "/_app/dashboard/": {
      "filePath": "_app/dashboard/index.tsx",
      "parent": "/_app/dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
