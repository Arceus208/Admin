import useSWR from "swr";
import { axiosPublic } from "../utils/axiosPublic";

export const useEvents = () => {
  const fetcher = (url: string) => axiosPublic.get(url).then((res) => res.data);

  const { data, error } = useSWR("/events/getAllEvents", fetcher);

  return { data, error };
};
