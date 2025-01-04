import { useParams } from "react-router";
import { useEffect, useState } from "react";
import JobList from "../components/JobList";
import { getCompany } from "../lib/graphql/queries";

function CompanyPage() {
  const { companyId } = useParams();
  const [state, setState] = useState({
    company: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const company = await getCompany(companyId);
        setState({ company: company, loading: false, error: false });
      } catch (error) {
        setState({ company: null, loading: false, error: true });
      }
    })();
  }, [companyId]);

  if (!state.loading) return <div>Loading data....</div>;
  if (state.error) {
    return <div className="has-text-danger">Data unavaialble</div>;
  }
  return (
    <div>
      <h1 className="title">{state.company.name}</h1>
      <div className="box">{state.company.description}</div>
      <h2 className="title is-5">Jobs at {state.company.name}</h2>
      <JobList jobs={state.company.jobs} />
    </div>
  );
}

export default CompanyPage;
