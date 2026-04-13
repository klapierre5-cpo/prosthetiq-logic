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
    { id: 'CC001', text: 'The current prosthesis is broken or not functioning properly' },
    { id: 'CC002', text: 'The current socket is painful or fitting poorly' },
    { id: 'CC003', text: 'The patient’s weight or residual limb volume has changed' },
    { id: 'CC004', text: 'The patient’s functional level has changed' },
  ];

  const [answers, setAnswers] = useState({});

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

  const clearAll = () => setAnswers({});

  const hasAnyChecked = (arr) => arr.some((q) => !!answers[q.id]);
  const areAllChecked = (arr) => arr.length > 0 && arr.every((q) => !!answers[q.id]);

  const showK2 = areAllChecked(k1Questions);
  const showK3 = areAllChecked(k2Questions);
  const showK4 = areAllChecked(k3Questions);

  const showClinicalDetails = !!answers.CN_YES;
  const showEnvironmentalDetails = !!answers.EN_YES;

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

  const getPhysicalConditionSentence = () => {
    const selected = [];
    if (answers.CC001) selected.push('the current prosthesis is broken or not functioning properly');
    if (answers.CC002) selected.push('the current socket is painful or fitting poorly');
    if (answers.CC003) selected.push('the patient’s weight or residual limb volume has changed');
    if (answers.CC004) selected.push('the patient’s functional level has changed');

    if (!selected.length) return '';
    return `The patient presents with a documented change in condition, including ${joinList(selected)}.`;
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

  const getClosingSentence = () => {
    const hasPhysicalCondition =
      !!answers.CC001 || !!answers.CC002 || !!answers.CC003 || !!answers.CC004;

    const hasClinicalNeeds =
      !!answers.CN001 || !!answers.CN002 || !!answers.CN003 || !!answers.CN004 ||
      !!answers.CN005 || !!answers.CN006 || !!answers.CN007;

    const hasEnvironmentalNeeds =
      !!answers.EN001 || !!answers.EN002 || !!answers.EN003 || !!answers.EN004 || !!answers.EN005;

    if (hasPhysicalCondition || hasClinicalNeeds || hasEnvironmentalNeeds) {
      return 'Based on the patient’s functional level, clinical needs, environmental demands, and documented change in condition, a new prosthetic socket and/or prosthesis is medically necessary to support safe and effective ambulation.';
    }

    return '';
  };

  const kLevel = getKLevel();
  const kLevelSentence = getKLevelSentence();
  const physicalConditionSentence = getPhysicalConditionSentence();
  const clinicalNeedsSentence = getClinicalNeedsSentence();
  const environmentalSentence = getEnvironmentalSentence();
  const closingSentence = getClosingSentence();

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <img src={logo} alt="ProsthetIQ Logic Logo" style={{ height: '100px' }} />
        <h1>ProsthetIQ Logic</h1>
      </div>

      <h2>Functional Level</h2>
      <p style={instructionStyle}>
        Check tasks. Next level appears only when all are selected.
      </p>

      {renderSection('K1 Tasks', k1Questions)}
      {showK2 && renderSection('K2 Tasks', k2Questions)}
      {showK3 && renderSection('K3 Tasks', k3Questions)}
      {showK4 && renderSection('K4 Tasks', k4Questions)}

      <h2>Physical Condition</h2>
      <p style={instructionStyle}>
        Tell us about the prosthesis, are any of these happening?
      </p>
      {renderGroup(physicalConditionQuestions)}

      <h2>Clinical Needs</h2>
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

      <h2>Environmental Needs</h2>
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

      <div style={{ marginTop: '20px' }}>
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

      <div
        style={{
          marginTop: '30px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      >
        <h2>Documentation Guidance for Coverage</h2>
        <p>
          <strong>K-Level:</strong> {kLevel}
        </p>
        <p>{kLevelSentence}</p>
        {physicalConditionSentence && <p>{physicalConditionSentence}</p>}
        {clinicalNeedsSentence && <p>{clinicalNeedsSentence}</p>}
        {environmentalSentence && <p>{environmentalSentence}</p>}
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
        ProsthetIQ Logic is intended for educational and clinical reference purposes only. 
      </p>
    </div>
  );
}

export default App;