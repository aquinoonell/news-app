import { useState } from "react";
import axios from "axios";

const CatFact = () => {
  const [fact, setFact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCatFact = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://catfact.ninja/fact");
      const catFact = response.data.fact;
      setFact(catFact);

      // Log the fact and the fact length,
      console.log("Received cat fact:", catFact);
      console.log("Fact length:", catFact.length);
    } catch (error) {
      // Handle any errors during the fetch
      setError("Error fetching cat fact. Please try again later.");
      console.error("Error fetching cat fact:", error);
    } finally {
      setIsLoading(false); // Set loading to false when the request is done
    }
  };

  return (
    <div className="container mt-4 py-2">
      <div className="card bg-dark text-light">
        <div className="card-body text-center">
          <h5 className="card-title">Cat Fact</h5>
          <section>
            {isLoading ? (
              <div className="alert alert-info" role="alert">
                Loading...
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : (
              <p>{fact}</p>
            )}

            <button className="btn btn-primary mt-3" onClick={fetchCatFact}>
              Get New Fact
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CatFact;
