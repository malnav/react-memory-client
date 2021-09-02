import { Container } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Container maxWidth="lg">
          <NavBar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route> 
        </Container>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
