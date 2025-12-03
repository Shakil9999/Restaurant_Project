import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMessages = () => {
  const {
    data: messages = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['contactMessages'],
    queryFn: async () => {
      const res = await axios.get("https://restaurant-project-server-tau.vercel.app/contact");
      return res.data;
    }
  });

  return { messages, isLoading, refetch };
};

export default useMessages;
