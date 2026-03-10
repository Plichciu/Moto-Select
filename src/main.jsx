import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./home";
import Contact from "./contact";
import { ClerkProvider } from "@clerk/clerk-react";
import Profile from "./profile";
import AddListing from "./add-listing";
import { Toaster } from "./components/ui/sonner";
import SearchByCategory from "./search/[category]";
import SearchByOptions from "./search";
import ListingDetail from "./listing-details/[id]";
import SearchResults from "./search/SearchResults";
import RequireAuth from "./Shared/RequiredAuth";
import NotFound from "./Shared/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/profile",
    element: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
  },
  {
    path: "/add-listing",
    element: (
      <RequireAuth>
        <AddListing />
      </RequireAuth>
    ),
  },
  {
    path: "/search",
    element: <SearchResults />,
  },
  // {
  //   path: "/search/:category",
  //   element: <SearchResults />,
  // },
  {
    path: "/search?query",
    element: <SearchResults />,
  },
  {
    path: "/listing-details/:id",
    element: <ListingDetail />,
  },
  {
    path: "/search/advanced",
    element: <SearchResults />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      <Toaster />
    </ClerkProvider>
  </StrictMode>
);
