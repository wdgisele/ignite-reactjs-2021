import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const userCanSeeMetrics = useCan({ permissions: ["metrics.list"] });

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <h1>Dashboard: {user?.email}</h1>
      {userCanSeeMetrics && <h2>Metrics</h2>}
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = apiClient.get("/me");

  return {
    props: {},
  };
});