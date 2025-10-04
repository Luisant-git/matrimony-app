import React, { useState, useEffect } from 'react';
import { userAPI } from '../utils/api';

const FilterComponent = ({ onFilterChange }) => {
    const [castdata, setCasteData] = useState([]);
    const [communitydata, setCommunityData] = useState([]);
    const [kulam, setKulam] = useState([]);
    const [kothiram, setKothiram] = useState([]);
    const [porvikam, setPorvikam] = useState([]);
    console.log('DATA-CHECk : ',castdata);
    

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
    const [loading, setLoading] = useState(true);

    const handleCheckboxChange = (event, label) => {
        setNatchathiram((prev) => {
            const selectedValues = prev ? prev.split(",") : [];
            if (event.target.checked) {
                return [...selectedValues, label].join(",");
            } else {
                const updatedValues = selectedValues.filter((value) => value !== label);
                return updatedValues.join(",");
            }
        });
    };

    const handleCheckboxChangedosam = (event, label) => {
        setDosham((prev) => {
            const selectedValues = prev ? prev.split(",") : [];
            if (event.target.checked) {
                return [...selectedValues, label].join(",");
            } else {
                const updatedValues = selectedValues.filter((value) => value !== label);
                return updatedValues.join(",");
            }
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [casteRes, communityRes, porvikamRes, kulamRes, kothiramRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/caste`).then(res => res.json()),
                    fetch(`${import.meta.env.VITE_API_URL}/community`).then(res => res.json()),
                    fetch(`${import.meta.env.VITE_API_URL}/sub-caste`).then(res => res.json()),
                    fetch(`${import.meta.env.VITE_API_URL}/kulams`).then(res => res.json()),
                    fetch(`${import.meta.env.VITE_API_URL}/kothirams`).then(res => res.json()),
                ]);

                setCasteData(casteRes);
                setCommunityData(communityRes);
                setPorvikam(porvikamRes);
                setKulam(kulamRes);
                setKothiram(kothiramRes);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const applyFilters = async () => {
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
            const res = await userAPI.filterUsers(params);
            // Pass the filter parameters instead of API response
            onFilterChange(params);
        } catch (err) {
            console.error("Error fetching filtered results:", err);
        }
    };

    const filterCaste = castdata.filter((m) => m.communityId === selectedCommunityId);
    const filterPorvikam = porvikam.filter((m) => m.CasteId === selectedCasteId);
    const filterKulam = kulam.filter((m) => m.subCasteId === selectedSubCasteId);
    const filterKothiram = kothiram.filter((m) => m.kulamId === selectedKulamId);

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

    if (loading) {
        return (
            <aside className="w-full lg:w-1/4">
                <h3 className="text-lg font-bold text-primary mb-4">FILTER HERE</h3>
                <div className="text-center text-gray-500">Loading filters...</div>
            </aside>
        );
    }

    return (
        <aside className="w-full lg:w-1/4">
            <div className="bg-white border rounded-lg p-4">
                <h3 className="text-lg font-bold text-primary mb-4 text-center">Filter Here</h3>
                
                <div className="space-y-3">
                    <select
                        className="w-full p-3 border border-gray-200 rounded-lg"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                    >
                        <option value="">பாலினம்</option>
                        <option value="MALE">ஆண்</option>
                        <option value="FEMALE">பெண்</option>
                    </select>

                    <select
                        className="w-full p-3 border border-gray-200 rounded-lg"
                        onChange={(e) => setRasi(e.target.value)}
                        value={rasi}
                    >
                        <option value="">ராசி தேர்வு செய்க</option>
                        <option value="mesham">மேஷம்</option>
                        <option value="rishabam">ரிஷபம்</option>
                        <option value="mithunam">மிதுனம்</option>
                        <option value="karakam">கரகம்</option>
                        <option value="simam">சிம்மம்</option>
                        <option value="kanni">கன்னி</option>
                        <option value="thulam">துலாம்</option>
                        <option value="viruchikam">விருச்சிகம்</option>
                        <option value="dhanusu">தனுசு</option>
                        <option value="makaram">மகரம்</option>
                        <option value="kumbam">கும்பம்</option>
                        <option value="meenam">மீனம்</option>
                    </select>

                    <div className="border border-gray-200 rounded-lg">
                        <details className="group">
                            <summary className="p-3 cursor-pointer hover:bg-gray-50">நட்சத்திரம் தேர்வு செய்க</summary>
                            <div className="p-3 border-t max-h-40 overflow-y-auto">
                                {options.map((option) => (
                                    <div key={option.value} className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            id={`natchathiram-${option.value}`}
                                            className="mr-2"
                                            onChange={(e) => handleCheckboxChange(e, option.value)}
                                        />
                                        <label htmlFor={`natchathiram-${option.value}`} className="text-sm">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </details>
                    </div>

                    <select
                        className="w-full p-3 border border-gray-200 rounded-lg"
                        value={selectedCommunityId}
                        onChange={(e) => setSelectedCommunityId(e.target.value)}
                    >
                        <option value="">சமூகம் தேர்வு செய்க</option>
                        {communitydata.map((m) => (
                            <option key={m.communityId} value={m.communityId}>
                                {m.communityName}
                            </option>
                        ))}
                    </select>

                    <select
                        className="w-full p-3 border border-gray-200 rounded-lg"
                        onChange={(e) => setSelectedSubCasteId(e.target.value)}
                        value={selectedSubCasteId}
                    >
                        <option value="">பூர்விகம் தேர்வு செய்க</option>
                        {porvikam.map((m) => (
                            <option key={m.subCasteId} value={m.subCasteId}>
                                {m.SubCasteName}
                            </option>
                        ))}
                    </select>

                    <select
                        className="w-full p-3 border border-gray-200 rounded-lg"
                        onChange={(e) => setSelectedKulamId(e.target.value)}
                        value={selectedKulamId}
                    >
                        <option value="">குலம் தேர்வு செய்க</option>
                        {kulam.map((m) => (
                            <option key={m.kulamId} value={m.kulamId}>
                                {m.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="w-full p-3 border border-gray-200 rounded-lg"
                        onChange={(e) => setSelectedKothiramId(e.target.value)}
                        value={selectedKothiramId}
                    >
                        <option value="">கோத்திரம் தேர்வு செய்க</option>
                        {kothiram.map((m) => (
                            <option key={m.kothiramId} value={m.kothiramId}>
                                {m.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="w-full p-3 border border-gray-200 rounded-lg"
                        onChange={(e) => setLaknam(e.target.value)}
                        value={laknam}
                    >
                        {optionsLaknam.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <div className="border border-gray-200 rounded-lg">
                        <details className="group">
                            <summary className="p-3 cursor-pointer hover:bg-gray-50">தோஷம் தேர்வு செய்க</summary>
                            <div className="p-3 border-t max-h-40 overflow-y-auto">
                                {doshamOptions.slice(1).map((option) => (
                                    <div key={option.value} className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            id={`dosham-${option.value}`}
                                            className="mr-2"
                                            onChange={(e) => handleCheckboxChangedosam(e, option.value)}
                                        />
                                        <label htmlFor={`dosham-${option.value}`} className="text-sm">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </details>
                    </div>
                    
                    <button
                        onClick={applyFilters}
                        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors mt-4"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default FilterComponent;