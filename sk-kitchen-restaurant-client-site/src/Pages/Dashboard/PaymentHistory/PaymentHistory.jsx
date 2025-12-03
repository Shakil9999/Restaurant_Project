import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading, isError, error } = useQuery({
    queryKey: ["payment", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${user.email}`);
      return res.data;
    },
    onError: (err) => console.error("Failed to fetch payments", err),
  });

  if (isLoading) return <p>Loading payment history...</p>;
  if (isError) return <p className="text-red-600">Error: {error.message}</p>;

  return (
    <div>
      <SectionTitle heading="Payment History" subHeading="All Payments" />
      <h2 className="text-lg font-semibold mb-4">Total Payments: {payments.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Price</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              payments.map((item, index) => (
                <tr key={item.transactionId || index}>
                  <th>{index + 1}</th>
                  <td>{item.email}</td>
                  <td>${parseFloat(item.price).toFixed(2)}</td>
                  <td>{item.transactionId}</td>
                  <td>{new Date(item.date).toLocaleString()}</td>
                  <td>{item.status || "Paid"}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
