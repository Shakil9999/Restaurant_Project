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
      const res = await axios.get("http://localhost:5000/contact");
      return res.data;
    }
  });

  return { messages, isLoading, refetch };
};

export default useMessages;
