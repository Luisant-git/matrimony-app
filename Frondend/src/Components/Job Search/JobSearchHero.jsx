import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredResults } from "../../store/filteredResultsSlice";
import { Button, Drawer, Spin } from "antd";
import "./custom.css";
import { FaSort, FaFilter } from "react-icons/fa";
const JobSearchHero = ({ resultsRef }) => {
  const [castdata, setCasteData] = useState([]);
  const [communitydata, setCommunityData] = useState([]);
  const [kulam, setKulam] = useState([]);
  const [kothiram, setKothiram] = useState([]);
  const [porvikam, setPorvikam] = useState([]);

  const [selectedCommunityId, setSelectedCommunityId] = useState("");
  const [selectedCasteId, setSelectedCasteId] = useState("");
  const [selectedSubCasteId, setSelectedSubCasteId] = useState("");
  const [selectedKulamId, setSelectedKulamId] = useState("");
  const [selectedKothiramId, setSelectedKothiramId] = useState("");
  const [gender, setGender] = useState("");
  const [rasi, setRasi] = useState("");
  const [natchathiram, setNatchathiram] = useState("");
  const [dosham, setDosham] = useState("");
  const [laknam, setLaknam] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filteredResults.currentPage);

  console.log(currentPage);
  let page = currentPage?.toString();

  console.log(page);

  const handleCheckboxChange = (event, label) => {
    setNatchathiram((prev) => {
      const selectedValues = prev ? prev.split(",") : []; // Split the string into an array
      if (event.target.checked) {
        // Add the label if it's checked
        return [...selectedValues, label].join(","); // Convert back to a comma-separated string
      } else {
        // Remove the label if it's unchecked
        const updatedValues = selectedValues.filter((value) => value !== label);
        return updatedValues.join(","); // Convert back to a comma-separated string
      }
    });
  };
  const handleCheckboxChangedosam = (event, label) => {
    setDosham((prev) => {
      const selectedValues = prev ? prev.split(",") : []; // Split the string into an array
      if (event.target.checked) {
        // Add the label if it's checked
        return [...selectedValues, label].join(","); // Convert back to a comma-separated string
      } else {
        // Remove the label if it's unchecked
        const updatedValues = selectedValues.filter((value) => value !== label);
        return updatedValues.join(","); // Convert back to a comma-separated string
      }
    });
  };
  console.log(natchathiram, "data");

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const [isDrawerDhosam, setDrawerOpenDhosam] = useState(false);
  const handleDrawerdhosam = () => {
    setDrawerOpenDhosam(!isDrawerDhosam);
  };

  const [isDrawerlaknam, setDrawerOpenLaknam] = useState(false);
  const handleDrawerLaknam = () => {
    setDrawerOpenLaknam(!isDrawerlaknam);
  };
  const [isDrawerrasi, setDrawerOpenRasi] = useState(false);
  const handleDrawerRasi = () => {
    setDrawerOpenRasi(!isDrawerrasi);
  };
  const [isDraweLak, setDrawerOpenLak] = useState(false);
  const handleDrawerLak = () => {
    setDrawerOpenLak(!isDraweLak);
  };
  const [data, setdata] = useState([]);
  console.log(data, "rea");

  // Fetch data on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [casteRes, communityRes, porvikamRes, kulamRes, kothiramRes] =
          await Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/caste`),
            axios.get(`${import.meta.env.VITE_API_URL}/community`),
            axios.get(`${import.meta.env.VITE_API_URL}/sub-caste`),
            axios.get(`${import.meta.env.VITE_API_URL}/kulams`),
            axios.get(`${import.meta.env.VITE_API_URL}/kothirams`),
          ]);

        setCasteData(casteRes.data);
        setCommunityData(communityRes.data);
        setPorvikam(porvikamRes.data);
        setKulam(kulamRes.data);
        setKothiram(kothiramRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);
  // Filter data
  const filterCaste = castdata.filter(
    (m) => m.communityId === selectedCommunityId
  );
  const filterPorvikam = porvikam.filter((m) => m.CasteId === selectedCasteId);
  const filterKulam = kulam.filter((m) => m.subCasteId === selectedSubCasteId);
  const filterKothiram = kothiram.filter((m) => m.kulamId === selectedKulamId);

  // Fetch filtered results on filter change
  useEffect(() => {
    const fetchFilteredResults = async () => {
      const params = {
        casteId: selectedCasteId,
        communityId: selectedCommunityId,
        kothiramId: selectedKothiramId,
        kulamId: selectedKulamId,
        subCasteId: selectedSubCasteId,
        gender,
        rasi,
        natchathiram,
        dosham,
        lagnam: laknam,
        page: "1",
        pageSize: "6",
      };

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/filter`,
          { params }
        );

        setdata(res.data);
        dispatch(setFilteredResults(res.data));
      } catch (err) {
        console.error("Error fetching filtered results:", err);
      } finally {
        setLoading(false); // Stop loading after the request
      }
    };

    fetchFilteredResults();
  }, [
    selectedCasteId,
    selectedCommunityId,
    selectedKulamId,
    selectedKothiramId,
    selectedSubCasteId,
    gender,
    rasi,
    natchathiram,
    dosham,
    laknam,
    dispatch,
  ]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  const options = [
    { value: "ashwini", label: "அசுவினி" },
    { value: "bharani", label: "பரணி" },
    { value: "krittika", label: "கார்த்திகை" },
    { value: "rohini", label: "ரோகிணி" },
    { value: "mrugashira", label: "மிருகசீரிஷம்" },
    { value: "ardra", label: "திருவாதிரை" },
    { value: "punarvasu", label: "புனர்பூசம்" },
    { value: "pushya", label: "பூசம்" },
    { value: "ashlesha", label: "ஆயில்யம்" },
    { value: "magha", label: "மகம்" },
    { value: "purvaphalguni", label: "பூரம்" },
    { value: "uthraphalguni", label: "உத்திரம்" },
    { value: "hasta", label: "அஸ்தம்" },
    { value: "chitra", label: "சித்திரை" },
    { value: "swati", label: "சுவாதி" },
    { value: "vishakha", label: "விசாகம்" },
    { value: "anuradha", label: "அனுஷம்" },
    { value: "jyeshtha", label: "கேட்டை" },
    { value: "moola", label: "மூலம்" },
    { value: "purvashadha", label: "பூராடம்" },
    { value: "uthrashadha", label: "உத்திராடம்" },
    { value: "shravana", label: "திருவோணம்" },
    { value: "dhanishta", label: "அவிட்டம்" },
    { value: "shatabhisha", label: "சதயம்" },
    { value: "purvabhadrapada", label: "பூரட்டாதி" },
    { value: "uthrabhadrapada", label: "உத்திரட்டாதி" },
    { value: "revati", label: "ரேவதி" },
  ];

  const optionsLaknam = [
    { value: "", label: "லக்னம் தேர்வு செய்க" },
    { value: "ashwini", label: "அசுவினி" },
    { value: "bharani", label: "பரணி" },
    { value: "krittika", label: "கார்த்திகை" },
    { value: "rohini", label: "ரோகிணி" },
    { value: "mrugashira", label: "மிருகசீரிஷம்" },
    { value: "ardra", label: "திருவாதிரை" },
    { value: "punarvasu", label: "புனர்பூசம்" },
    { value: "pushya", label: "பூசம்" },
    { value: "ashlesha", label: "ஆயில்யம்" },
    { value: "magha", label: "மகம்" },
    { value: "purvaphalguni", label: "பூரம்" },
    { value: "uthraphalguni", label: "உத்திரம்" },
    { value: "hasta", label: "அஸ்தம்" },
    { value: "chitra", label: "சித்திரை" },
    { value: "swati", label: "சுவாதி" },
    { value: "vishakha", label: "விசாகம்" },
    { value: "anuradha", label: "அனுஷம்" },
    { value: "jyeshtha", label: "கேட்டை" },
    { value: "moola", label: "மூலம்" },
    { value: "purvashadha", label: "பூராடம்" },
    { value: "uthrashadha", label: "உத்திராடம்" },
    { value: "shravana", label: "திருவோணம்" },
    { value: "dhanishta", label: "அவிட்டம்" },
    { value: "shatabhisha", label: "சதயம்" },
    { value: "purvabhadrapada", label: "பூரட்டாதி" },
    { value: "uthrabhadrapada", label: "உத்திரட்டாதி" },
    { value: "revati", label: "ரேவதி" },
  ];

  const doshamOptions = [
    { value: "", label: "தோஷம் தேர்வு செய்க" },
    { value: "ketu_dosham", label: "கேது தோஷம்" },
    { value: "manglik_dosham", label: "மாங்கலிக தோஷம்" },
    { value: "pitra_dosham", label: "பித்ர தோஷம்" },
    { value: "nadi_dosham", label: "நாதி தோஷம்" },
    { value: "kalathra_dosham", label: "கலத்ர தோஷம்" },
    { value: "rahu_dosham", label: "ராகு தோஷம்" },
    { value: "shani_dosham", label: "சனி தோஷம்" },
    { value: "brahma_dosham", label: "பிரம்மா தோஷம்" },
    { value: "yoni_dosham", label: "யோனி தோஷம்" },
    { value: "chandra_dosham", label: "சந்திர தோஷம்" },
    { value: "sarpadosham", label: "சர்ப்ப தோஷம்" },
    { value: "putra_dosham", label: "புத்திர தோஷம்" },
  ];
  return (
    <div className="">
      <div className="jm-jobs-search-under-hero mt-5 py-5 container navbar">
        <div className="bg-light border">
          <center className="p-1">
            <h2>Filter Here</h2>
          </center>
          <div className="">
            <div className="">
              <div className="p-3">
                <Row>
                  <Col className="mt-3" xl="12" lg="12" md="12" sm="12">
                    <select
                      required
                      className="jm-candidates-search-select border "
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">பாலினம்</option>
                      <option value="MALE">ஆண்</option>
                      <option value="FEMALE">பெண்</option>
                    </select>
                  </Col>
                  <Col xl="12" lg="12" md="12" sm="12" className="mt-2">
                    <select
                      required
                      className="jm-candidates-search-select"
                      onChange={(e) => setRasi(e.target.value)}
                    >
                      <option value="">ராசி தேர்வு செய்க</option>
                      <option value="mesham">மேஷம்</option>
                      <option value="rishabam">ரிஷபம்</option>
                      <option value="mithunam">மிதுனம் </option>
                      <option value="karakam">கரகம் </option>
                      <option value="simam">சிம்மம் </option>
                      <option value="kanni">கன்னி </option>
                      <option value="thulam">துலாம் </option>
                      <option value="viruchikam">விருச்சிகம்</option>
                      <option value="dhanusu">தனுசு </option>
                      <option value="makaram">மகரம் </option>
                      <option value="kumbam">கும்பம் </option>
                      <option value="meenam">மீனம் </option>
                    </select>
                  </Col>

                  <div className="accordion" id="natchathiramAccordion">
                    <div className="accordion-item ">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          நட்சத்திரம் தேர்வு செய்க
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#natchathiramAccordion"
                      >
                        <div className="accordion-body">
                          <div className="dropdown">
                            <div className="checkbox-row">
                              <div className="checkbox-list">
                                <div className="checkbox-list">
                                  {options.map((option) => (
                                    <div
                                      key={option.value}
                                      className="checkbox-item"
                                    >
                                      <input
                                        type="checkbox"
                                        value={option.value}
                                        id={`checkbox-${option.value}`}
                                        className="custom-checkbox"
                                        onChange={(e) =>
                                          handleCheckboxChange(e, option.value)
                                        }
                                      />
                                      <label
                                        htmlFor={`checkbox-${option.value}`}
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Col xl="12" lg="12" md="12" sm="12">
                    <select
                      name="selectedCommunityId"
                      value={selectedCommunityId}
                      onChange={(e) => setSelectedCommunityId(e.target.value)}
                      className="jm-candidates-search-select"
                    >
                      <option value="">சமூகம் தேர்வு செய்க</option>
                      {communitydata.map((m) => (
                        <option key={m.communityId} value={m.communityId}>
                          {m.communityName}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col xl="12" lg="12" md="12" sm="12">
                    <select
                      required
                      className="jm-candidates-search-select"
                      onChange={(e) => setSelectedSubCasteId(e.target.value)}
                    >
                      <option value="">பூர்விகம் தேர்வு செய்க</option>
                      {filterPorvikam.map((m) => (
                        <option key={m.subCasteId} value={m.subCasteId}>
                          {m.SubCasteName}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col xl="12" lg="12" md="12" sm="12">
                    <select
                      required
                      className="jm-candidates-search-select"
                      onChange={(e) => setSelectedKulamId(e.target.value)}
                    >
                      <option value="">குலம் தேர்வு செய்க</option>
                      {filterKulam.map((m) => (
                        <option key={m.kulamId} value={m.kulamId}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col xl="12" lg="12" md="12" sm="12">
                    <select
                      className="jm-candidates-search-select"
                      onChange={(e) => setSelectedKothiramId(e.target.value)}
                    >
                      <option value="">கோத்திரம் தேர்வு செய்க</option>
                      {filterKothiram.map((m) => (
                        <option key={m.kothiramId} value={m.kothiramId}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col xl="12" lg="12" md="12" sm="12">
                    <select
                      required
                      className="jm-candidates-search-select"
                      onChange={(e) => setLaknam(e.target.value)}
                    >
                      {optionsLaknam.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Col>

                  <div className="accordion" id="customAccordion mt-2">
                    <div className="accordion-item mt-3">
                      <h2 className="accordion-header" id="headingCustomOne">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseCustomOne"
                          aria-expanded="false"
                          aria-controls="collapseCustomOne"
                        >
                          தோஷம் தேர்வு செய்க
                        </button>
                      </h2>
                      <div
                        id="collapseCustomOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingCustomOne"
                        data-bs-parent="#customAccordion"
                      >
                        <div className="accordion-body">
                          <div className="dropdown">
                            <div className="checkbox-row">
                              <div className="checkbox-list">
                                {doshamOptions.map((option) => (
                                  <div
                                    key={option.value}
                                    className="checkbox-item"
                                  >
                                    <input
                                      type="checkbox"
                                      value={option.value}
                                      id={`checkbox-${option.value}`}
                                      className="custom-checkbox"
                                      onChange={(e) =>
                                        handleCheckboxChangedosam(
                                          e,
                                          option.value
                                        )
                                      }
                                    />
                                    <label htmlFor={`checkbox-${option.value}`}>
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <Col xl="12" lg="12" md="12" sm="12">
                    <select
                      required
                      className="jm-candidates-search-select"
                      onChange={(e) => setSelectedCasteId(e.target.value)}
                    >
                      <option value="">ஜாதி தேர்வு செய்க</option>
                      {filterCaste.map((m) => (
                        <option key={m.casteId} value={m.casteId}>
                          {m.casteName}
                        </option>
                      ))}
                    </select>
                  </Col> */}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-filter text-center bg-light  fixed-filter">
        <div style={{ overflow: "auto" }}>
          <div className="filter-container p-2">
            <button onClick={handleDrawerdhosam} className="button">
              <FaSort className="icon" />
              SortBy
            </button>
            <button
              onClick={handleDrawerToggle}
              className="button filter-button"
            >
              <FaFilter className="icon" />
              Filter
              <span className="badge">1</span>
            </button>
            <button onClick={handleDrawerLaknam} className="button">
              Dosam
            </button>
            <button onClick={handleDrawerRasi} className="button">
              Rasi
            </button>
            <button onClick={handleDrawerLak} className="button">
              Laknam
            </button>
          </div>
          <Drawer
            title="Filter Options"
            placement="bottom"
            closable={true}
            onClose={handleDrawerToggle}
            open={isDrawerOpen}
            height="50%"
            className="p-0"
          >
            <div className="checkbox-container pb-5">
              <div className="checkbox-row">
                <div className="checkbox-list">
                  {options.map((option) => (
                    <div key={option.value} className="checkbox-item">
                      <input
                        type="checkbox"
                        value={option.value}
                        id={`checkbox-${option.value}`}
                        className="custom-checkbox"
                        onChange={(e) => handleCheckboxChange(e, option.value)}
                      />
                      <label htmlFor={`checkbox-${option.value}`}>
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center fixed-bottom bg-white p-3">
              <button
                className="btn btn-primary w-100"
                onClick={handleDrawerToggle}
              >
                Apply
              </button>
            </div>
          </Drawer>

          <Drawer
            title="Filter Options"
            placement="bottom"
            closable={true}
            onClose={handleDrawerdhosam}
            open={isDrawerDhosam}
            height="80%"
            className="p-0" // Ensure no additional padding is added
          >
            <div>
              <select
                required
                className="jm-candidates-search-select border "
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">பாலினம்</option>
                <option value="MALE">ஆண்</option>
                <option value="FEMALE">பெண்</option>
              </select>

              <Col xl="12" lg="12" md="12" sm="12">
                <select
                  name="selectedCommunityId"
                  value={selectedCommunityId}
                  onChange={(e) => setSelectedCommunityId(e.target.value)}
                  className="jm-candidates-search-select"
                >
                  <option value="">சமூகம் தேர்வு செய்க</option>
                  {communitydata.map((m) => (
                    <option key={m.communityId} value={m.communityId}>
                      {m.communityName}
                    </option>
                  ))}
                </select>
              </Col>
              <Col xl="12" lg="12" md="12" sm="12">
                <select
                  required
                  className="jm-candidates-search-select"
                  onChange={(e) => setSelectedCasteId(e.target.value)}
                >
                  <option value="">ஜாதி தேர்வு செய்க</option>
                  {filterCaste.map((m) => (
                    <option key={m.casteId} value={m.casteId}>
                      {m.casteName}
                    </option>
                  ))}
                </select>
              </Col>

              <Col xl="12" lg="12" md="6" sm="6">
                <select
                  required
                  className="jm-candidates-search-select"
                  onChange={(e) => setSelectedSubCasteId(e.target.value)}
                >
                  <option value="">பூர்விகம் தேர்வு செய்க</option>
                  {filterPorvikam.map((m) => (
                    <option key={m.subCasteId} value={m.subCasteId}>
                      {m.SubCasteName}
                    </option>
                  ))}
                </select>
              </Col>
              <Col xl="12" lg="12" md="12" sm="12">
                <select
                  required
                  className="jm-candidates-search-select"
                  onChange={(e) => setSelectedKulamId(e.target.value)}
                >
                  <option value="">குலம் தேர்வு செய்க</option>
                  {filterKulam.map((m) => (
                    <option key={m.kulamId} value={m.kulamId}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col xl="12" lg="12" md="12" sm="12">
                <select
                  className="jm-candidates-search-select"
                  onChange={(e) => setSelectedKothiramId(e.target.value)}
                >
                  <option value="">கோத்திரம் தேர்வு செய்க</option>
                  {filterKothiram.map((m) => (
                    <option key={m.kothiramId} value={m.kothiramId}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </Col>
              <div className="d-flex justify-content-center fixed-bottom bg-white p-3">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleDrawerdhosam}
                >
                  Apply
                </button>
              </div>
            </div>
          </Drawer>

          <Drawer
            title="Filter Options"
            placement="bottom"
            closable={true}
            onClose={handleDrawerLaknam}
            open={isDrawerlaknam}
            height="50%"
            className="p-0" // Ensure no additional padding is added
          >
            <div>
              <div className="checkbox-container pb-5">
                <div className="checkbox-row">
                  <div className="checkbox-list">
                    {doshamOptions.map((option) => (
                      <div key={option.value} className="checkbox-item">
                        <input
                          type="checkbox"
                          value={option.value}
                          id={`checkbox-${option.value}`}
                          className="custom-checkbox"
                          onChange={(e) =>
                            handleCheckboxChangedosam(e, option.value)
                          }
                        />
                        <label htmlFor={`checkbox-${option.value}`}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center fixed-bottom bg-white p-3">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleDrawerLaknam}
                >
                  Apply
                </button>
              </div>
            </div>
          </Drawer>
          <Drawer
            title="Filter Options"
            placement="bottom"
            closable={true}
            onClose={handleDrawerRasi}
            open={isDrawerrasi}
            height="50%"
            className="p-0" // Ensure no additional padding is added
          >
            <div>
              <Col xl="12" lg="12" md="12" sm="12" className="mt-2">
                <select
                  required
                  className="jm-candidates-search-select"
                  onChange={(e) => setRasi(e.target.value)}
                >
                  <option value="">ராசி தேர்வு செய்க</option>
                  <option value="mesham">மேஷம்</option>
                  <option value="rishabam">ரிஷபம்</option>
                  <option value="mithunam">மிதுனம் </option>
                  <option value="karakam">கரகம் </option>
                  <option value="simam">சிம்மம் </option>
                  <option value="kanni">கன்னி </option>
                  <option value="thulam">துலாம் </option>
                  <option value="viruchikam">விருச்சிகம்</option>
                  <option value="dhanusu">தனுசு </option>
                  <option value="makaram">மகரம் </option>
                  <option value="kumbam">கும்பம் </option>
                  <option value="meenam">மீனம் </option>
                </select>
              </Col>
              <div className="d-flex justify-content-center fixed-bottom bg-white p-3">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleDrawerRasi}
                >
                  Apply
                </button>
              </div>
            </div>
          </Drawer>

          <Drawer
            title="Filter Options"
            placement="bottom"
            closable={true}
            onClose={handleDrawerLak}
            open={isDraweLak}
            height="50%"
            className="p-0" // Ensure no additional padding is added
          >
            <div>
              <Col xl="12" lg="12" md="12" sm="12">
                <select
                  required
                  className="jm-candidates-search-select"
                  onChange={(e) => setLaknam(e.target.value)}
                >
                  {optionsLaknam.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Col>
              <div className="d-flex justify-content-center fixed-bottom bg-white p-3">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleDrawerLak}
                >
                  Apply
                </button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default JobSearchHero;
