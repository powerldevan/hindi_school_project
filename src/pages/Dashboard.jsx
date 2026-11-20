import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './Dashboard.css';
import balviharLogo from '../assets/balvihar-logo.png';
import vhpaLogo from '../assets/vhpa-logo.png';

function Dashboard({ role, username, userId }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedSubItem, setSelectedSubItem] = useState('');
  const [selectedDateTab, setSelectedDateTab] = useState('August 23, 2026');
  const [calendarMonthIndex, setCalendarMonthIndex] = useState(0);

  // Active sub-document tab for Spelling Bee
  const [spellingBeeDocTab, setSpellingBeeDocTab] = useState('steps');

  // Sample Exam state (Class selector & Oral vs Written tab)
  const [sampleExamClass, setSampleExamClass] = useState('Class 201');
  const [sampleExamPart, setSampleExamPart] = useState('oral');

  // Privacy toggle (Teachers/TAs/Admins can reveal names/emails if needed; hidden by default)
  const [showStudentInfo, setShowStudentInfo] = useState(false);

  // Unified directory matching exact login emails to assigned IDs and roles
  const userEmail = (username || '').trim().toLowerCase();
  const userDirectory = {
    // Admin
    'admin@balvihar.org': { id: 'BV-ADM-01', role: 'Admin' },

    // Teachers
    'smita@balvihar.org': { id: 'BV-TCH-01', role: 'Teacher' },
    'jayant@balvihar.org': { id: 'BV-TCH-02', role: 'Teacher' },
    'manju@balvihar.org': { id: 'BV-TCH-03', role: 'Teacher' },

    // Teaching Assistants / Volunteers
    'volunteer@balvihar.org': { id: 'BV-TA-01', role: 'Teaching Assistant' },
    'ta@balvihar.org': { id: 'BV-TA-02', role: 'Teaching Assistant' },

    // Class 201 Students (exact login emails)
    'ashpal.s@balvihar.org': { id: 'BV201-01', role: 'Student' },
    'krishna.s@balvihar.org': { id: 'BV201-02', role: 'Student' },
    'vani.g@balvihar.org': { id: 'BV201-03', role: 'Student' },
    'prathmesh.a@balvihar.org': { id: 'BV201-04', role: 'Student' },
    'aarnik.r@balvihar.org': { id: 'BV201-05', role: 'Student' },
    'anaisha.k@balvihar.org': { id: 'BV201-06', role: 'Student' },
    'avani.b@balvihar.org': { id: 'BV201-07', role: 'Student' },
    'shaurya.b@balvihar.org': { id: 'BV201-08', role: 'Student' },
    'anaya.t@balvihar.org': { id: 'BV201-09', role: 'Student' },
  };

  const matchedUser = userDirectory[userEmail];
  const resolvedRole = matchedUser?.role || role || 'Student';
  const resolvedId = userId || matchedUser?.id || 'BV-USR-01';

  const isTeacher = resolvedRole === 'Teacher';
  const isTA = resolvedRole === 'Teaching Assistant';
  const isAdmin = resolvedRole === 'Admin';
  const canEditAttendance = isTeacher || isTA || isAdmin;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
    navigate('/');
  };

  const classLevels = [
    'Class 100',
    'Class 101',
    'Class 102',
    'Class 103',
    'Class 201',
    'Class 202',
    'Class 203',
    'Class 301',
    'Class 302',
  ];

  const extracurricularList = [
    { title: 'Festivals', hindi: 'त्योहार' },
    { title: 'SAC', hindi: 'एसएसी' },
    { title: 'Annual Function', hindi: 'वार्षिक समारोह' },
  ];

  const resourcesList = [
    { title: 'Prayers', hindi: 'प्रार्थनाएँ' },
    { title: 'Spelling Bee', hindi: 'वर्तनी प्रतियोगिता' },
    { title: 'Sample Exam', hindi: 'नमूना परीक्षा' },
  ];

  // Full Calendar Month Configurations
  const fullCalendarMonths = [
    {
      name: 'August 2026',
      hindiName: 'अगस्त २०२६',
      year: 2026,
      totalDays: 31,
      startDay: 6,
      events: {
        9: { title: '@NHS', type: 'in-person' },
        23: { title: '@NHS', type: 'in-person' },
        30: { title: 'SAC @NHS', type: 'special' },
      },
    },
    {
      name: 'September 2026',
      hindiName: 'सितंबर २०२६',
      year: 2026,
      totalDays: 30,
      startDay: 2,
      events: {
        13: { title: 'Picnic @Jones Bridge Park', type: 'special' },
        20: { title: 'Online (ऑनलाइन)', type: 'online' },
        27: { title: '@NHS', type: 'in-person' },
      },
    },
    {
      name: 'October 2026',
      hindiName: 'अक्टूबर २०२६',
      year: 2026,
      totalDays: 31,
      startDay: 4,
      events: {
        4: { title: '@NHS', type: 'in-person' },
        18: { title: '@NHS', type: 'in-person' },
        25: { title: 'Online (ऑनलाइन)', type: 'online' },
      },
    },
    {
      name: 'November 2026',
      hindiName: 'नवंबर २०२६',
      year: 2026,
      totalDays: 30,
      startDay: 0,
      events: {
        1: { title: 'Diwali @Global Mall', type: 'special' },
        15: { title: '@NHS', type: 'in-person' },
        29: { title: 'Oral @NHS', type: 'exam' },
      },
    },
    {
      name: 'December 2026',
      hindiName: 'दिसंबर २०२६',
      year: 2026,
      totalDays: 31,
      startDay: 2,
      events: {
        6: { title: 'Exam @NHS', type: 'exam' },
      },
    },
    {
      name: 'January 2027',
      hindiName: 'जनवरी २०२७',
      year: 2027,
      totalDays: 31,
      startDay: 5,
      events: {
        10: { title: '@NHS', type: 'in-person' },
        17: { title: 'Online (ऑनलाइन)', type: 'online' },
        24: { title: '@NHS', type: 'in-person' },
      },
    },
    {
      name: 'February 2027',
      hindiName: 'फ़रवरी २०२७',
      year: 2027,
      totalDays: 28,
      startDay: 1,
      events: {
        7: { title: '@NHS', type: 'in-person' },
        21: { title: '@NHS', type: 'in-person' },
        28: { title: 'Rehearsal-TBD', type: 'special' },
      },
    },
    {
      name: 'March 2027',
      hindiName: 'मार्च २०२७',
      year: 2027,
      totalDays: 31,
      startDay: 1,
      events: {
        7: { title: '@NHS', type: 'in-person' },
        14: { title: 'Annual function - TBD', type: 'special' },
        21: { title: '@NHS', type: 'in-person' },
      },
    },
    {
      name: 'April 2027',
      hindiName: 'अप्रैल २०२७',
      year: 2027,
      totalDays: 30,
      startDay: 4,
      events: {
        11: { title: '@NHS', type: 'in-person' },
        18: { title: 'Online (ऑनलाइन)', type: 'online' },
        25: { title: 'Oral @NHS', type: 'exam' },
      },
    },
    {
      name: 'May 2027',
      hindiName: 'मई २०२७',
      year: 2027,
      totalDays: 31,
      startDay: 6,
      events: {
        2: { title: 'Exam @NHS', type: 'exam' },
        9: { title: 'Gurudakshina-TBD', type: 'special' },
      },
    },
  ];

  // All Academic Dates (Past Recorded + Future Class Dates)
  const attendanceDates = [
    { date: '8/23/2026', hindiDate: '२३ अगस्त २०२६' },
    { date: '9/13/2026', hindiDate: '१३ सितंबर २०२६' },
    { date: '9/27/2026', hindiDate: '२७ सितंबर २०२६' },
    { date: '10/4/2026', hindiDate: '४ अक्टूबर २०२६' },
    { date: '10/18/2026', hindiDate: '१८ अक्टूबर २०२६' },
    { date: '10/25/2026', hindiDate: '२५ अक्टूबर २०२६' },
    { date: '11/1/2026', hindiDate: '१ नवंबर २०२६' },
    { date: '11/15/2026', hindiDate: '१५ नवंबर २०२६' },
    { date: '11/29/2026', hindiDate: '२९ नवंबर २०२६' },
    { date: '12/6/2026', hindiDate: '६ दिसंबर २०२६' },
    { date: '1/10/2027', hindiDate: '१० जनवरी २०२७' },
    { date: '1/17/2027', hindiDate: '१७ जनवरी २०२७' },
    { date: '1/24/2027', hindiDate: '२४ जनवरी २०२७' },
    { date: '2/7/2027', hindiDate: '७ फ़रवरी २०२७' },
    { date: '2/21/2027', hindiDate: '२१ फ़रवरी २०२७' },
    { date: '2/28/2027', hindiDate: '२८ फ़रवरी २०२७' },
    { date: '3/7/2027', hindiDate: '७ मार्च २०२७' },
    { date: '3/14/2027', hindiDate: '१४ मार्च २०२७' },
    { date: '3/21/2027', hindiDate: '२१ मार्च २०२७' },
    { date: '4/11/2027', hindiDate: '११ अप्रैल २०२७' },
    { date: '4/18/2027', hindiDate: '१८ अप्रैल २०२७' },
    { date: '4/25/2027', hindiDate: '२५ अप्रैल २०२७' },
    { date: '5/2/2027', hindiDate: '२ मई २०२७' },
    { date: '5/9/2027', hindiDate: '९ मई २०२७' },
  ];

  // Roster identified strictly by Student ID (emails match login credentials)
  const class201Roster = [
    { id: 'BV201-01', email: 'ashpal.s@balvihar.org', name: 'Ashpal Sharma' },
    { id: 'BV201-02', email: 'krishna.s@balvihar.org', name: 'Krishna Singh' },
    { id: 'BV201-03', email: 'vani.g@balvihar.org', name: 'Vani Gaur' },
    { id: 'BV201-04', email: 'prathmesh.a@balvihar.org', name: 'Prathmesh Agrawal' },
    { id: 'BV201-05', email: 'aarnik.r@balvihar.org', name: 'Aarnik Rai' },
    { id: 'BV201-06', email: 'anaisha.k@balvihar.org', name: 'Anaisha Kumar' },
    { id: 'BV201-07', email: 'avani.b@balvihar.org', name: 'Avani Batchu' },
    { id: 'BV201-08', email: 'shaurya.b@balvihar.org', name: 'Shaurya Baranwal' },
    { id: 'BV201-09', email: 'anaya.t@balvihar.org', name: 'Anaya Tiwari' },
  ];

  const buildInitialRecord = (pastOverrides) => {
    return {
      '8/23/2026': true,
      '9/13/2026': true,
      '9/27/2026': true,
      '10/4/2026': false,
      '10/18/2026': true,
      '10/25/2026': false,
      '11/1/2026': false,
      '11/15/2026': false,
      '11/29/2026': false,
      '12/6/2026': false,
      '1/10/2027': false,
      '1/17/2027': false,
      '1/24/2027': false,
      '2/7/2027': false,
      '2/21/2027': false,
      '2/28/2027': false,
      '3/7/2027': false,
      '3/14/2027': false,
      '3/21/2027': false,
      '4/11/2027': false,
      '4/18/2027': false,
      '4/25/2027': false,
      '5/2/2027': false,
      '5/9/2027': false,
      ...pastOverrides,
    };
  };

  // Keyed strictly by Student ID
  const [attendanceRecords, setAttendanceRecords] = useState({
    'BV201-01': buildInitialRecord({}),
    'BV201-02': buildInitialRecord({}),
    'BV201-03': buildInitialRecord({}),
    'BV201-04': buildInitialRecord({}),
    'BV201-05': buildInitialRecord({}),
    'BV201-06': buildInitialRecord({ '10/18/2026': false }),
    'BV201-07': buildInitialRecord({ '9/13/2026': false, '9/27/2026': false, '10/18/2026': false }),
    'BV201-08': buildInitialRecord({}),
    'BV201-09': buildInitialRecord({}),
  });

  const handleCheckboxToggle = (studentId, date) => {
    if (!canEditAttendance) return;

    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [date]: !prev[studentId]?.[date],
      },
    }));
  };

  const class201Dates = [
    {
      id: 'aug-23',
      label: 'August 23, 2026',
      hindiLabel: '२३ अगस्त २०२६',
      content: (
        <div className="date-content-panel">
          <h3 className="hindi-title">बालविहार कक्षा २०१ — २३ अगस्त २०२६</h3>
          <p className="lesson-badge">पाठ २ “मैं संयुक्त शब्द हूँ” और पाठ ३ “भाषा के झरोखे से”</p>
          
          <div className="work-block classwork-block">
            <h4>Class Work (कक्षा कार्य) — Page 20</h4>
            <ul>
              <li>Underline संयुक्त शब्द in Indian national anthem and circle the names of the state in anthem.</li>
              <li>Google the English meaning of underlined words from the list Page 22.</li>
              <li><strong>Due Date:</strong> 25th Aug till 11:00 PM</li>
            </ul>
          </div>

          <div className="work-block homework-block">
            <h4>Homework (गृहकार्य)</h4>
            <ol>
              <li>Reading log: page 16 (Due on Aug 29th)</li>
              <li>Reading log: page 22 (Due on Sep 12th)</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: 'aug-30',
      label: 'August 30, 2026',
      hindiLabel: '३० अगस्त २०२६',
      content: (
        <div className="date-content-panel">
          <h3 className="hindi-title">Classes 201-202 — ३० अगस्त २०२६</h3>
          <div className="info-box">
            <p>
              The SAC show <strong>"Rhythms Of India"</strong> is a dance performance based on the Kathak dance form. There are 6 artists who perform on a variety of songs - devotional, folk and Bollywood classics. Students will watch the show and answer some questions about what they saw. Parents are encouraged to take pictures and help children answer questions, especially parents of young children.
            </p>
            <p style={{ marginTop: '10px' }}>
              Students should bring their Balvihar bookbags. A copy of this activity and/or a QR code will be posted at the registration/check-in desk outside the auditorium. Parents should take a picture of the activity or access through the QR code. The questions are shared here as well.
            </p>
          </div>

          <div className="work-block questions-block">
            <h4>Questions (प्रश्न):</h4>
            <ol>
              <li>
                Write 2 paragraphs about the show (7-10 sentences) in Hindi for the Balvihar National Newsletter. You may include the titles of the songs you heard, the description of costumes, and your thoughts on the performances.
              </li>
              <li>
                Have you attended any show/concert at school or outside? How was this show similar and/or different from what you have seen before?
              </li>
              <li>
                What is the objective of this show and the Support A Child initiative?
              </li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: 'sep-13',
      label: 'September 13, 2026',
      hindiLabel: '१३ सितंबर २०२६',
      content: (
        <div className="date-content-panel">
          <h3 className="hindi-title">कक्षा २०१ — १३ सितंबर २०२६</h3>
          <div className="notice-banner">
            <p>📲 <strong>Homework is in WhatsApp (गृहकार्य व्हाट्सएप पर साझा किया गया है)</strong></p>
          </div>
        </div>
      ),
    },
    {
      id: 'sep-20',
      label: 'September 20, 2026',
      hindiLabel: '२० सितंबर २०२६',
      content: (
        <div className="date-content-panel">
          <h3 className="hindi-title">कक्षा २०१ — २० सितंबर २०२६</h3>
          <div className="asynch-tag">Asynchronous Class (अतुल्यकालिक कक्षा)</div>
          <p style={{ margin: '10px 0' }}>
            Namaste, this week (Sept 20th) is our asynchronous class.
          </p>
          <p className="lesson-badge">Lessons 10 and 11 “क्रियाओं की व्यायामशाला“ और “सूर्य नमस्कार और क्रियाएँ“</p>
          <p>Read and understand these lessons, then do:</p>

          <div className="work-block classwork-block">
            <h4>Class Work (कक्षा कार्य)</h4>
            <ul>
              <li>Pages 67, 69, 73 &amp; 74</li>
              <li><strong>Due:</strong> Sunday Sept 20 @ 11:30 PM</li>
            </ul>
          </div>

          <div className="work-block homework-block">
            <h4>Home Work (गृहकार्य) — Due Sept 27th in class:</h4>
            <ol>
              <li>Remember the 12 names of सूर्यदेव from page 70.</li>
              <li>Reading log: page 71.</li>
              <li>Page 75 according to the instructions.</li>
            </ol>
          </div>

          <div className="warning-note">
            ⚠️ <strong>Note:</strong> Some kids didn't complete their past homework. Please make sure that is also due on Sept 27th, no excuses. Thanks 🙏
          </div>
        </div>
      ),
    },
    {
      id: 'sep-27',
      label: 'September 27, 2026',
      hindiLabel: '२७ सितंबर २०२६',
      content: (
        <div className="date-content-panel">
          <h3 className="hindi-title">कक्षा २०१ — २७ सितंबर २०२६</h3>
          <p className="lesson-badge">Lesson 9 “थाली में इंद्रधनुष”</p>

          <div className="work-block classwork-block">
            <h4>Class Works — Due Sept 28th Monday 11:00 PM</h4>
            <ol>
              <li>Do vibhakti for dictation words.</li>
              <li>From page 61, make complete sentences using words below:<br />
                <em>उदाहरण: मुझे फल खाना पसंद है ।</em>
              </li>
            </ol>
          </div>

          <div className="work-block homework-block">
            <h4>Homework — Due next class Oct 4th</h4>
            <ol>
              <li>Page 63 (Note: For Q3 &amp; Q4 take reference from page 61 &amp; 62).</li>
              <li>Page 60: Do again "Match Oblique" in your notebook.</li>
            </ol>
          </div>

          <div className="work-block special-block">
            <h4>📖 Book Report (in Hindi) for this Semester — Due Nov 15th</h4>
            <p><strong>Lesson 16:</strong> “हिमाद्रि तुंग शृंग से” (Page 112)</p>
            <p>Q2 &amp; Q3 will be part of the book report. No need to learn the poem, just write &amp; read 4 lines from your book report. Thanks!</p>
          </div>
        </div>
      ),
    },
    {
      id: 'oct-04',
      label: 'October 4, 2026',
      hindiLabel: '४ अक्टूबर २०२६',
      content: (
        <div className="date-content-panel">
          <h3 className="hindi-title">कक्षा २०१ — ४ अक्टूबर २०२६</h3>
          <p className="lesson-badge">Lesson 15 “फ़ोन पर बात”</p>

          <div className="work-block classwork-block">
            <h4>Class Work (कक्षा कार्य)</h4>
            <ul>
              <li>Page 104</li>
            </ul>
          </div>

          <div className="work-block homework-block">
            <h4>Homework (गृहकार्य)</h4>
            <ul>
              <li>Page 104: Learn the English meaning of the words.</li>
              <li>Read page 106 to understand.</li>
              <li>Page 109 homework.</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const handleItemClick = (parentTab, itemLabel) => {
    setActiveTab(parentTab);
    setSelectedSubItem(itemLabel);
  };

  const activeDateData = class201Dates.find((d) => d.label === selectedDateTab) || class201Dates[0];
  const currentMonthData = fullCalendarMonths[calendarMonthIndex];

  // Helper to build the calendar grid
  const renderCalendarBoxes = () => {
    const boxes = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdaysHindi = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

    const headers = weekdays.map((day, idx) => (
      <div key={`header-${day}`} className="calendar-grid-header-box">
        <span className="cal-day-eng">{day}</span>
        <span className="cal-day-hin">({weekdaysHindi[idx]})</span>
      </div>
    ));

    for (let i = 0; i < currentMonthData.startDay; i++) {
      boxes.push(<div key={`pad-${i}`} className="calendar-day-box empty-day" />);
    }

    for (let day = 1; day <= currentMonthData.totalDays; day++) {
      const event = currentMonthData.events[day];
      boxes.push(
        <div
          key={`day-${day}`}
          className={`calendar-day-box ${event ? `has-event event-${event.type}` : ''}`}
        >
          <div className="day-box-header">
            <span className="day-number">{day}</span>
            {day === 1 && <span className="day-month-indicator">{currentMonthData.name.split(' ')[0]}</span>}
          </div>
          {event && (
            <div className={`event-badge-card type-${event.type}`}>
              <div className="event-badge-dot"></div>
              <div className="event-badge-label">{event.title}</div>
            </div>
          )}
        </div>
      );
    }

    return { headers, boxes };
  };

  const { headers, boxes } = renderCalendarBoxes();

  return (
    <div className="portal-container">
      {/* Top Header */}
      <header className="portal-header">
        <div className="header-inner">
          <div className="brand-group">
            <img src={balviharLogo} alt="Balvihar Logo" className="portal-logo" />
            <img src={vhpaLogo} alt="VHPA Logo" className="portal-logo" />
            <div className="portal-titles">
              <h1>Balvihar Hindi School of Atlanta (अटलांटा बालविहार हिंदी विद्यालय)</h1>
              <p>VHPA Educational Program (विहिप शैक्षिक कार्यक्रम)</p>
            </div>
          </div>

          <div className="user-profile-bar">
            <div className="user-details">
              <span className="user-name">ID: {resolvedId}</span>
              <span className="user-role-badge">
                {isTeacher
                  ? 'Teacher (शिक्षक)'
                  : isTA
                  ? 'Teaching Assistant (सहायक शिक्षक)'
                  : isAdmin
                  ? 'Admin (व्यवस्थापक)'
                  : `${resolvedRole} (छात्र)`}
              </span>
            </div>
            <button onClick={handleLogout} className="portal-logout-btn">
              Log Out (लॉग आउट)
            </button>
          </div>
        </div>
      </header>

      {/* Main Brown Navigation Bar */}
      <nav className="portal-nav">
        <div className="nav-container">
          <div
            className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('Home');
              setSelectedSubItem('');
            }}
          >
            <span>Home (मुख्य पृष्ठ)</span>
          </div>

          <div className={`nav-item dropdown ${activeTab === 'Class' ? 'active' : ''}`}>
            <span>Class (कक्षा) ▾</span>
            <div className="dropdown-menu">
              {classLevels.map((lvl) => (
                <div
                  key={lvl}
                  className="dropdown-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick('Class', lvl);
                  }}
                >
                  {lvl} (कक्षा {lvl.replace('Class ', '')})
                </div>
              ))}
            </div>
          </div>

          <div className={`nav-item dropdown ${activeTab === 'Attendance' ? 'active' : ''}`}>
            <span>Attendance (उपस्थिति) ▾</span>
            <div className="dropdown-menu">
              {classLevels.map((lvl) => (
                <div
                  key={lvl}
                  className="dropdown-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick('Attendance', lvl);
                  }}
                >
                  {lvl} (उपस्थिति {lvl.replace('Class ', '')})
                </div>
              ))}
            </div>
          </div>

          <div className={`nav-item dropdown ${activeTab === 'Extracurriculars' ? 'active' : ''}`}>
            <span>Extracurriculars (पाठ्येतर गतिविधियाँ) ▾</span>
            <div className="dropdown-menu">
              {extracurricularList.map((item) => (
                <div
                  key={item.title}
                  className="dropdown-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick('Extracurriculars', item.title);
                  }}
                >
                  {item.title} ({item.hindi})
                </div>
              ))}
            </div>
          </div>

          <div
            className={`nav-item ${activeTab === 'Calendar' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('Calendar');
              setSelectedSubItem('');
            }}
          >
            <span>Calendar (कैलेंडर)</span>
          </div>

          <div className={`nav-item dropdown ${activeTab === 'Resources' ? 'active' : ''}`}>
            <span>Resources (संसाधन) ▾</span>
            <div className="dropdown-menu">
              {resourcesList.map((item) => (
                <div
                  key={item.title}
                  className="dropdown-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemClick('Resources', item.title);
                  }}
                >
                  {item.title} ({item.hindi})
                </div>
              ))}
            </div>
          </div>

          <div
            className={`nav-item ${activeTab === 'Contact' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('Contact');
              setSelectedSubItem('');
            }}
          >
            <span>Contact (संपर्क करें)</span>
          </div>
        </div>
      </nav>

      {/* Main Body View */}
      <main className="portal-body">
        <div className="view-card">
          <div className="breadcrumbs">
            <span>Portal (पोर्टल)</span> / <span>{activeTab}</span>{' '}
            {selectedSubItem && <> / <span>{selectedSubItem}</span></>}
          </div>

          <h2 className="tab-header">
            {activeTab === 'Calendar'
              ? 'Balvihar Calendar 2026–2027 (वार्षिक कैलेंडर)'
              : activeTab === 'Attendance' && selectedSubItem === 'Class 201'
              ? 'Class 201 Attendance (कक्षा २०१ उपस्थिति)'
              : activeTab === 'Resources' && selectedSubItem === 'Prayers'
              ? 'Balvihar Prayers (बालविहार प्रार्थना पुस्तिका)'
              : activeTab === 'Resources' && selectedSubItem === 'Spelling Bee'
              ? 'Spelling Bee Study Portal (वर्तनी प्रतियोगिता अध्ययन सामग्री)'
              : activeTab === 'Resources' && selectedSubItem === 'Sample Exam'
              ? 'Sample Exams & Model Papers (नमूना परीक्षा)'
              : selectedSubItem || activeTab}
          </h2>

          <div className="tab-inner-content">
            {/* 1. SAMPLE EXAM SECTION */}
            {activeTab === 'Resources' && selectedSubItem === 'Sample Exam' ? (
              <div className="sample-exam-container">
                <div className="exam-intro-banner">
                  <p>
                    <strong>Exam Structure:</strong> Hindi exams consist of two parts — <strong>Oral Exam (मौखिक परीक्षा)</strong> and <strong>Written Exam (लिखित परीक्षा)</strong>. Select a class level below to view model papers.
                  </p>
                </div>

                {/* Class Selector Pills */}
                <div className="exam-class-selector">
                  {classLevels.map((lvl) => (
                    <button
                      key={lvl}
                      className={`exam-class-pill ${sampleExamClass === lvl ? 'active' : ''}`}
                      onClick={() => setSampleExamClass(lvl)}
                    >
                      {lvl} (कक्षा {lvl.replace('Class ', '')})
                    </button>
                  ))}
                </div>

                {/* Oral vs Written Toggle */}
                <div className="exam-part-tabs">
                  <button
                    className={`exam-part-btn ${sampleExamPart === 'oral' ? 'active' : ''}`}
                    onClick={() => setSampleExamPart('oral')}
                  >
                    🗣️ Part 1: Oral Exam (मौखिक परीक्षा)
                  </button>
                  <button
                    className={`exam-part-btn ${sampleExamPart === 'written' ? 'active' : ''}`}
                    onClick={() => setSampleExamPart('written')}
                  >
                    ✍️ Part 2: Written Exam (लिखित परीक्षा)
                  </button>
                </div>

                {/* Class 201 Content */}
                {sampleExamClass === 'Class 201' ? (
                  sampleExamPart === 'oral' ? (
                    <div className="model-paper-card">
                      <div className="model-paper-header">
                        <h3>Hindi 201 Model Paper — Oral Exam (मौखिक परीक्षा)</h3>
                        <span className="total-marks-badge">Total Marks (कुल संख्या): 30</span>
                      </div>

                      {/* Marks Distribution Overview Table */}
                      <div className="table-responsive" style={{ marginBottom: '22px' }}>
                        <table className="exam-rubric-table">
                          <thead>
                            <tr>
                              <th>पढ़ना (Reading)</th>
                              <th>सुनना (Listening)</th>
                              <th>बोलना (Speaking)</th>
                              <th>प्रस्तुति (Presentation)</th>
                              <th>Total (कुल संख्या)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Real-life materials / books / unseen materials</td>
                              <td>Follow the instructions (Teacher &amp; Student)</td>
                              <td>Interpersonal Activity (Student to Student)</td>
                              <td>Memorized Prarthana / poems &amp; presentation</td>
                              <td><strong>30</strong></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Section 1: Reading */}
                      <div className="exam-section-block reading-sec">
                        <div className="exam-sec-header">
                          <h4>1. पढ़ना (Reading) — Time Limit: 2 Minutes</h4>
                          <span className="sec-points">5 Marks</span>
                        </div>
                        <p className="sec-instruction">Read the passage and dialogue below clearly:</p>

                        <div className="hindi-passage-box">
                          <p>
                            आज रविवार है। मैं तैरने जाऊँगा। मेरे घर के सामने सड़क है। मैं किताब पढूँगा। आपके पास कैसी किताब है। आपका घर कैसा है? यह मेज़ कैसी है? ये कितने पैसे हैं। आजकल गैस बहुत मँहगी है। आपका कमरा मेरे जैसा है। शरद की साइकिल मेरी साइकिल जैसी है। लड़के मैदान में खेल रहे हैं। यह कागज़ कैसा है? यह कलम कैसा है। यह मेरा फ़ैसला है। जैन मुनि कठिन उपवास करते हैं। बैसाखी के दिन लोग खुश होकर नाचते हैं।
                          </p>
                        </div>

                        <div className="hindi-dialogue-box">
                          <p><strong>नीरजः</strong> मैं विद्यालय / पाठशाला / स्कूल जा रहा हूँ। आज डिब्बे में क्या दिया है?</p>
                          <p><strong>माँः</strong> आज मैं ने सैंडविच और कुछ लड्डू दिये हैं। बेटा समय से वापस आ जाना।</p>
                          <p><strong>नीरजः</strong> हाँ माता जी! स्कूल ख़त्म होते ही सीधा घर आऊँगा।</p>
                        </div>
                      </div>

                      {/* Section 2: Listening */}
                      <div className="exam-section-block listening-sec">
                        <div className="exam-sec-header">
                          <h4>2. सुनना (Listening)</h4>
                        </div>
                        <p className="sec-instruction">
                          <strong>Objective:</strong> Students need to comprehend and show that they have understood the language and can reproduce the language through action or through speech.
                        </p>
                        <p className="sec-sub-label">Sample Teacher Prompts / Instructions:</p>
                        <ul className="exam-prompts-list">
                          <li>नोट बुक में घर और मेज़ शब्द को लिखिए |</li>
                          <li>कुर्सी से उठिये और अपने कमरे से बाहर जाइए |</li>
                          <li>आप जहाँ बैठे हैं, उस कमरे का दरवाज़ा बंद कीजिये |</li>
                          <li>मेरे white बोर्ड पर एक घर, दो पेड़ों के ऊपर चार आम के फल बनाइये |</li>
                          <li>भारत के बारे में दो वाक्य बताइये |</li>
                          <li>उस घड़ी के अन्दर क्या है ?</li>
                          <li>आज का मौसम सुबह में कैसा था और दोपहर में कैसा है ?</li>
                          <li>इस समय कितना बज रहा है ? या क्या समय हो रहा है?</li>
                          <li>तीस तक गिनती बोलिए |</li>
                        </ul>
                      </div>

                      {/* Section 3: Interpersonal Speaking */}
                      <div className="exam-section-block speaking-sec">
                        <div className="exam-sec-header">
                          <h4>3. बोलना — Interpersonal Speaking</h4>
                        </div>
                        <p className="sec-instruction">
                          <strong>Objective:</strong> Unrehearsed language — क्लास में सीखी शब्दावली और भाषा के आधार पर बच्चे बातचीत कर पाएँ। Teacher will give the situation and students will talk to each other.
                        </p>
                        <ol className="exam-situations-list">
                          <li>You are in a party and you are talking about food.</li>
                          <li>You are in a party and talk to someone about your family and your pet.</li>
                          <li>
                            In your school, you know about Janmashtami, Diwali, Ganesh Puja...
                            <br />• Ganesh Puja के बारे में दो वाक्य बोलिए |
                            <br />• Diwali के बारे में दो वाक्य बताइये |
                          </li>
                          <li>Tell 3 sentences about yourself OR about your favourite animal.</li>
                        </ol>
                      </div>

                      {/* Section 4: Presentation */}
                      <div className="exam-section-block presentation-sec">
                        <div className="exam-sec-header">
                          <h4>4. प्रस्तुति (Presentation) — Memorized Materials</h4>
                        </div>
                        <p className="sec-instruction">
                          <strong>Objective:</strong> Recite Balvihar prayers. Teacher will check <strong>उच्चारण</strong> (pronunciation), <strong>याददाश्त</strong> (memory), <strong>भाव-गति</strong> (pace), और <strong>उचित शारीरिक मुद्रा</strong> (posture).
                        </p>
                        <div className="presentation-details-box">
                          <p><strong>Prayers (Teacher's Pick):</strong> Ganesh Vandana, Saraswati Vandana, Gayatri Mantra, Guru Vandana, <em>Ish hame deta hai sab kuch...</em></p>
                          <p style={{ marginTop: '8px' }}><strong>Requirement:</strong> हर बच्चे को कम से कम ४ प्रार्थना बोलनी है (Each child must recite at least 4 prayers).</p>
                          <div className="compulsory-prayer-alert">
                            ⚠️ <strong>Note:</strong> <em>"Ish hame deta hai sab kuch..." (ईश हमें देता है सबकुछ...)</em> is <strong>compulsory</strong>.
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="model-paper-card empty-exam-state">
                      <h3>Hindi 201 Model Paper — Written Exam (लिखित परीक्षा)</h3>
                      <p>The Class 201 Written Exam sample paper has not been uploaded yet. Please check back closer to the exam date.</p>
                    </div>
                  )
                ) : (
                  <div className="model-paper-card empty-exam-state">
                    <h3>{sampleExamClass} — {sampleExamPart === 'oral' ? 'Oral Exam (मौखिक परीक्षा)' : 'Written Exam (लिखित परीक्षा)'}</h3>
                    <p>Sample exam materials for {sampleExamClass} will be posted here soon.</p>
                  </div>
                )}
              </div>
            ) : activeTab === 'Resources' && selectedSubItem === 'Prayers' ? (
              /* 2. BALVIHAR PRAYERS SECTION */
              <div className="prayers-container">
                <div className="prayers-header-card">
                  <div className="vhpa-badge">Accredited by Georgia Accrediting Commission | VHPA</div>
                  <h3 className="prayers-main-title">बालविहार प्रार्थना पुस्तिका (Balvihar Assembly Prayers)</h3>
                  <p className="prayers-subtitle">
                    Complete compilation of invocations, mantras, Geet, Vande Mataram, and National Anthems as recited at Balvihar Hindi School Atlanta.
                  </p>
                </div>

                {/* 1. Chant 3 Times AUM */}
                <div className="prayer-card accent-om">
                  <div className="prayer-badge">1. आरंभिक ओंकार जाप (Opening Mantra)</div>
                  <h3 className="prayer-title">ॐ (Aum)</h3>
                  <div className="prayer-verse centered-verse">
                    ॐ ॐ ॐ
                  </div>
                  <div className="prayer-meaning">
                    <strong>Instructions:</strong> Please chant ॐ (Aum) 3 times with reverence and calm focus.
                  </div>
                </div>

                {/* 2. Ganesh Vandana */}
                <div className="prayer-card">
                  <div className="prayer-badge">2. गणेश वन्दना (Prayer to Ganesh)</div>
                  <h3 className="prayer-title">वक्रतुण्ड महाकाय (Vakra Tunda Mahakaya)</h3>
                  <div className="prayer-verse">
                    वक्र तुंड महाकाय, सूर्यकोटि समप्रभ |<br />
                    निर्विघ्नं कुरुमे देव, सर्व कार्येषु सर्वदा ||
                  </div>
                  <div className="prayer-transliteration">
                    Vakra-tunda mahākāya soorya koti sama prabha;<br />
                    Nir-vighnam kuru me deva sarva kāryeshu sarvadā.
                  </div>
                  <div className="prayer-meaning">
                    <strong>Meaning:</strong> I pray Lord Ganesha with big-body and curved trunk, whose glory equals that of million suns, let all my undertakings be always successful without any obstacles.
                  </div>
                </div>

                {/* 3. Guru Vandana */}
                <div className="prayer-card">
                  <div className="prayer-badge">3. गुरु प्रार्थना (Prayer to Teacher)</div>
                  <h3 className="prayer-title">गुरुर्ब्रह्मा गुरुर्विष्णुः (Gurur Brahma)</h3>
                  <div className="prayer-verse">
                    गुरुर ब्रम्हा गुरुर्विष्णुः, गुरुर्देवो महेश्वरः |<br />
                    गुरुः साक्षात् परब्रम्ह, तस्मै श्री गुरवे नमः ||
                  </div>
                  <div className="prayer-transliteration">
                    Gurur Brahmaa Gurur Vishnu, Gurur Devo Maheshvarah;<br />
                    Gurur Sakshaat Parabrahma, Tasmai Shri Gurave Namah.
                  </div>
                  <div className="prayer-meaning">
                    <strong>Meaning:</strong> The Guru is Brahma (the creator within Hindu Trinity); the Guru is Vishnu (the preserver); the Guru is Shiva (the final dissolver of the universe); the Guru alone is the Supreme Brahman, The Absolute. To Him, the great Guru, I offer my salutation.
                  </div>
                </div>

                {/* 4. Ishwar Prarthana */}
                <div className="prayer-card">
                  <div className="prayer-badge">4. ईश्वर प्रार्थना (Prayer to God)</div>
                  <h3 className="prayer-title">त्वमेव माता च पिता त्वमेव (Twameva Mata)</h3>
                  <div className="prayer-verse">
                    त्वमेव माता च पिता त्वमेव, त्वमेव बंधुश्च सखा त्वमेव |<br />
                    त्वमेव विद्या द्रविणं त्वमेव, त्वमेव सर्व मम देव देव ||
                  </div>
                  <div className="prayer-transliteration">
                    Twameva mātāsh-cha pitā twameva, twmeva bandhush-cha sakhā twameva<br />
                    twameva vidyā dravinam twameva, twameva sarvam mam deva deva.
                  </div>
                  <div className="prayer-meaning">
                    <strong>Meaning:</strong> You are the father, you are the mother, you are the relative and you are the friend. You are one who gives all the knowledge. For me you are everything, supreme divinity - giver of everything that sustains and illuminates life.
                  </div>
                </div>

                {/* 5. Saraswati Prarthana */}
                <div className="prayer-card">
                  <div className="prayer-badge">5. सरस्वती प्रार्थना (Prayer to Saraswati)</div>
                  <h3 className="prayer-title">सरस्वती नमस्तुभ्यं (Saraswati Namastubhyam)</h3>
                  <div className="prayer-verse">
                    सरस्वती नमस्तुभ्यं, वरदे कामरूपिणीं ।<br />
                    विद्या रम्भं करिष्यामि, सिद्धिर्भवतु मे सदा ॥
                  </div>
                  <div className="prayer-transliteration">
                    Saraswati Namastubhayam Varde Kaamroopini,<br />
                    Vidhyaaarambham Karishyaami Sidhirbhavatu May Sadaa
                  </div>
                  <div className="prayer-meaning">
                    <strong>Meaning:</strong> Oh! Goddess Saraswati, my humble prostrations unto thee, who is the fulfiller of all wishes. I start my studies with thy worship and always pray for success.
                  </div>
                </div>

                {/* 6. Gayatri Mantra */}
                <div className="prayer-card">
                  <div className="prayer-badge">6. गायत्री मन्त्र (Gayatri Mantra)</div>
                  <h3 className="prayer-title">ॐ भूर्भुवः स्वः (Om Bhur Bhuvah Svah)</h3>
                  <div className="prayer-verse">
                    ॐ भूर्भुवः स्वः तत् सवितुर्वरेण्यं |<br />
                    भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ||
                  </div>
                  <div className="prayer-transliteration">
                    Om bhūr bhuvaḥ svaḥ, tat savitur varenyam |<br />
                    bhargo devasya dhīmahi dhiyo, yo naḥ prachodayat ||
                  </div>
                  <div className="prayer-meaning">
                    <strong>Meaning:</strong> O God, Thou art the giver of life, the remover of pain and sorrow, the bestower of happiness; O Creator of the Universe, may we receive Thy supreme, sin destroying light; may Thou guide our intellect in the right direction.
                  </div>
                </div>

                {/* 7. Shanti Paath */}
                <div className="prayer-card">
                  <div className="prayer-badge">7. शान्ति पाठ (Peace Prayer)</div>
                  <h3 className="prayer-title">ॐ सहनाववतु (Om Sahana Vavatu)</h3>
                  <div className="prayer-verse">
                    ॐ सहनाववतु, सह नौ भुनक्तु, सहवीर्यंकरवावहै |<br />
                    तेजस्विनावधीतमस्तु, मा विद्विषावहै ||<br />
                    || ॐ शान्तिः शान्तिः शान्तिः ||
                  </div>
                  <div className="prayer-transliteration">
                    Om Saha Naav-Avatu, Saha Nau Bhunaktu, Saha Veeryam Karavaavahai |<br />
                    Tejasvi Naav-Adheetam-Astu, Maa Vidvishaavahai ||<br />
                    || Om Shaantih Shaantih Shaantih ||
                  </div>
                  <div className="prayer-meaning">
                    <strong>Meaning:</strong> May the Divine protect us both (teacher and student). May we be nourished together. May we work together with great energy. May our study be brilliant and effective. May there be no animosity or misunderstanding between us. Om Peace, Peace, Peace.
                  </div>
                </div>

                {/* Vande Mataram */}
                <div className="prayer-card">
                  <div className="prayer-badge">राष्ट्रिय गीत (National Song)</div>
                  <h3 className="prayer-title">वन्दे मातरम् (Vande Maataram)</h3>
                  <div className="prayer-verse">
                    वन्दे मातरम् सुजलां सुफलां मलयजशीतलाम्<br />
                    सस्य श्यामलां मातरम् |<br />
                    शुभ्र ज्योत्स्ना पुलकित यामिनीम्<br />
                    फुल्ल कुसुमित द्रुमदलशोभिनीम्,<br />
                    सुहासिनीं सुमधुर भाषिणीम्<br />
                    सुखदां वरदां मातरम् ||
                  </div>
                  <div className="prayer-transliteration">
                    Vande maataraM sujalaaM suphalaaM malayaja shiitalaaM<br />
                    SasyashyaamalaaM maataram ||<br />
                    Shubhrajyotsnaa pulakitayaaminiiM<br />
                    pullakusumita drumadala shobhiniiM<br />
                    suhaasiniiM sumadhura bhaashhiNiiM<br />
                    sukhadaaM varadaaM maataraM ||
                  </div>
                  <div className="prayer-meaning">
                    <strong>Translation by Sri Aurobindo:</strong><br />
                    Mother, I bow to thee! Rich with thy hurrying streams, bright with orchard gleams, Cool with thy winds of delight, Dark fields waving Mother of might, Mother free. Glory of moonlight dreams, Over thy branches and lordly streams, Clad in thy blossoming trees, Mother, giver of ease, Laughing low and sweet! Mother I kiss thy feet, Speaker sweet and low! Mother, to thee I bow.
                  </div>
                </div>

                {/* Balvihar Geet */}
                <div className="prayer-card">
                  <div className="prayer-badge">बालविहार गीत (Balvihar Song)</div>
                  <h3 className="prayer-title">ईश हमें देता है सबकुछ (Eesh Hame Deta Hai Sabkuch)</h3>
                  <div className="prayer-verse">
                    ईश हमें देता है सबकुछ हम भी तो कुछ देना सीखें<br /><br />
                    सूरज हमें रोशनी देता हवा नया जीवन देती है,<br />
                    भूख मिटाने को हम सब की धरती पर होती खेती है<br />
                    औरों का भी हित हो जिसमे हम ऐसा कुछ करना सीखें ॥१॥<br /><br />
                    गरमी की तपती दुपहर में, पेड़ सदा देते हैं छाया,<br />
                    सुमन सुगन्ध सदा देते हैं, हम सबको फूलों की माला<br />
                    त्यागी तरुओं के जीवन से, हम परहित कुछ करना सीखें ॥२॥<br /><br />
                    जो अनपढ़ हैं उन्हें पढ़ायें, जो चुप हैं उनको वाणी दें,<br />
                    पिछड़ गये जो उन्हें बढ़ायें, समरसता का भाव जगा दें<br />
                    हम मेहनत के दीप जलाकर, नया उजाला करना सीखें ॥३॥<br /><br />
                    ईश हमें देता है सबकुछ हम भी तो कुछ देना सीखें
                  </div>
                  <div className="prayer-transliteration">
                    iiśa hame detā hai sabakucha hama bhī to kucha denā sīkheN<br />
                    sūraja hame rośanī detā havā nayā jīvana detī hai<br />
                    bhūkha miṭāne ko hama saba kī dharatī para hotī khetī hai<br />
                    auroṁkā bhī hita ho jisame hama aisā kucha karanā sīkhe ||1||<br />
                    garamī kī tapatī dupahara me peda sadā dete hai chāyā<br />
                    sumana sugandha sadā dete hai hama sabako phūloṁkī mālā<br />
                    tyāgī taruoṁke jīvana se hama parahita kucha karanā sīkhe ||2||<br />
                    jo anapadha hai unhe padhāye jo cupa hai unako vāṇī de<br />
                    pichada gaye jo unhe badhāye samarasatā kā bhāva jagā de<br />
                    hama mehanata ke dīpa jalākara nayā ujālā karanā sīkhe ||3||
                  </div>
                  <div className="prayer-meaning">
                    <strong>Meaning:</strong><br />
                    Ishwar gives us everything; let us also learn to give something.<br />
                    Sun gives us light, wind gives us new life, to extinguish our hunger, the earth gives us bountiful harvest. Let us learn from them and perform actions that will benefit others.<br />
                    In the parched heat of the afternoon, the trees always give us shade. The fragrant flowers always give us sweet smelling garlands of flowers. Let us learn from the life of the ever-sacrificing trees, to work towards the welfare of everyone.<br />
                    Let us teach the UN-lettered, let us give our voice to the silent. Let us encourage those who are left behind to come forward. Let us cultivate the feeling of equality in everyone. Let us light the lamp of hard work, and create a new light of awareness.<br />
                    Ishwar gives us everything; let us also learn to give to others.
                  </div>
                </div>

                {/* American National Anthem */}
                <div className="prayer-card national-anthem-us">
                  <div className="prayer-badge">United States National Anthem</div>
                  <h3 className="prayer-title">The Star-Spangled Banner</h3>
                  <div className="prayer-verse anthem-english">
                    O! say can you see by the dawn's early light,<br />
                    What so proudly we hailed at the twilight's last gleaming?<br />
                    Whose broad stripes and bright stars through the perilous fight,<br />
                    O'er the ramparts we watched were so gallantly streaming.<br />
                    And the rockets' red glare, the bombs bursting in air,<br />
                    Gave proof through the night that our flag was still there.<br />
                    O! say does that star-spangled banner yet wave,<br />
                    O'er the land of the free and the home of the brave?
                  </div>
                </div>

                {/* Indian National Anthem */}
                <div className="prayer-card national-anthem-india">
                  <div className="prayer-badge">भारतीय राष्ट्रगान (Indian National Anthem)</div>
                  <h3 className="prayer-title">जन गण मन (Jana Gana Mana)</h3>
                  <div className="prayer-verse">
                    जन गण मन अधिनायक जय हे<br />
                    भारत भाग्य विधाता<br />
                    पंजाब सिंध गुजरात मराठा<br />
                    द्राविड़ उत्कल वंग<br />
                    विंध्य हिमाचल यमुना गंगा<br />
                    उच्छल जलधि तरंग<br />
                    तव शुभ नामे जागे<br />
                    तव शुभ आशिष मागे<br />
                    गाहे तव जयगाथा<br />
                    जन गण मंगल दायक जय हे<br />
                    भारत भाग्य विधाता<br />
                    जय हे, जय हे, जय हे<br />
                    जय जय जय जय हे !
                  </div>
                  <div className="prayer-transliteration">
                    Jana gaņa mana adhināyaka jaya he, Bhārata bhāgya vidhātā<br />
                    Punjāba Sindha Gujarāta Marāṭhā, Drāvida Utkala Vanga<br />
                    Vindhya Himācala Yamunā Gangā, Ucchala jaladhi taranga<br />
                    Tava śubha nāme jāge, Tava śubha āśişa māge, Gāhe tava jaya gāthā<br />
                    Jana gaņa mangala dāyaka jaya he, Bhārata bhāgya vidhātā<br />
                    Jaya he jaya he jaya he, Jaya jaya jaya jaya he!
                  </div>
                </div>

                {/* Closing Prayer */}
                <div className="prayer-card accent-closing">
                  <div className="prayer-badge">सत्रांत प्रार्थना (Closing Prayer)</div>
                  <h3 className="prayer-title">ॐ पूर्णमदः पूर्णमिदम् (Om Poornamadah Poornamidam)</h3>
                  <div className="prayer-verse">
                    ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते ।<br />
                    पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥<br />
                    ॐ शान्तिः शान्तिः शान्तिः ॥
                  </div>
                  <div className="prayer-transliteration">
                    Om Puurnnam-Adah Puurnnam-Idam Puurnnaat-Puurnnam-Udacyate |<br />
                    Puurnnasya Puurnnam-Aadaaya Puurnnam-Eva-Avashissyate ||<br />
                    Om Shaantih Shaantih Shaantih ||
                  </div>
                  <div className="prayer-meaning">
                    <strong>Meaning:</strong><br />
                    Om, That (Outer World) is Purna (Full with Divine Consciousness); This (Inner World) is also Purna (Full with Divine Consciousness); From Purna is manifested Purna (From the Fullness of Divine Consciousness the World is manifested). Taking Purna from Purna, Purna indeed remains (Because Divine Consciousness is Non-Dual and Infinite).<br />
                    Om, Peace, Peace, Peace.
                  </div>
                </div>
              </div>
            ) : activeTab === 'Resources' && selectedSubItem === 'Spelling Bee' ? (
              /* 3. SPELLING BEE STUDY PORTAL */
              <div className="spellingbee-container">
                <div className="spellingbee-header-card">
                  <div className="vhpa-motto">“सा विद्या या विमुक्तये” — Knowledge is that which liberates</div>
                  <p>
                    Official guidelines, विभक्ति (Vibhakti) breakdown rules, अनुस्वार (Anuswaar) grammar standards, and Class 103 practice vocabulary accredited by the Georgia Accrediting Commission.
                  </p>
                </div>

                {/* Sub-document Navigation Tabs */}
                <div className="doc-tabs-row">
                  <button
                    className={`doc-tab-btn ${spellingBeeDocTab === 'steps' ? 'active' : ''}`}
                    onClick={() => setSpellingBeeDocTab('steps')}
                  >
                    📋 Guidelines &amp; Steps (नियम एवं प्रक्रिया)
                  </button>
                  <button
                    className={`doc-tab-btn ${spellingBeeDocTab === 'vibhakti' ? 'active' : ''}`}
                    onClick={() => setSpellingBeeDocTab('vibhakti')}
                  >
                    🔤 Vibhakti Rules (विभक्ति नियम)
                  </button>
                  <button
                    className={`doc-tab-btn ${spellingBeeDocTab === 'anuswaar' ? 'active' : ''}`}
                    onClick={() => setSpellingBeeDocTab('anuswaar')}
                  >
                    ✨ Anuswaar &amp; Sanyam (अनुस्वार एवं संयम नियम)
                  </button>
                  <button
                    className={`doc-tab-btn ${spellingBeeDocTab === 'words103' ? 'active' : ''}`}
                    onClick={() => setSpellingBeeDocTab('words103')}
                  >
                    📖 Class 103 Practice List (कक्षा १०३ शब्द सूची)
                  </button>
                </div>

                {/* Tab 1: Guidelines */}
                {spellingBeeDocTab === 'steps' && (
                  <div className="doc-content-pane">
                    <h3 className="pane-title">Steps of Spelling Bee &amp; Important Rules</h3>
                    <div className="rule-step-box">
                      <h4>Round Procedures &amp; Time Limit</h4>
                      <ol className="styled-procedure-list">
                        <li>Students will come up to the board.</li>
                        <li>Teachers will pronounce the word <strong>only once</strong>.</li>
                        <li>Students have the choice to ask the teacher to repeat the word. If they ask, the teacher will repeat it (<strong>maximum 2 times</strong>).</li>
                        <li>Students will write the word on the board.</li>
                        <li>Students will then write and read the <strong>विभक्ति (Vibhakti)</strong>.</li>
                        <li>Students pronounce the whole word correctly and state its <strong>meaning in English</strong>, which signals the end of their turn.</li>
                        <li>Students can correct their mistakes within the time limit.</li>
                        <li>The Volunteer keeps track of time (<strong>60 seconds limit</strong>).</li>
                      </ol>
                    </div>

                    <div className="rounds-summary-grid">
                      <div className="round-card">
                        <h5>1st Round</h5>
                        <p>Words from mandatory word list. Eliminated students sit in back and write words with विभक्ति on paper.</p>
                      </div>
                      <div className="round-card">
                        <h5>2nd Round</h5>
                        <p>Advancing qualifiers compete. Eliminated students continue practicing and writing words with विभक्ति on paper.</p>
                      </div>
                      <div className="round-card">
                        <h5>3rd Round &amp; Winners</h5>
                        <p>Final round. 1st &amp; 2nd place winners are officially announced by the teacher.</p>
                      </div>
                    </div>

                    <div className="important-callout">
                      <h4>⚠️ Important Rules to Remember</h4>
                      <ul>
                        <li>Students will be eliminated if they mispronounce, misspell, or fail to state the correct word at the end.</li>
                        <li>Please do not teach, explain, dictate, or break the word while pronouncing during the competition.</li>
                        <li>If a student makes a mistake due to teacher pronunciation (e.g. <code>छ</code> vs <code>क्ष</code>, <code>फ़</code> vs <code>फ</code>, or <code>स</code> vs <code>श</code>) and the dispute is unresolved, the student receives a new word.</li>
                        <li>If a dispute happens, do not eliminate the student; note the student's exact spelling on the tally sheet and allow them to continue until coordinator review.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Tab 2: Vibhakti Rules */}
                {spellingBeeDocTab === 'vibhakti' && (
                  <div className="doc-content-pane">
                    <h3 className="pane-title">Spelling Bee Vibhakti Rules for Study (विभक्ति विच्छेद नियम)</h3>
                    <div className="sample-vibhakti-table-wrap">
                      <table className="vibhakti-table">
                        <thead>
                          <tr>
                            <th>शब्द (Word)</th>
                            <th>विभक्ति विच्छेद (Breakdown)</th>
                            <th>शब्द श्रेणी (Category)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td><strong>कल</strong></td><td>क् + अ + ल् + अ</td><td>साधारण शब्द (Basic)</td></tr>
                          <tr><td><strong>लड़की</strong></td><td>ल् + अ + ड़् + अ + क् + ई</td><td>दीर्घ मात्रा (Vowel Ending)</td></tr>
                          <tr><td><strong>ऋषि</strong></td><td>ऋ + ष् + इ</td><td>ऋ वर्ण (Rishi)</td></tr>
                          <tr><td><strong>वृक्ष</strong></td><td>व् + ऋ + क् + ष् + अ</td><td>ऋ कार एवं संयुक्त वर्ण</td></tr>
                          <tr><td><strong>मैं</strong></td><td>म् + ऐं</td><td>अनुस्वार युक्त स्वर</td></tr>
                          <tr><td><strong>अच्छा</strong></td><td>अ + च् + छ् + आ</td><td>संयुक्त व्यंजन (Conjunct)</td></tr>
                          <tr><td><strong>छुट्टी</strong></td><td>छ् + उ + ट् + ट् + ई</td><td>द्वित्व व्यंजन (Double Consonant)</td></tr>
                          <tr><td><strong>गंगा</strong></td><td>ग् + अ + ङ् + ग् + आ</td><td>पंचमाक्षर (क वर्ग - ङ)</td></tr>
                          <tr><td><strong>अंगूर</strong></td><td>अ + ङ् + ग् + ऊ + र् + अ</td><td>पंचमाक्षर (क वर्ग - ङ)</td></tr>
                          <tr><td><strong>पंजाब</strong></td><td>प् + अ + ञ् + ज् + आ + ब् + अ</td><td>पंचमाक्षर (च वर्ग - ञ)</td></tr>
                          <tr><td><strong>पंडित</strong></td><td>प् + अ + ण् + ड् + इ + त् + अ</td><td>पंचमाक्षर (ट वर्ग - ण)</td></tr>
                          <tr><td><strong>चंदा</strong></td><td>च् + अ + न् + द् + आ</td><td>पंचमाक्षर (त वर्ग - न)</td></tr>
                          <tr><td><strong>सम्बन्ध</strong></td><td>स् + अ + म् + ब् + अ + न् + ध् + अ</td><td>पंचमाक्षर (प वर्ग - म, त वर्ग - न)</td></tr>
                          <tr><td><strong>कर्म</strong></td><td>क् + अ + र् + म् + अ</td><td>रेफ़ 'र्' (Reph)</td></tr>
                          <tr><td><strong>क्रम</strong></td><td>क् + र् + अ + म् + अ</td><td>पदेन '्र' (Paden)</td></tr>
                          <tr><td><strong>राष्ट्र</strong></td><td>र् + आ + ष् + ट् + र् + अ</td><td>पदेन '्र' (Trishul/Rashtra)</td></tr>
                          <tr><td><strong>संस्कार</strong></td><td>स् + अं + स् + क् + आ + र् + अ</td><td>अनुस्वार (य-ह वर्ग से पूर्व)</td></tr>
                          <tr><td><strong>कक्षा</strong></td><td>क् + अ + क् + ष् + आ</td><td>संयुक्त वर्ण (क्ष = क् + ष्)</td></tr>
                          <tr><td><strong>क्षत्रिय</strong></td><td>क् + ष् + अ + त् + र् + इ + य् + अ</td><td>संयुक्त वर्ण (क्ष, त्र)</td></tr>
                          <tr><td><strong>छात्र</strong></td><td>छ् + आ + त् + र् + अ</td><td>संयुक्त वर्ण (त्र = त् + र्)</td></tr>
                          <tr><td><strong>ज्ञान</strong></td><td>ज् + ञ् + आ + न् + अ</td><td>संयुक्त वर्ण (ज्ञ = ज् + ञ्)</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Tab 3: Anuswaar */}
                {spellingBeeDocTab === 'anuswaar' && (
                  <div className="doc-content-pane">
                    <h3 className="pane-title">अनुस्वार एवं संयम नियम (Spelling Bee Niyam for Anuswaar &amp; Sanyam)</h3>
                    <div className="concept-card">
                      <h4>1. य, र, ल, व, श, ष, स, ह से पूर्व अनुस्वार नियम</h4>
                      <p>
                        अनुस्वार के बाद यदि <strong>य, र, ल, व, श, ष, स, ह</strong> वर्ण आते हैं, तो अनुस्वार केवल बिंदु (•) के रूप में प्रयोग होता है।
                      </p>
                      <div className="example-tag-row">
                        <span><strong>स् + अं + य् + अ + म् + अ</strong> = संयम</span>
                        <span><strong>व् + अं + श् + अ</strong> = वंश</span>
                      </div>
                      <p style={{ marginTop: '8px' }}>
                        <em>शुद्ध रूप:</em> कंस, दंश, संयम, संवाद, संलग्न, संसर्ग, संहार, संरचना, संरक्षण।
                      </p>
                    </div>

                    <div className="concept-card">
                      <h4>2. पंचमाक्षर वर्ग नियम (क से प वर्ग)</h4>
                      <ul className="varga-list">
                        <li><strong>क वर्ग:</strong> गंगा ➔ गङ्गा</li>
                        <li><strong>च वर्ग:</strong> मंजूषा ➔ मञ्जूषा</li>
                        <li><strong>ट वर्ग:</strong> झंडा ➔ झण्डा</li>
                        <li><strong>त वर्ग:</strong> धंधा ➔ धन्धा</li>
                        <li><strong>प वर्ग:</strong> कंबल ➔ कम्बल</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Tab 4: Word Bank */}
                {spellingBeeDocTab === 'words103' && (
                  <div className="doc-content-pane">
                    <h3 className="pane-title">Class 103 Practice Word Bank (कक्षा १०३ अभ्यास शब्द)</h3>
                    <div className="word-bank-cloud">
                      {[
                        'आप (formal You)', 'हम (we)', 'यह (this)', 'वह (that)', 'सब (all)', 'कब (when)', 'कल (tomorrow/yesterday)',
                        'घर (home/house)', 'बहन (sister)', 'इधर (This side)', 'उधर (That side)', 'ऊपर (Up)', 'नीचे (down)', 'आज (today)', 'था (was)',
                        'इसका (His/her)', 'आपका (your)', 'इनका (their)', 'पढ़ (read)', 'चल (walk)', 'पकड़ (catch)', 'उठ (get up)',
                        'कर (do)', 'भर (fill)', 'चढ़ (climb)', 'समझ (understand)', 'कौन (who)', 'कैसी (how-f)', 'कैसा (how-m)',
                        'कैसे (how-p)', 'मीठा (sweet)', 'तीखा (spicy)', 'फीका (bland)', 'कड़वा (bitter)', 'भारी (heavy)', 'नया (new)',
                        'पुराना (old thing)', 'बुरा (bad)', 'बाहर (outside)', 'चिकना (smooth)', 'गहरा (deep)', 'साफ़ (clean)',
                        'बूढ़ा (old person)', 'बड़ा (big)', 'खाली (empty)', 'भरा (full)', 'हमेशा (always)', 'कितनी (how much-f)',
                        'कितना (how much-m)', 'कितने (how many)', 'और (and)', 'है (is)', 'हो (are)', 'मैं (I)', 'हूँ (am)', 'हैं (are)',
                        'थीं (were)', 'नहीं (no)', 'हाँ (yes)', 'कहाँ (where)', 'यहाँ (here)', 'वहाँ (there)', 'खाना (food/to eat)', 'खिड़की (window)',
                        'लेकिन (but)', 'या (or)', 'अगर (if)', 'फिर (again)', 'जब (when)', 'इसलिये (therefore)', 'तो (then)',
                        'पानी (water)', 'खेत (farm/field)', 'खेलना (to play)', 'खोलना (to open)', 'खोना (to lose)', 'गाय (cow)', 'गिलास (glass/tumbler)',
                        'गुरुवार (Thursday)', 'गोल (round/circle)', 'घोड़ा (horse)', 'चाबी (key)', 'चिड़िया (bird/sparrow)',
                        'पक्षी (bird)', 'पहाड़ (mountain)', 'चीता (cheetah/leopard)', 'छाया (shadow/shade)', 'छोटा (small)', 'जीभ (tongue)',
                        'जीतना (to win)', 'झरना (waterfall/stream)', 'झोला (bag/sack)', 'टमाटर (tomato)', 'तकिया (pillow)', 'तापमान (temperature)',
                        'तीसरी (third-f)', 'तुम (you-informal)', 'थाली (plate/platter)', 'दरवाजा (door)', 'दिन (day)', 'दिवाली (Diwali)',
                        'दुनिया (world)', 'दूध (milk)', 'देना (to give)', 'दौड़ना (to run)', 'धूप (sunlight)', 'आकाश (sky)',
                        'धरती (earth/land)', 'नदी (river)', 'नमकीन (salty/savory snack)', 'पीला (yellow)', 'पूरब (east)', 'पेड़ (tree)',
                        'पैदल (on foot/walking)', 'पैसा (money/coin)', 'फूल (flower)', 'फूलगोभी (cauliflower)', 'फ़ौरन (immediately)',
                        'बकरी (goat)', 'बदली (cloud/overcast)', 'बरसात (rain/rainy season)', 'बहुवचन (plural)', 'बाघ (tiger)', 'बिजली (electricity/lightning)',
                        'बुधवार (Wednesday)', 'बैल (bull/ox)', 'भाई (brother)', 'भारत (India)', 'भालू (bear)', 'भाषा (language)', 'भोजन (food/meal)',
                        'मछली (fish)', 'माता (mother)', 'महीना (month)', 'माथा (forehead)', 'मुझे (to me/me)', 'मेरा (my/mine-m)', 'मेरी (my/mine-f)',
                        'मैदान (ground/field)', 'मोटा (fat/thick)', 'मोर (peacock)', 'मौसम (weather/season)', 'रख (keep/put)',
                        'रखवाली (guarding)', 'रात (night)', 'रायता (raita)', 'रेखा (line)', 'पाठशाला (school)', 'लड़का (boy)', 'लड़के (boys)',
                        'लहसुन (garlic)', 'शनिवार (Saturday)', 'शाकाहारी (vegetarian)', 'शाम (evening)', 'शुरू (start/begin)', 'सफ़ेद (white)',
                        'सबसे (most/above all)', 'सुबह (morning)', 'सागर (ocean/sea)', 'साथ (together/with)', 'सात (seven)', 'साल (year)',
                        'साथी (companion/friend)', 'सीधी (straight/simple)', 'कृपया (please)', 'गृहकार्य (homework)', 'सूरज (sun)',
                        'सोमवार (Monday)', 'हवा (wind/air)', 'हरा (green)', 'हार (defeat/garland)', 'हाथ (hand)', 'हाथी (elephant)', 'हिरन (deer)'
                      ].map((item, idx) => (
                        <span key={idx} className="word-chip">{item}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : activeTab === 'Attendance' && selectedSubItem === 'Class 201' ? (
              /* 4. Attendance Table (Strictly ID-based by default) */
              <div className="attendance-view-container">
                <div className="attendance-header-meta">
                  <div>
                    <p className="attendance-subtitle">
                      Attendance Record for Class 201 (कक्षा २०१ उपस्थिति अभिलेख)
                    </p>
                    <small className="privacy-notice-text">
                      🔒 Personal information (names &amp; emails) is hidden behind Student IDs.
                    </small>
                  </div>

                  <div className="attendance-controls-group">
                    {canEditAttendance && (
                      <button
                        className="privacy-toggle-btn"
                        onClick={() => setShowStudentInfo(!showStudentInfo)}
                      >
                        {showStudentInfo ? '🙈 Hide Personal Info' : '👁️ Reveal Names & Emails (Staff)'}
                      </button>
                    )}

                    <div
                      className={`role-permission-tag ${
                        canEditAttendance ? 'perm-allowed' : 'perm-locked'
                      }`}
                    >
                      {canEditAttendance ? (
                        <span>✏️ Edit Access Granted ({resolvedRole})</span>
                      ) : (
                        <span>🔒 View-Only Mode (Teachers, TAs &amp; Admin only)</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="attendance-table">
                    <thead>
                      <tr>
                        <th className="student-col">
                          {canEditAttendance && showStudentInfo
                            ? 'Student ID & Info'
                            : 'Student ID (विद्यार्थी पहचान संख्या)'}
                        </th>
                        {attendanceDates.map((d) => (
                          <th key={d.date} className="date-col">
                            <div>{d.date}</div>
                            <small className="th-hindi">{d.hindiDate}</small>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {class201Roster.map((student) => (
                        <tr key={student.id}>
                          <td className="student-name-cell">
                            <div className="student-id-badge">{student.id}</div>
                            {canEditAttendance && showStudentInfo && (
                              <div className="staff-revealed-details">
                                <div className="staff-revealed-name">{student.name}</div>
                                <div className="student-email-sub">{student.email}</div>
                              </div>
                            )}
                          </td>
                          {attendanceDates.map((d) => {
                            const isPresent = !!attendanceRecords[student.id]?.[d.date];
                            return (
                              <td key={d.date} className="status-cell">
                                <label
                                  className={`checkbox-label-container ${
                                    !canEditAttendance ? 'disabled-cursor' : ''
                                  }`}
                                  title={
                                    canEditAttendance
                                      ? isPresent
                                        ? 'Mark Absent'
                                        : 'Mark Present'
                                      : 'Locked: View-only'
                                  }
                                >
                                  <input
                                    type="checkbox"
                                    className="attendance-checkbox"
                                    checked={isPresent}
                                    disabled={!canEditAttendance}
                                    onChange={() => handleCheckboxToggle(student.id, d.date)}
                                  />
                                </label>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeTab === 'Calendar' ? (
              /* 5. Calendar View */
              <div className="calendar-interactive-wrapper">
                <div className="calendar-legend-bar">
                  <div className="legend-tag legend-location">
                    <span className="dot dot-nhs"></span>
                    <strong>NHS</strong> = Norcross High School
                  </div>
                  <div className="legend-pills">
                    <span className="pill pill-in-person">● Regular (@NHS)</span>
                    <span className="pill pill-online">● Online (ऑनलाइन)</span>
                    <span className="pill pill-special">● Special Events / SAC</span>
                    <span className="pill pill-exam">● Oral / Exam</span>
                  </div>
                </div>

                <div className="calendar-nav-toolbar">
                  <button
                    className="month-btn-nav"
                    disabled={calendarMonthIndex === 0}
                    onClick={() => setCalendarMonthIndex((prev) => Math.max(0, prev - 1))}
                  >
                    ◀ Previous Month
                  </button>

                  <div className="current-month-heading">
                    <span className="eng-month-text">{currentMonthData.name}</span>
                    <span className="hin-month-text">({currentMonthData.hindiName})</span>
                  </div>

                  <button
                    className="month-btn-nav"
                    disabled={calendarMonthIndex === fullCalendarMonths.length - 1}
                    onClick={() =>
                      setCalendarMonthIndex((prev) =>
                        Math.min(fullCalendarMonths.length - 1, prev + 1)
                      )
                    }
                  >
                    Next Month ▶
                  </button>
                </div>

                <div className="month-quick-selector">
                  {fullCalendarMonths.map((m, idx) => (
                    <button
                      key={m.name}
                      className={`month-tab-chip ${calendarMonthIndex === idx ? 'active' : ''}`}
                      onClick={() => setCalendarMonthIndex(idx)}
                    >
                      {m.name.split(' ')[0]} '{m.year.toString().slice(-2)}
                    </button>
                  ))}
                </div>

                <div className="calendar-box-container">
                  <div className="calendar-weekdays-grid">{headers}</div>
                  <div className="calendar-days-grid">{boxes}</div>
                </div>
              </div>
            ) : activeTab === 'Class' && selectedSubItem === 'Class 201' ? (
              /* 6. Class 201 Date Tabs View */
              <div className="class-201-container">
                <div className="date-tabs-row">
                  {class201Dates.map((item) => (
                    <button
                      key={item.id}
                      className={`date-tab-button ${
                        selectedDateTab === item.label ? 'active' : ''
                      }`}
                      onClick={() => setSelectedDateTab(item.label)}
                    >
                      <span className="date-eng">{item.label}</span>
                      <span className="date-hin">({item.hindiLabel})</span>
                    </button>
                  ))}
                </div>

                <div className="date-active-panel">{activeDateData.content}</div>
              </div>
            ) : (
              /* 7. Default View */
              <div>
                <p className="welcome-instruction">
                  Welcome to the Balvihar Hindi School portal section (बालविहार हिंदी विद्यालय पोर्टल अनुभाग में आपका स्वागत है).
                </p>

                <div className="notice-card">
                  <h3>Recent Announcements (नवीनतम घोषणाएँ)</h3>
                  <ul>
                    <li>
                      Submit weekly Hindi Reading Logs before Saturday 5:00 PM (शनिवार शाम 5:00 बजे से पहले साप्ताहिक हिंदी पठन लॉग जमा करें).
                    </li>
                    <li>
                      Practice Vowel &amp; Consonant worksheets uploaded in Class section (कक्षा अनुभाग में अपलोड की गई स्वर और व्यंजन अभ्यास कार्यपत्रिका का अभ्यास करें).
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;