import { useEffect, useReducer, useState } from "react";
import { Character } from "../App";
import "../App.css";

const getRandomCharacterFromAPI = async (apiUrl: string) => {
  const randomId = Math.floor(Math.random() * 100) + 1;
  try {
    const res = await fetch(`${apiUrl}/${randomId}`);
    return res.json();
  } catch (error) {
    return error;
  }
};

function WithFetch({ apiUrl }: { apiUrl: string }) {
  const [dataApi, setDataApi] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [key, forceRefresh] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    setIsLoading(true);
    getRandomCharacterFromAPI(apiUrl).then(setDataApi).catch(setError);
  }, [key]);

  useEffect(() => {
    if (dataApi) setIsLoading(false);
    if (!dataApi?.name || !dataApi?.image) setDataApi(null);
  }, [dataApi]);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
      setDataApi(null);
    }
  }, [dataApi]);

  return (
    <div className="App App-header">
      <h2>React Query </h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : dataApi ? (
        <>
          <div className="ApiCharacter">
            <h3>{dataApi?.name}</h3>
            <img src={dataApi?.image} alt={dataApi?.name} />
          </div>
          <button onClick={forceRefresh} disabled={isLoading}>
            New Character
          </button>
        </>
      ) : (
        <>
          <p>Not found</p>
          {error && <p>Error: {error.message}</p>}
        </>
      )}
    </div>
  );
}

export default WithFetch;
