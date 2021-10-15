import logo from "./logo.svg";
import "./App.css";
import SearchAppBar from "./components/homepage";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SearchAppBar></SearchAppBar>
      </div>
    </Provider>
  );
}

export default App;
