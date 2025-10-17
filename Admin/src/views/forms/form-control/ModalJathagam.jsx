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
  updateJathagam,
}) {
  const nakshatraMap = {
    mesham: ['ashwini', 'bharani', 'krittika'],
    rishabam: ['krittika', 'rohini', 'mrugashira'],
    mithunam: ['ardra', 'punarvasu', 'pushya'],
    karakam: ['ashlesha', 'magha', 'purvaphalguni'],
    simam: ['uthraphalguni', 'hasta', 'chitra'],
    kanni: ['swati', 'vishakha', 'anuradha'],
    thulam: ['jyeshtha', 'moola', 'purvashadha'],
    viruchikam: ['uthrashadha', 'shravana', 'dhanishta'],
    dhanusu: ['shatabhisha', 'purvabhadrapada', 'uthrabhadrapada'],
    makaram: ['revati', 'ashwini', 'bharani'],
    kumbam: ['krittika', 'rohini', 'mrugashira'],
    meenam: ['ardra', 'punarvasu', 'pushya'],
  }

  const allNakshatras = [
    'ashwini', 'bharani', 'krittika', 'rohini', 'mrugashira', 'ardra', 'punarvasu', 'pushya', 'ashlesha', 'magha', 'purvaphalguni', 'uthraphalguni', 'hasta', 'chitra', 'swati', 'vishakha', 'anuradha', 'jyeshtha', 'moola', 'purvashadha', 'uthrashadha', 'shravana', 'dhanishta', 'shatabhisha', 'purvabhadrapada', 'uthrabhadrapada', 'revati'
  ]

  const nakshatrasToShow = newJathagam?.rasi ? (nakshatraMap[newJathagam.rasi] || allNakshatras) : allNakshatras
  return (
    <div>
      <CModal visible={modalVisibles} onClose={() => setModalVisibles(false)}>
        <CModalHeader>Add Jathagam</CModalHeader>
        <CModalBody>
          <div className="p-3">
            <h5 className="mb-3">Horoscope Details</h5>
            <CForm>
              <div className="container-fluid">
                <div className="row mb-2 align-items-center">
                  <label className="col-sm-4 col-form-label">Rasi</label>
                  <div className="col-sm-8">
                    <CFormSelect
                      required
                      name="rasi"
                      value={newJathagam.rasi}
                      onChange={handleInputChanges}
                    >
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
                </div>

                <div className="row mb-2 align-items-center">
                  <label className="col-sm-4 col-form-label">Nakshatra</label>
                  <div className="col-sm-8">
                    <CFormSelect
                      name="natchathiram"
                      value={newJathagam.natchathiram}
                      onChange={handleInputChanges}
                      required
                    >
                      <option value="">Select Nakshatra</option>
                      {nakshatrasToShow.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </CFormSelect>
                  </div>
                </div>

                <div className="row mb-2 align-items-center">
                  <label className="col-sm-4 col-form-label">Lagnam</label>
                  <div className="col-sm-8">
                    <CFormSelect
                      name="lagnam"
                      required
                      value={newJathagam.lagnam}
                      onChange={handleInputChanges}
                    >
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
                </div>

                <div className="row mb-2 align-items-center">
                  <label className="col-sm-4 col-form-label">Dosham</label>
                  <div className="col-sm-8">
                    <CFormSelect
                      name="dosham"
                      required
                      value={newJathagam.dosham}
                      onChange={handleInputChanges}
                    >
                      <option value="">Select Dosham</option>
                      <option value="no_dosham">No Dosham / தோஷம் இல்லை</option>
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
                      <option value="sarpadosham">சர்ப்ப தோஷம்</option>
                      <option value="putra_dosham">புத்திர தோஷம்</option>
                    </CFormSelect>
                  </div>
                </div>

                <div className="row mb-2 align-items-center">
                  <label className="col-sm-4 col-form-label">Upload (PDF)</label>
                  <div className="col-sm-8">
                    <CFormInput
                      required
                      type="file"
                      accept="application/pdf"
                      name="uploadJathakam"
                      onChange={handleFileChangedoc}
                    />
                  </div>
                </div>
              </div>
            </CForm>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={() => {
              if (newJathagam && newJathagam._editingIndex !== undefined && updateJathagam) {
                updateJathagam(newJathagam._editingIndex, newJathagam)
              } else {
                addJathagam()
              }
            }}
          >
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
