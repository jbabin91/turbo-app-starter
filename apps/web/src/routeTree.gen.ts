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

interface AppDashboardRouteRouteChildren {
  AppDashboardIndexRoute: typeof AppDashboardIndexRoute
}

const AppDashboardRouteRouteChildren: AppDashboardRouteRouteChildren = {
  AppDashboardIndexRoute: AppDashboardIndexRoute,
}

const AppDashboardRouteRouteWithChildren =
  AppDashboardRouteRoute._addFileChildren(AppDashboardRouteRouteChildren)

interface AppRouteRouteChildren {
  AppDashboardRouteRoute: typeof AppDashboardRouteRouteWithChildren
}

const AppRouteRouteChildren: AppRouteRouteChildren = {
  AppDashboardRouteRoute: AppDashboardRouteRouteWithChildren,
}

const AppRouteRouteWithChildren = AppRouteRoute._addFileChildren(
  AppRouteRouteChildren,
)

interface PublicRouteRouteChildren {
  PublicAboutRoute: typeof PublicAboutRoute
  PublicIndexRoute: typeof PublicIndexRoute
}

const PublicRouteRouteChildren: PublicRouteRouteChildren = {
  PublicAboutRoute: PublicAboutRoute,
  PublicIndexRoute: PublicIndexRoute,
}

const PublicRouteRouteWithChildren = PublicRouteRoute._addFileChildren(
  PublicRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof PublicRouteRouteWithChildren
  '/dashboard': typeof AppDashboardRouteRouteWithChildren
  '/about': typeof PublicAboutRoute
  '/': typeof PublicIndexRoute
  '/dashboard/': typeof AppDashboardIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AppRouteRouteWithChildren
  '/about': typeof PublicAboutRoute
  '/': typeof PublicIndexRoute
  '/dashboard': typeof AppDashboardIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_app': typeof AppRouteRouteWithChildren
  '/_public': typeof PublicRouteRouteWithChildren
  '/_app/dashboard': typeof AppDashboardRouteRouteWithChildren
  '/_public/about': typeof PublicAboutRoute
  '/_public/': typeof PublicIndexRoute
  '/_app/dashboard/': typeof AppDashboardIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/dashboard' | '/about' | '/' | '/dashboard/'
  fileRoutesByTo: FileRoutesByTo
  to: '' | '/about' | '/' | '/dashboard'
  id:
    | '__root__'
    | '/_app'
    | '/_public'
    | '/_app/dashboard'
    | '/_public/about'
    | '/_public/'
    | '/_app/dashboard/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AppRouteRoute: typeof AppRouteRouteWithChildren
  PublicRouteRoute: typeof PublicRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AppRouteRoute: AppRouteRouteWithChildren,
  PublicRouteRoute: PublicRouteRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

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
