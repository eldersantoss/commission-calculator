import { Dispatch, SetStateAction } from "react";
import api from ".";

export function fetchResourceData<T>(
  resource: string,
  setResource: Dispatch<SetStateAction<T[]>>
) {
  api
    .get(resource)
    .then((response) => response.data)
    .then((data) => setResource(data?.results ?? []))
    .catch((error) => console.error(error));
}
