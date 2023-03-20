import { githubApi } from "../../api/githubApi";
import { useQuery } from "@tanstack/react-query";
import { Label } from "../../interfaces";
import { sleep } from "../../helpers/sleep";

const getLabels = async (): Promise<Label[]> => {
  await sleep(2000);
  const { data } = await githubApi.get<Label[]>("/labels");
  return data;
};

const initialData: Label[] = [
  {
    id: 717031390,
    node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
    url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
    name: "good first issue",
    color: "6ce26a",
    default: true,
    description: "",
  },
  {
    id: 725156255,
    node_id: "MDU6TGFiZWw3MjUxNTYyNTU=",
    url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
    name: "good first issue (taken)",
    color: "b60205",
    default: false,
    description: "",
  },
];

export const useLabels = () => {
  const labelsQuery = useQuery(["labels"], getLabels, {
    // Tiempo de espera para que se vuelva a hacer la petición
    staleTime: 1000 * 60 * 60,
    // Mientras se carga la petición, se mostrará esta data. React Query confia en esta data y en caso de usarla en conjunto con staleTime, no hará la petición hasta que se cumpla el tiempo de espera
    // initialData: initialData,
    // Mientras se carga la petición, se mostrará esta data
    // placeholderData: initialData,
  });
  return { labelsQuery };
};

export default useLabels;
