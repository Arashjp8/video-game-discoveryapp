import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Reviews from "./pages/Reviews";
import NewReleases from "./pages/NewReleases";
import Action from "./pages/Action";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="action" index element={<Action />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="newreleases" element={<NewReleases />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
