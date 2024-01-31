// import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return <p>Not Found (on root route)</p>;
  },
});

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
