import { useState } from 'react';

function App() {
  const questions = [
    { id: 'T001', text: 'Does the patient have the cognitive ability to safely use a prosthesis?' },
    { id: 'T002', text: 'Are they capable of safe transfers?' },
    { id: 'T003', text: 'Can they ambulate on a flat surface inside the home?' },
    { id: 'T004', text: 'Can they ambulate on flat, smooth surfaces outside the home?' },
    { id: 'T005', text: 'Can they negotiate a curb?' },
    { id: 'T006', text: 'Can they access public or private transportation?' },
    { id: 'T007', text: 'Can they negotiate 1-2 stairs?' },
    { id: 'T008', text: 'Can they traverse low-level environmental barriers (e.g. an ADA compliant ramp)?' },
    { id: 'T009', text: 'Can they walk on terrain that varies in texture and level?' },
    { id: 'T010', text: 'Can they negotiate 3-7 consecutive stairs?' },
    { id: 'T011', text: 'Can they open and close doors?' },
    { id: 'T012', text: 'Can they ambulate through a crowded area?' },
    { id: 'T013', text: 'Can they ambulate with a variable cadence?' },
    { id: 'T014', text: 'Can they cross a controlled intersection within the community during the time limit provided?' },
    { id: 'T015', text: 'Do they perform dual ambulation tasks (e.g. carrying an item while ambulating)?' },
    { id: 'T016', text: 'Are they capable of running?' },
    { id: 'T017', text: 'Are they capable of repetitive stair climbing?' },
    { id: 'T018', text: 'Are they capable of climbing steep hills?' },
    { id: 'T019', text: 'Are they a caregiver for another individual?' },
    { id: 'T020', text: 'Do they perform home maintenance (e.g. repairs, cleaning)?' },
  ];

  const clinicalNeedsQuestions = [
    { id: 'CN001', text: 'Does the patient require improved gait stability?' },
    { id: 'CN002', text: 'Does the patient require enhanced safety during ambulation to reduce fall risk?' },
    { id: 'CN003', text: 'Does the patient require additional residual limb protection?' },
    { id: 'CN004', text: 'Does the patient require shock absorption or impact reduction?' },
    { id: 'CN005', text: 'Does the patient require increased comfort for prolonged prosthetic use?' },
    { id: 'CN006', text: 'Does the patient require additional energy efficiency to reduce fatigue?' },
    { id: 'CN007', text: 'Does the patient require improved rollover or smoother gait mechanics?' },
  ];

  const changeConditionQuestions = [
    { id: 'CC001', text: 'Is the current prosthesis broken or not functioning properly?' },
    { id: 'CC002', text: 'Is the current socket fitting poorly or painful?' },
    { id: 'CC003', text: 'Has the patient experienced significant weight or residual limb volume change recently?' },
    { id: 'CC004', text: 'Has the patient’s functional level changed since the last evaluation?' },
  ];

  const environmentalQuestions = [
    { id: 'EN001', text: 'Does the patient need to walk on uneven terrain (grass, gravel, slopes)?' },
    { id: 'EN002', text: 'Does the patient need to navigate stairs or curbs regularly?' },
    { id: 'EN003', text: 'Does the patient need to walk in the community (outside the home)?' },
    { id: 'EN004', text: 'Does the patient need to walk long distances or for extended periods?' },
    { id: 'EN005', text: 'Does the patient participate in higher-level or demanding activities (work, recreation, exercise)?' },
  ];

  const [answers, setAnswers] = useState({});

  const handleChange = (id) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: !prevAnswers[id],
    }));
  };

  const joinList = (items) => {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
  };

  const getKLevel = () => {
    const k4Tasks = ['T016', 'T017', 'T018', 'T019', 'T020'];
    const k3Tasks = ['T009', 'T010', 'T011', 'T012', 'T013', 'T014', 'T015'];
    const k2Tasks = ['T004', 'T005', 'T006', 'T007', 'T008'];
    const k1Tasks = ['T001', 'T002', 'T003'];

    const hasK4 = k4Tasks.some((taskId) => answers[taskId]);
    const hasK3 = k3Tasks.some((taskId) => answers[taskId]);
    const hasK2 = k2Tasks.some((taskId) => answers[taskId]);
    const hasK1 = k1Tasks.some((taskId) => answers[taskId]);

    if (hasK4) return 'K4';
    if (hasK3) return 'K3';
    if (hasK2) return 'K2';
    if (hasK1) return 'K1';
    return 'Unknown';
  };

  const kLevel = getKLevel();

  const getKLevelSentence = () => {
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

  const getClinicalNeedsSentence = () => {
    const selectedNeeds = [];

    if (answers.CN001) selectedNeeds.push('improved gait stability');
    if (answers.CN002) selectedNeeds.push('enhanced safety during ambulation to reduce fall risk');
    if (answers.CN003) selectedNeeds.push('additional residual limb protection');
    if (answers.CN004) selectedNeeds.push('shock absorption or impact reduction');
    if (answers.CN005) selectedNeeds.push('increased comfort for prolonged prosthetic use');
    if (answers.CN006) selectedNeeds.push('additional energy efficiency to reduce fatigue');
    if (answers.CN007) selectedNeeds.push('improved rollover or smoother gait mechanics');

    if (selectedNeeds.length === 0) return '';

    return `The patient’s clinical presentation requires ${joinList(selectedNeeds)}.`;
  };

  const getEnvironmentalSentence = () => {
    const selectedEnvironment = [];

    if (answers.EN001) selectedEnvironment.push('safe navigation of uneven terrain');
    if (answers.EN002) selectedEnvironment.push('regular stair and curb negotiation');
    if (answers.EN003) selectedEnvironment.push('community ambulation');
    if (answers.EN004) selectedEnvironment.push('long-distance or extended walking');
    if (answers.EN005) selectedEnvironment.push('higher-level or demanding activities');

    if (selectedEnvironment.length === 0) return '';

    return `The patient’s environment requires ${joinList(selectedEnvironment)}.`;
  };

  const getChangeConditionSentence = () => {
    const selectedChanges = [];

    if (answers.CC001) selectedChanges.push('the current prosthesis is broken or not functioning properly');
    if (answers.CC002) selectedChanges.push('the current socket is fitting poorly or causing pain');
    if (answers.CC003) selectedChanges.push('the patient has experienced significant weight or residual limb volume change recently');
    if (answers.CC004) selectedChanges.push('the patient’s functional level has changed since the last evaluation');

    if (selectedChanges.length === 0) return '';

    return `The patient presents with a documented change in physical condition, including ${joinList(selectedChanges)}.`;
  };

  const getClosingSentence = () => {
    const hasChangeCondition =
      answers.CC001 || answers.CC002 || answers.CC003 || answers.CC004;

    const hasClinicalNeeds =
      answers.CN001 || answers.CN002 || answers.CN003 || answers.CN004 ||
      answers.CN005 || answers.CN006 || answers.CN007;

    const hasEnvironmentalNeeds =
      answers.EN001 || answers.EN002 || answers.EN003 || answers.EN004 || answers.EN005;

    if (hasChangeCondition || hasClinicalNeeds || hasEnvironmentalNeeds) {
      return 'Based on the patient’s functional level, clinical needs, and documented change in condition, a new prosthetic socket and/or prosthesis is medically necessary to support safe and effective ambulation.';
    }

    return '';
  };

  const kLevelSentence = getKLevelSentence();
  const clinicalNeedsSentence = getClinicalNeedsSentence();
  const environmentalSentence = getEnvironmentalSentence();
  const changeConditionSentence = getChangeConditionSentence();
  const closingSentence = getClosingSentence();

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>ProsthetIQ Logic</h1>
      <p>Documentation support for prosthetic referrals</p>

      <h2>Functional Level</h2>
      {questions.map((question) => (
        <div key={question.id} style={{ marginBottom: '12px' }}>
          <label>
            <input
              type="checkbox"
              checked={!!answers[question.id]}
              onChange={() => handleChange(question.id)}
              style={{ marginRight: '10px' }}
            />
            {question.text}
          </label>
        </div>
      ))}

      <h2 style={{ marginTop: '30px' }}>Clinical Needs</h2>
      {clinicalNeedsQuestions.map((question) => (
        <div key={question.id} style={{ marginBottom: '12px' }}>
          <label>
            <input
              type="checkbox"
              checked={!!answers[question.id]}
              onChange={() => handleChange(question.id)}
              style={{ marginRight: '10px' }}
            />
            {question.text}
          </label>
        </div>
      ))}

      <h2 style={{ marginTop: '30px' }}>Environmental Needs</h2>
      {environmentalQuestions.map((question) => (
        <div key={question.id} style={{ marginBottom: '12px' }}>
          <label>
            <input
              type="checkbox"
              checked={!!answers[question.id]}
              onChange={() => handleChange(question.id)}
              style={{ marginRight: '10px' }}
            />
            {question.text}
          </label>
        </div>
      ))}

      <h2 style={{ marginTop: '30px' }}>Change in Physical Condition</h2>
      {changeConditionQuestions.map((question) => (
        <div key={question.id} style={{ marginBottom: '12px' }}>
          <label>
            <input
              type="checkbox"
              checked={!!answers[question.id]}
              onChange={() => handleChange(question.id)}
              style={{ marginRight: '10px' }}
            />
            {question.text}
          </label>
        </div>
      ))}

      <button
        onClick={() => setAnswers({})}
        style={{
          marginTop: '20px',
          padding: '10px 16px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: '#444',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Clear All
      </button>

      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Generated Output</h2>
        <p><strong>K-Level:</strong> {kLevel}</p>
        <p>{kLevelSentence}</p>
        {clinicalNeedsSentence && <p>{clinicalNeedsSentence}</p>}
        {environmentalSentence && <p>{environmentalSentence}</p>}
        {changeConditionSentence && <p>{changeConditionSentence}</p>}
        {closingSentence && <p>{closingSentence}</p>}
      </div>
    </div>
  );
}

export default App;