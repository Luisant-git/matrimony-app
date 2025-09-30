import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { useTranslation } from "react-i18next";
import { setCurrentPage } from "../../store/filteredResultsSlice";

const FeaturedJobs = ({ resultsRef }) => {
  const { t } = useTranslation(); // Use the translation function
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filteredResults.currentPage);
  const itemsPerPage = 6;
  const { users, totalCount, totalPages } = useSelector(
    (state) => state.filteredResults
  );

  const visibleProfiles = users
    ?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt from new to old
  // Handle page change
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };
console.log(visibleProfiles);

  return (
    <section
      ref={resultsRef}
      id="target_search"
      className="product-list-container jm-job-area-3 pt-3 pb-100"
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="jm-section-title mb-40 text-center">
              <h2 className="title mb-10">Search Results</h2>
              {/* <p className="text">Mauris ut cursus nunc. Morbi eleifend, ligula at consectetur vehicula</p> */}
            </div>
          </div>
        </div>
        <div className="row jm-job-grid">
          {visibleProfiles?.length === 0 ? (
            <div className="col-12 text-center">
              <h4>No results found</h4>
              {/* <p>Try adjusting your search or filter criteria.</p> */}
            </div>
          ) : (
            visibleProfiles?.map((profile) => (
              <div className="col-md-12  col-lg-4 mb-4" key={profile.userId}>
                <Link
                  to={`/jobDetailsPage/${profile.userId}`}
                  className="text-decoration-none"
                >
                  <div className="bg-light border rounded custom-shadow">
                    <div className="text-center mt-3">
                      <img
                        style={{
                          objectFit: "contains",
                          width: "280px",
                          height: "300px",
                        }}
                        className="rounded-3"
                        src={profile?.userProfile?.[0]}
                        alt=""
                      />
                    </div>
                    <div className="jm-job-item-head-3 mt-2">
                      <h4 className="title">
                        <Link to="/jobDetailsPage">{profile.fullName}</Link>
                      </h4>
                    </div>
                    <div className="jm-job-item-info-3">
                      <div className="jm-job-item-info-inner-3">
                        <div className="jm-job-location-3">
                          <i className="fa-thin fa-location-dot"></i>
                          <span> District : {profile.district}</span>
                        </div>
                        {/* <div className="jm-job-salary-3"><i className="fa-thin fa-money-bill-1"></i><span>{profile.income}/per month</span></div> */}
                        {/* <div className="jm-job-posttime-3"><i className="fa-thin fa-clock"></i><span>Dosam : {profile.jathagam[0].lagnam}</span></div> */}
                        <div className="jm-job-jobtime-3">
                          <i className="fa-thin fa-business-time"></i>
                          <span>DOB : {profile.dateOfBirth}</span>
                        </div>
                      </div>
                      {/* <div className="jm-job-item-info-inner-3">
                                            <div className="jm-job-posttime-3"><i className="fa-thin fa-clock"></i><span> Rasi :{t(`rasi.${profile.jathagam[0].rasi}`)}</span></div>
                                            <div className="jm-job-jobtime-3"><i className="fa-thin fa-business-time"></i><span>Natchathiram : {t(`natchathiram.${profile.jathagam[0].natchathiram}`)}</span></div>
                                            <div className="jm-job-location-3"><i className="fa-thin fa-ruler"></i><span>Height : {profile.height} Feet</span></div>
                                            <div className="jm-job-salary-3"><i className="fa-thin fa-palette"></i><span>{t('color')} :{t(`colors.${profile.color}`)}</span></div>
                                        </div> */}
                    </div>
                    <div className="border"></div>
                    <div className="px-1 py-2">
                      <div className="jm-banner-layout-2-btn  btn w-100">
                        <Link
                          to={`/jobDetailsPage/${profile.userId}`}
                          className=""
                        >
                          {" "}
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalCount > 0 && (
          <div className="pagination-container text-center mt-4">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  <span className="page-link">{index + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobs;
