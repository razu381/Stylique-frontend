import React from "react";

function useProductFetcher(url) {
  const {
    isLoading,
    error,
    data: products = [],
  } = useQuery({
    queryKey: ["allorders"],
    queryFn: async () => {
      let result = await axios.get(url);

      return result.data;
    },
  });

  return <div>useProductFetcher</div>;
}

export default useProductFetcher;
