import WithFetch from "./examples/WithFetch";
import "./App.css";
import WithReactQuery from "./examples/WithReactQuery";

const API_URL = "https://rickandmortyapi.com/api/character";

function App() {
  return (
    <>
      <WithFetch apiUrl={API_URL} />
      <WithReactQuery apiUrl={API_URL} />
    </>
  );
}

export default App;

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface Location {
  name: string;
  url: string;
}
