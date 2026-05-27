import logo from './assets/prosthetiq_logic_logo.png';
import { useState } from 'react';

function App() {
  const k1Questions = [
    { id: 'T001', text: 'Cognitive ability to safely use a prosthesis' },
    { id: 'T002', text: 'Safe transfers' },
    { id: 'T003', text: 'Ambulation on a flat surface inside the home' },
  ];

  const k2Questions = [
    { id: 'T004', text: 'Ambulation on flat, smooth surfaces outside the home' },
    { id: 'T005', text: 'Negotiation of a curb' },
    { id: 'T006', text: 'Access to public or private transportation' },
    { id: 'T007', text: 'Negotiation of 1–2 stairs' },
    { id: 'T008', text: 'Traversal of low-level environmental barriers (e.g. ADA-compliant ramp)' },
  ];

  const k3Questions = [
    { id: 'T009', text: 'Walking on terrain that varies in texture and level' },
    { id: 'T010', text: 'Negotiation of 3–7 consecutive stairs' },
    { id: 'T011', text: 'Opening and closing doors while ambulating' },
    { id: 'T012', text: 'Ambulation through crowded areas' },
    { id: 'T013', text: 'Variable cadence ambulation' },
    { id: 'T014', text: 'Crossing a controlled intersection within the allowed time' },
    { id: 'T015', text: 'Dual ambulation tasks (e.g. carrying an item while walking)' },
  ];

  const k4Questions = [
    { id: 'T016', text: 'Running' },
    { id: 'T017', text: 'Repetitive stair climbing' },
    { id: 'T018', text: 'Climbing steep hills' },
    { id: 'T019', text: 'Caregiving for another individual' },
    { id: 'T020', text: 'Home maintenance (e.g. repairs, cleaning)' },
  ];

  const clinicalNeedsQuestions = [
    { id: 'CN001', text: 'Improved gait stability' },
    { id: 'CN002', text: 'Enhanced safety during ambulation to reduce fall risk' },
    { id: 'CN003', text: 'Additional residual limb protection' },
    { id: 'CN004', text: 'Shock absorption or impact reduction' },
    { id: 'CN005', text: 'Increased comfort for prolonged prosthetic use' },
    { id: 'CN006', text: 'Additional energy efficiency to reduce fatigue' },
    { id: 'CN007', text: 'Improved rollover or smoother gait mechanics' },
  ];

  const environmentalQuestions = [
    { id: 'EN001', text: 'Uneven terrain (grass, gravel, slopes)' },
    { id: 'EN002', text: 'Stairs or curbs regularly' },
    { id: 'EN003', text: 'Community ambulation outside the home' },
    { id: 'EN004', text: 'Long distances or extended periods of walking' },
    { id: 'EN005', text: 'Higher-level or demanding activities (work, recreation, exercise)' },
  ];

  const physicalConditionQuestions = [
    { id: 'CC001', text: 'The current prosthesis demonstrates mechanical wear, damage, or functional failure' },
    { id: 'CC002', text: 'The current socket no longer fits appropriately or causes discomfort' },
    { id: 'CC003', text: 'The patient’s residual limb volume, anatomy, or physical condition has changed' },
    { id: 'CC004', text: 'The patient’s functional or mobility needs have changed' },
  ];

  const [answers, setAnswers] = useState({});

const amputationLevels = [
  'Partial Foot/Symes',
  'BK',
  'AK/KD',
  'Hip-Level',
];

const sides = [
  'Left',
  'Right',
  'Bilateral',
];

const etiologies = [
  'Trauma',
  'Congenital Defect',
  'Vascular Compromise',
  'Diabetes',
  'Infection',
  'Other',
];

  const handleChange = (id) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAll = (arr) => {
    setAnswers((prev) => {
      const updated = { ...prev };
      const allSelected = arr.every((q) => !!prev[q.id]);

      arr.forEach((q) => {
        updated[q.id] = !allSelected;
      });

      return updated;
    });
  };

  const clearAll = () => {
  setAnswers({
    AMPUTATION_LEVEL: '',
    SIDE: '',
    ETIOLOGY: '',
  });
};

  const hasAnyChecked = (arr) => arr.some((q) => !!answers[q.id]);
  const areAllChecked = (arr) => arr.length > 0 && arr.every((q) => !!answers[q.id]);

  const showK2 = areAllChecked(k1Questions);
  const showK3 = areAllChecked(k2Questions);
  const showK4 = areAllChecked(k3Questions);

  const showClinicalDetails = !!answers.CN_YES;
  const showEnvironmentalDetails = !!answers.EN_YES;
  const isExistingProstheticUser = answers.NEW_PROSTHETIC_USER === 'no';

  const joinList = (items) => {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
  };

  const instructionStyle = {
    color: '#007BFF',
    fontWeight: '700',
    marginBottom: '15px',
  };

  const subPromptStyle = {
    color: '#007BFF',
    fontWeight: '700',
    marginTop: '10px',
    marginBottom: '12px',
  };

const sectionBoxStyle = {
  marginTop: '25px',
  marginBottom: '25px',
  padding: '20px',
  border: '2px solid #d9e7ff',
  borderRadius: '10px',
  backgroundColor: '#fbfdff',
};

  const helperBoxStyle = {
    backgroundColor: '#f4f8ff',
    border: '1px solid #cfe0ff',
    borderRadius: '8px',
    padding: '12px 14px',
    marginTop: '12px',
    marginBottom: '16px',
    color: '#1f3f75',
    fontWeight: '600',
    lineHeight: '1.5',
  };

  const renderGroup = (arr) =>
    arr.map((q) => (
      <div key={q.id} style={{ marginBottom: '10px' }}>
        <label>
          <input
            type="checkbox"
            checked={!!answers[q.id]}
            onChange={() => handleChange(q.id)}
            style={{ marginRight: '10px' }}
          />
          {q.text}
        </label>
      </div>
    ));

  const renderSection = (title, arr) => (
    <div
      style={{
        marginBottom: '20px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '10px',
        }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        <label>
          <input
            type="checkbox"
            checked={areAllChecked(arr)}
            onChange={() => handleSelectAll(arr)}
            style={{ marginRight: '8px' }}
          />
          Select All
        </label>
      </div>
      {renderGroup(arr)}
    </div>
  );

  const getKLevel = () => {
    if (hasAnyChecked(k4Questions)) return 'K4';
    if (hasAnyChecked(k3Questions)) return 'K3';
    if (hasAnyChecked(k2Questions)) return 'K2';
    if (hasAnyChecked(k1Questions)) return 'K1';
    return 'Unknown';
  };

  const getKLevelSentence = () => {
    const kLevel = getKLevel();

    if (kLevel === 'K1') {
      return 'The patient demonstrates K1-level ambulation with household mobility potential.';
    }
    if (kLevel === 'K2') {
      return 'The patient demonstrates K2-level ambulation with limited community mobility.';
    }
    if (kLevel === 'K3') {
      return 'The patient demonstrates K3-level ambulation with variable cadence and community mobility demands.';
    }
    if (kLevel === 'K4') {
      return 'The patient demonstrates K4-level ambulation with high-level activity demands beyond basic ambulation.';
    }
    return 'The patient’s functional level is currently unclear based on the information provided.';
  };

const getHistorySentence = () => {
  const details = [];

  if (answers.AMPUTATION_LEVEL) {
    details.push(`${answers.AMPUTATION_LEVEL} amputation`);
  }

  if (answers.SIDE) {
    details.push(`${answers.SIDE.toLowerCase()} side`);
  }

  if (answers.ETIOLOGY) {
  const etiologyText =
    answers.ETIOLOGY === 'Diabetic'
      ? 'diabetes'
      : answers.ETIOLOGY.toLowerCase();

  details.push(`secondary to ${etiologyText}`);
}

  if (!details.length) return '';

  return `The patient presents with a ${details.join(', ')}.`;
};

  const getPhysicalConditionSentence = () => {
    const selected = [];
    if (answers.CC001) selected.push('the current prosthesis demonstrates mechanical wear, damage, or functional failure');
    if (answers.CC002) selected.push('the current socket no longer fits appropriately or causes discomfort');
    if (answers.CC003) selected.push('the patient’s residual limb volume, anatomy, or physical condition has changed');
    if (answers.CC004) selected.push('the patient’s functional or mobility needs have changed');

    if (!selected.length) return '';
    return `The patient requires prosthetic replacement due to documented physiological change, socket fit deterioration, and/or prosthetic component wear, including ${joinList(selected)}.`;
  };

  const getClinicalNeedsSentence = () => {
    const selected = [];
    if (answers.CN001) selected.push('improved gait stability');
    if (answers.CN002) selected.push('enhanced safety during ambulation to reduce fall risk');
    if (answers.CN003) selected.push('additional residual limb protection');
    if (answers.CN004) selected.push('shock absorption or impact reduction');
    if (answers.CN005) selected.push('increased comfort for prolonged prosthetic use');
    if (answers.CN006) selected.push('additional energy efficiency to reduce fatigue');
    if (answers.CN007) selected.push('improved rollover or smoother gait mechanics');

    if (!selected.length) return '';
    return `The patient’s clinical presentation requires ${joinList(selected)}.`;
  };

  const getEnvironmentalSentence = () => {
    const selected = [];
    if (answers.EN001) selected.push('safe navigation of uneven terrain');
    if (answers.EN002) selected.push('regular stair and curb negotiation');
    if (answers.EN003) selected.push('community ambulation');
    if (answers.EN004) selected.push('long-distance or extended walking');
    if (answers.EN005) selected.push('higher-level or demanding activities');

    if (!selected.length) return '';
    return `The patient’s environment requires ${joinList(selected)}.`;
  };

  const getK2K3ClinicalItems = () => {
    const selected = [];
    if (answers.CN001) selected.push('improved gait stability');
    if (answers.CN002) selected.push('enhanced safety during ambulation with reduced fall risk');
    if (answers.CN003) selected.push('additional residual limb protection');
    if (answers.CN004) selected.push('shock absorption or impact reduction');
    if (answers.CN005) selected.push('improved comfort for prolonged prosthetic use');
    if (answers.CN006) selected.push('greater energy efficiency to reduce fatigue');
    if (answers.CN007) selected.push('improved rollover and smoother gait mechanics');
    return selected;
  };

  const getK2K3EnvironmentalItems = () => {
    const selected = [];
    if (answers.EN001) selected.push('uneven terrain such as grass, gravel, or slopes');
    if (answers.EN002) selected.push('regular stair and curb negotiation');
    if (answers.EN003) selected.push('community ambulation outside the home');
    if (answers.EN004) selected.push('long-distance or extended walking demands');
    if (answers.EN005) selected.push('higher-level functional demands related to work, recreation, or exercise');
    return selected;
  };

  const getK2K3TechnologySentence = () => {
    const kLevel = getKLevel();
    const clinicalItems = getK2K3ClinicalItems();
    const environmentalItems = getK2K3EnvironmentalItems();

    if (!answers.K2_K3_YES) return '';

    const benefitParts = [];

    if (clinicalItems.length) {
      benefitParts.push(clinicalItems.join(', '));
    }

    if (environmentalItems.length) {
      benefitParts.push(environmentalItems.join(', '));
    }

    const combinedBenefits = benefitParts.length
      ? joinList(benefitParts)
      : 'the patient’s documented functional and safety needs';

    if (kLevel === 'K2') {
  return `Although the patient demonstrates functional abilities consistent with a K2 level, K3-level microprocessor knee technology is medically necessary due to ${combinedBenefits}. The selected technology is expected to improve functional health outcomes including stability, safety, and reduction in fall risk while also improving performance of activities of daily living. Lower-level knee systems have been considered and ruled out because they would not sufficiently meet the patient’s functional and medical needs. The prescribed microprocessor knee is indicated for K2 functional level use, includes integrated stumble-recovery technology, and the patient is able to use a device requiring daily charging and is able to understand and respond to error alerts and alarms.`;
}

return `Microprocessor knee technology is medically necessary due to ${combinedBenefits}. The selected technology is expected to improve functional mobility, gait efficiency, stability, safety, and performance of activities of daily living while supporting variable cadence ambulation and community mobility demands. Lower-level knee systems have been considered and ruled out because they would not sufficiently meet the patient’s functional and medical needs. The patient demonstrates the cognitive ability and functional capacity necessary to safely and effectively utilize advanced prosthetic knee technology.`;
};

  const getClosingSentence = () => {
  const hasPhysicalCondition =
    !!answers.CC001 || !!answers.CC002 || !!answers.CC003 || !!answers.CC004;

  const hasClinicalNeeds =
    !!answers.CN001 || !!answers.CN002 || !!answers.CN003 || !!answers.CN004 ||
    !!answers.CN005 || !!answers.CN006 || !!answers.CN007;

  const hasEnvironmentalNeeds =
    !!answers.EN001 || !!answers.EN002 || !!answers.EN003 || !!answers.EN004 || !!answers.EN005;

  const hasK2K3TechnologyNeed = getKLevel() === 'K2' && !!answers.K2_K3_YES;

  const isNewAmputee = answers.NEW_PROSTHETIC_USER === 'yes';

  if (isNewAmputee) {
  return 'Based on the patient’s current functional level, clinical needs, and environmental demands, a prosthesis is medically necessary to support safe ambulation, mobility, and independence.';
} 
  if (hasPhysicalCondition || hasClinicalNeeds || hasEnvironmentalNeeds || hasK2K3TechnologyNeed) {
    return 'Based on the patient’s functional level, clinical needs, environmental demands, and documented change in condition, a new prosthetic socket and/or prosthesis is medically necessary to support safe and effective ambulation.';
  }

  return '';
};

  const kLevel = getKLevel();
  const kLevelSentence = getKLevelSentence();
  const historySentence = getHistorySentence();
  const physicalConditionSentence = getPhysicalConditionSentence();
  const clinicalNeedsSentence = getClinicalNeedsSentence();
  const environmentalSentence = getEnvironmentalSentence();
  const k2K3TechnologySentence = getK2K3TechnologySentence();
  const closingSentence = getClosingSentence();

  const noteText = [
  'History',
  historySentence,
  kLevelSentence,
  answers.NEW_PROSTHETIC_USER === 'yes'
    ? 'The patient presents as a new amputee requiring initial prosthetic intervention in order to regain as much of their pre-amputation functional capacity as possible.'
    : '',
  physicalConditionSentence,
  '',
  'Documentation Guidance',
  clinicalNeedsSentence,
  environmentalSentence,
  k2K3TechnologySentence,
  closingSentence ||
    'At this time, no additional clinical or environmental considerations requiring specialized prosthetic intervention have been identified based on the information provided.',
]
  .filter(Boolean)
  .join('\n\n');

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <img src={logo} alt="ProsthetIQ Logic Logo" style={{ height: '100px' }} />
        <h1>ProsthetIQ Logic</h1>
      </div>

      <div style={sectionBoxStyle}>
  <h2>History</h2>
<div style={{ marginBottom: '20px' }}>
  <h3>Amputation Level</h3>
  <select
    value={answers.AMPUTATION_LEVEL || ''}
    onChange={(e) =>
      setAnswers((prev) => ({
        ...prev,
        AMPUTATION_LEVEL: e.target.value,
      }))
    }
    style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
  >
    <option value="">Select amputation level</option>
    {amputationLevels.map((level) => (
      <option key={level} value={level}>
        {level}
      </option>
    ))}
  </select>

  <h3 style={{ marginTop: '20px' }}>Side</h3>
  <select
    value={answers.SIDE || ''}
    onChange={(e) =>
      setAnswers((prev) => ({
        ...prev,
        SIDE: e.target.value,
      }))
    }
    style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
  >
    <option value="">Select side</option>
    {sides.map((side) => (
      <option key={side} value={side}>
        {side}
      </option>
    ))}
  </select>

  <h3 style={{ marginTop: '20px' }}>Etiology</h3>
  <select
    value={answers.ETIOLOGY || ''}
    onChange={(e) =>
      setAnswers((prev) => ({
        ...prev,
        ETIOLOGY: e.target.value,
      }))
    }
    style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
  >
    <option value="">Select etiology</option>
    {etiologies.map((etiology) => (
      <option key={etiology} value={etiology}>
        {etiology}
      </option>
    ))}
  </select>
</div>


  <h3>Functional Level</h3>
      <p style={instructionStyle}>
        Check tasks. Next level appears only when all are selected.
      </p>

      {renderSection('K1 Tasks', k1Questions)}
      {showK2 && renderSection('K2 Tasks', k2Questions)}
      {showK3 && renderSection('K3 Tasks', k3Questions)}
      {showK4 && renderSection('K4 Tasks', k4Questions)}

      {(kLevel === 'K2' || kLevel === 'K3' || kLevel === 'K4') && (
        <div
          style={{
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
          }}
        >
          <h2 style={{ marginTop: 0 }}>Advanced Knee Technology </h2>
          <p style={instructionStyle}>
            Does this patient require advanced knee technology (such as a microprocessor knee) for safety, 	 	    stability, or improved mobility?
          </p>
          <label>
            <input
              type="checkbox"
              checked={!!answers.K2_K3_YES}
              onChange={() => handleChange('K2_K3_YES')}
              style={{ marginRight: '8px' }}
            />
            Yes
          </label>

          {answers.K2_K3_YES && (
            <div style={helperBoxStyle}>
              Patients who require advanced knee technology must meet specific documentation criteria.  
		Select applicable clinical or environmental factors below to support medical necessity.
            </div>
          )}
        </div>
      )}

      <h2>Physical Condition</h2>

<p style={instructionStyle}>
  Is the patient a new prosthetic user?
</p>

<label style={{ display: 'block', marginBottom: '8px' }}>
  <input
    type="radio"
    name="newProstheticUser"
    checked={answers.NEW_PROSTHETIC_USER === 'yes'}
    onChange={() =>
      setAnswers((prev) => ({
        ...prev,
        NEW_PROSTHETIC_USER: 'yes',
        CC001: false,
        CC002: false,
        CC003: false,
        CC004: false,
      }))
    }
    style={{ marginRight: '8px' }}
  />
  Yes — new prosthetic user
</label>

<label style={{ display: 'block', marginBottom: '12px' }}>
  <input
    type="radio"
    name="newProstheticUser"
    checked={answers.NEW_PROSTHETIC_USER === 'no'}
    onChange={() =>
      setAnswers((prev) => ({
        ...prev,
        NEW_PROSTHETIC_USER: 'no',
      }))
    }
    style={{ marginRight: '8px' }}
  />
  No — patient has an existing prosthesis
</label>

{isExistingProstheticUser && (
  <>
    <p style={subPromptStyle}>
      If the patient has a device, please select the reason for treatment below.
    </p>
    {renderGroup(physicalConditionQuestions)}
  </>
)}

</div>

      <div style={sectionBoxStyle}>
  <h2>Documentation Guidance</h2>

  <h3>Clinical Needs</h3>      
	<p style={instructionStyle}>
        Does the patient have any clinical conditions that require special attention?
      </p>
      <label>
        <input
          type="checkbox"
          checked={!!answers.CN_YES}
          onChange={() => handleChange('CN_YES')}
          style={{ marginRight: '8px' }}
        />
        Yes
      </label>

      {showClinicalDetails && (
        <>
          <p style={subPromptStyle}>Check all that apply.</p>
          {renderGroup(clinicalNeedsQuestions)}
        </>
      )}

      <h3>Environmental Needs</h3>
      <p style={instructionStyle}>
        Does your patient need to negotiate any of these environmental obstacles?
      </p>
      <label>
        <input
          type="checkbox"
          checked={!!answers.EN_YES}
          onChange={() => handleChange('EN_YES')}
          style={{ marginRight: '8px' }}
        />
        Yes
      </label>

      {showEnvironmentalDetails && (
        <>
          <p style={subPromptStyle}>Check all that apply.</p>
          {renderGroup(environmentalQuestions)}
        </>
      )}

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
  <button
    onClick={() => navigator.clipboard.writeText(noteText)}
    style={{
      padding: '10px 16px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#007BFF',
      color: 'white',
      cursor: 'pointer',
    }}
  >
    Copy Text
  </button>

  <button
    onClick={clearAll}
    style={{
      padding: '10px 16px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#444',
      color: 'white',
      cursor: 'pointer',
    }}
  >
    Clear All
  </button>
</div>

</div>

      <div
        style={{
          marginTop: '30px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      >
        <h2>History</h2>
        {historySentence && <p>{historySentence}</p>}
	<p>{kLevelSentence}</p>
{answers.NEW_PROSTHETIC_USER === 'yes' && (
  <p>
    The patient presents as a new amputee requiring initial prosthetic intervention in order to regain as much of their pre-amputation functional capacity as possible.
  </p>
)}
        {physicalConditionSentence && <p>{physicalConditionSentence}</p>}
	<h2>Documentation Guidance</h2>
{!clinicalNeedsSentence &&
 !environmentalSentence &&
 !k2K3TechnologySentence &&
 !closingSentence && (
  <p>
    At this time, no additional clinical or environmental considerations requiring specialized prosthetic intervention have been identified based on the information provided.
  </p>
)}
        {clinicalNeedsSentence && <p>{clinicalNeedsSentence}</p>}
        {environmentalSentence && <p>{environmentalSentence}</p>}
        {k2K3TechnologySentence && <p>{k2K3TechnologySentence}</p>}
        {closingSentence && <p>{closingSentence}</p>}
      </div>

      <p
        style={{
          marginTop: '15px',
          fontSize: '12px',
          color: '#666',
          textAlign: 'center',
        }}
      >
        ProsthetIQ Logic is intended for educational and clinical reference purposes only. Use of this tool does not guarantee reimbursement or coverage determination. Final documentation, medical necessity determination, and claim submission responsibility remain with the treating clinician and supplier.
<br />
<br />
For more detailed information, please refer to the Medicare Local Coverage Determination (LCD) and Policy Article currently in effect for lower-limb prosthetic components.
        <br />
        <br />
        View LCD L33787 – Lower Limb Prostheses (
        <a
          href="https://www.cms.gov/medicare-coverage-database/view/lcd.aspx?LCDId=33787"
          target="_blank"
          rel="noopener noreferrer"
        >
          L33787
        </a>
        )
        <br />
        View Policy Article A52496 – Lower Limb Prostheses (
        <a
          href="https://www.cms.gov/medicare-coverage-database/view/article.aspx?articleId=52496"
          target="_blank"
          rel="noopener noreferrer"
        >
          A52496
        </a>
        )
      </p>
    </div>
  );
}

export default App;