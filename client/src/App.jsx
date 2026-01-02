import "./App.css";
import { Button } from "./components/ui/button";
import Login from "./pages/Login";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./pages/students/HeroSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Cources from "./pages/students/Cources";
import MyLearning from "./pages/students/MyLearning";
import Profile from "./pages/students/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard.jsx";
import CourceTable from "./pages/admin/cource/CourceTable.jsx";
import AddCource from "./pages/admin/cource/AddCource";
import EditCource from "./pages/admin/cource/EditCource";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />,
            <Cources />
            {/* //future pages */}
          </>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      // admin routing starts here
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "cource",
            element: <CourceTable />,
          },
          {
            path: "cource/create",
            element: <AddCource />,
          },
          {
            path: "cource/:courceId",
            element: <EditCource />,
          },
          {
            path: "cource/:courceId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "cource/:courceId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
