import React, { useRef } from "react";
import Banner2 from "../Banner/Banner2";
import FeaturedJobs from "../Jobs/FeaturedJobs";
import JobSearchHero from "../Job Search/JobSearchHero";

const HomePageMain2 = () => {
  const resultsRef = useRef(null);
  return (
    <main className="homepage-2-main">
      <Banner2 resultsRef={resultsRef} />
      <div className="row m-0">
        <div className="mt-1 col-12 col-md-4">
          <JobSearchHero resultsRef={resultsRef} />
        </div>
        <div className="col-12 col-md-8">
          <FeaturedJobs resultsRef={resultsRef} />
        </div>
      </div>
    </main>
  );
};

export default HomePageMain2;
