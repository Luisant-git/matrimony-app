import {
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from '@coreui/react'
import React from 'react'

function ModalJathagam({
  addJathagam,
  newJathagam,
  handleInputChanges,
  setModalVisibles,
  modalVisibles,
  handleFileChange,
  handleFileChangedoc,
}) {
  return (
    <div>
      <CModal visible={modalVisibles} onClose={() => setModalVisibles(false)}>
        <CModalHeader>Add Jathagam</CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormSelect required name="rasi" value={newJathagam.rasi} onChange={handleInputChanges}>
                <option value="">Select Rasi</option>
                <option value="mesham">மேஷம் (Mēṣam)</option>
                <option value="rishabam">ரிஷபம் (Riṣabam)</option>
                <option value="mithunam">மிதுனம் (Mithunam)</option>
                <option value="karakam">கரகம் (Karakam)</option>
                <option value="simam">சிம்மம் (Simam)</option>
                <option value="kanni">கன்னி (Kanni)</option>
                <option value="thulam">துலாம் (Thulam)</option>
                <option value="viruchikam">விருச்சிகம் (Viruṣchikam)</option>
                <option value="dhanusu">தனுசு (Dhanusu)</option>
                <option value="makaram">மகரம் (Makaram)</option>
                <option value="kumbam">கும்பம் (Kumbam)</option>
                <option value="meenam">மீனம் (Meenam)</option>
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormSelect
                name="natchathiram"
                value={newJathagam.natchathiram}
                onChange={handleInputChanges}
                required
              >
                <option value="">Select Natchathiram</option>
                <option value="ashwini">ஆஸ்வினி (Āsviṉi) - Ashwini</option>
                <option value="bharani">பரணி (Paraṇi) - Bharani</option>
                <option value="krittika">கிருத்திகா (Krittikā) - Krittika</option>
                <option value="rohini">ரோகிணி (Rohiṇi) - Rohini</option>
                <option value="mrugashira">மிருகசீரிடம் (Mirugasīriṭam) - Mrigashira</option>
                <option value="ardra">ஆறிரா (Āṟirā) - Ardra</option>
                <option value="punarvasu">புனர்வசு (Punarvasu) - Punarvasu</option>
                <option value="pushya">புஷ்யம் (Puciyam) - Pushya</option>
                <option value="ashlesha">ஆஸ்லேஷா (Āslēṣā) - Ashlesha</option>
                <option value="magha">மகா (Magā) - Magha</option>
                <option value="purvaphalguni">பூர்வபால்குனி (Pūrvaphālgunī) - Purvaphalguni</option>
                <option value="uthraphalguni">
                  உத்திரபால்குனி (Uttiraphālgunī) - Uttaraphalguni
                </option>
                <option value="hasta">ஹஸ்தா (Hastā) - Hasta</option>
                <option value="chitra">சித்திரா (Cittirā) - Chitra</option>
                <option value="swati">சுவாதி (Suāti) - Swati</option>
                <option value="vishakha">விஷாக்கா (Viṣākkā) - Vishakha</option>
                <option value="anuradha">அனுராதா (Anurādā) - Anuradha</option>
                <option value="jyeshtha">ஜ்யேஷ்டா (Jyeṣṭā) - Jyeshtha</option>
                <option value="moola">மூலா (Mūlā) - Moola</option>
                <option value="purvashadha">பூர்வாசாதா (Pūrvācādā) - Purvashadha</option>
                <option value="uthrashadha">உத்திராசாதா (Uttirācādā) - Uttarashadha</option>
                <option value="shravana">சரவணா (Śravaṇā) - Shravana</option>
                <option value="dhanishta">தனிஷ்டா (Dhaniṣṭā) - Dhanishta</option>
                <option value="shatabhisha">ஷடபிஷா (Ṣaṭabiṣā) - Shatabhisha</option>
                <option value="purvabhadrapada">
                  பூர்வபாத்ரபடா (Pūrvabhādrapaṭā) - Purvabhadrapada
                </option>
                <option value="uthrabhadrapada">
                  உத்திரபாத்ரபடா (Uttirabhādrapaṭā) - Uttarabhadrapada
                </option>
                <option value="revati">ரேவதி (Rēvati) - Revati</option>
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormSelect name="lagnam" required value={newJathagam.lagnam} onChange={handleInputChanges}>
                <option value="">Select Lagnam</option>
                <option value="ashwini">அஸ்வினி (Asvini)</option>
                <option value="bharani">பரணி (Bharani)</option>
                <option value="krittika">கிருத்திகை (Krittika)</option>
                <option value="rohini">ரோகிணி (Rohini)</option>
                <option value="mrigashira">மிருகசீரிடம் (Mrigashira)</option>
                <option value="ardra">திருவாதிரை (Ardra)</option>
                <option value="punarvasu">புனர்பூசம் (Punarvasu)</option>
                <option value="pushya">பூசம் (Pushya)</option>
                <option value="ashlesha">ஆயில்யம் (Ashlesha)</option>
                <option value="magha">மகம் (Magha)</option>
                <option value="purvaphalguni">பூரம் (Purva Phalguni)</option>
                <option value="uttaraphalguni">உத்திரம் (Uttara Phalguni)</option>
                <option value="hasta">அஸ்தம் (Hasta)</option>
                <option value="chitra">சித்திரை (Chitra)</option>
                <option value="swati">சுவாதி (Swati)</option>
                <option value="vishakha">விசாகம் (Vishakha)</option>
                <option value="anuradha">அனுஷம் (Anuradha)</option>
                <option value="jyeshta">கேட்டை (Jyeshta)</option>
                <option value="moola">மூலம் (Moola)</option>
                <option value="purvashadha">பூராடம் (Purva Ashadha)</option>
                <option value="uttarashadha">உத்திராடம் (Uttara Ashadha)</option>
                <option value="shravana">திருவோணம் (Shravana)</option>
                <option value="dhanishta">அவிட்டம் (Dhanishta)</option>
                <option value="shatabhisha">சதயம் (Shatabhisha)</option>
                <option value="purvabhadrapada">பூரட்டாதி (Purva Bhadrapada)</option>
                <option value="uttarabhadrapada">உத்திரட்டாதி (Uttara Bhadrapada)</option>
                <option value="revati">ரேவதி (Revati)</option>
              </CFormSelect>
            </div>
            <div className="mb-3">
              <CFormSelect name="dosham" required value={newJathagam.dosham} onChange={handleInputChanges}>
                <option value="">Select Dosham</option>
        
                 
                <option value="">தோஷம் தேர்வு செய்க</option>
    <option value="ketu_dosham">கேது தோஷம்</option>
    <option value="manglik_dosham">மாங்கலிக தோஷம்</option>
    <option value="pitra_dosham">பித்ர தோஷம்</option>
    <option value="nadi_dosham">நாதி தோஷம்</option>
    <option value="kalathra_dosham">கலத்ர தோஷம்</option>
    <option value="rahu_dosham">ராகு தோஷம்</option>
    <option value="shani_dosham">சனி தோஷம்</option>
    <option value="brahma_dosham">பிரம்மா தோஷம்</option>
    <option value="yoni_dosham">யோனி தோஷம்</option>
    <option value="chandra_dosham">சந்திர தோஷம்</option>
    <option value="sarpadosham">சர்ப்ப தோஷம்</option> {/* Adding a common dosham */}
    <option value="putra_dosham">புத்திர தோஷம்</option> {/* Another variant */}
                   
              </CFormSelect>
            </div>

            <div className="mb-3">
              <label htmlFor="">Upload PDf ony</label>
              <CFormInput required type="file" name="uploadJathakam" onChange={handleFileChangedoc} />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={addJathagam}>
            Save
          </CButton>
          <CButton color="secondary" onClick={() => setModalVisibles(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default ModalJathagam
