import useSWR from "swr";

import { useAxiosAuth } from "../utils/axiosAuth";

export const useUser = () => {
  const axiosAuth = useAxiosAuth(false);
  const fetcher = (url: string) => axiosAuth.get(url).then((res) => res.data);
  const { data, mutate, error } = useSWR("/users/getAdmin", fetcher, {
    onErrorRetry: async (error, key, config, revalidate, { retryCount }) => {
      if (retryCount >= 2) {
        return;
      }

      if (error.response.status === 401) {
        revalidate({ retryCount });
      }
    },
  });

  const loading = !data && !error;
  const loggedIn = !error && data;
  return { data, loading, loggedIn, mutate };
};
