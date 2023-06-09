import "./App.css";
import GameContainer from "./gamepage/GameContainer";
import LandingContainer from "./homepage/LandingContainer";

//react router imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlayerContainer from "./containers/PlayerContainer";
import LoginContainer from "./homepage/LoginContainer";
import Navbar from "./components/Navbar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingContainer 
        />
      ),
      children: [
        {
          path:"/logIn",
          element: (
            <LoginContainer/>
          ),
        },
      ],
    },
    {
      path: "playersAccount",
      element: <PlayerContainer />,
    },
    {
      path: "gamePage",
      element: <GameContainer />,
    },
  ]);

  return (
    <>
      {/* <LandingContainer />
    <GameContainer /> */}
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
