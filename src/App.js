//importing react and the use state and effect
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./FoodMenu";
import Snack from "./FoodItem";

function App() {
  //setting the state
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    async function getSnacks() {
      //this is calling the api to call the function get snacks
      let snacks = await SnackOrBoozeApi.getSnacks();
      //this is setting the state to have the returned value from snacks
      setSnacks(snacks);
      //this is telling the state that the loading event or api call is finished
      setIsLoading(false);
    }
    getSnacks();
  }, []);

  if (isLoading) {
    //if the api call is not finished it will show this...
    return <p>One Sec... &hellip;</p>;
  }

  return (
    //all of the routers and switch methods have to go inside of the browserrouter
    //the switch component allows for the first route seen to render 
    <div className="App">
      
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home snacks={snacks} />
            </Route>
            <Route exact path="/snacks">
              <Menu snacks={snacks} title="Snacks" />
            </Route>
            <Route path="/snacks/:id">
              <Snack items={snacks} cantFind="/snacks" />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
