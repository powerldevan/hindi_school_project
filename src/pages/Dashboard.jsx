import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './Dashboard.css';
import balviharLogo from '../assets/balvihar-logo.png';
import vhpaLogo from '../assets/vhpa-logo.png';

function Dashboard({ role, username }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedSubItem, setSelectedSubItem] = useState('');
  const [selectedDateTab, setSelectedDateTab] = useState('August 23, 2026');

  // Month index for Interactive Full Calendar: 0 = August 2026 ... 9 = May 2027
  const [calendarMonthIndex, setCalendarMonthIndex] = useState(0);

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
    { title: 'Spelling Bee', hindi: 'वर्तनी प्रतियोगिता' },
    { title: 'Sample Exam', hindi: 'नमूना परीक्षा' },
  ];

  // Full calendar months with year, days count, starting weekday (0=Sun, 1=Mon...), and event map
  const fullCalendarMonths = [
    {
      name: 'August 2026',
      hindiName: 'अगस्त २०२६',
      year: 2026,
      monthNum: 7, // 0-indexed in JS (August = 7)
      totalDays: 31,
      startDay: 6, // Aug 1, 2026 is Saturday (6)
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
      monthNum: 8,
      totalDays: 30,
      startDay: 2, // Sep 1, 2026 is Tuesday (2)
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
      monthNum: 9,
      totalDays: 31,
      startDay: 4, // Oct 1, 2026 is Thursday (4)
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
      monthNum: 10,
      totalDays: 30,
      startDay: 0, // Nov 1, 2026 is Sunday (0)
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
      monthNum: 11,
      totalDays: 31,
      startDay: 2, // Dec 1, 2026 is Tuesday (2)
      events: {
        6: { title: 'Exam @NHS', type: 'exam' },
      },
    },
    {
      name: 'January 2027',
      hindiName: 'जनवरी २०२७',
      year: 2027,
      monthNum: 0,
      totalDays: 31,
      startDay: 5, // Jan 1, 2027 is Friday (5)
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
      monthNum: 1,
      totalDays: 28,
      startDay: 1, // Feb 1, 2027 is Monday (1)
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
      monthNum: 2,
      totalDays: 31,
      startDay: 1, // Mar 1, 2027 is Monday (1)
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
      monthNum: 3,
      totalDays: 30,
      startDay: 4, // Apr 1, 2027 is Thursday (4)
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
      monthNum: 4,
      totalDays: 31,
      startDay: 6, // May 1, 2027 is Saturday (6)
      events: {
        2: { title: 'Exam @NHS', type: 'exam' },
        9: { title: 'Gurudakshina-TBD', type: 'special' },
      },
    },
  ];

  // Attendance Records for Class 201
  const attendanceDates = [
    { date: '8/23/2026', hindiDate: '२३ अगस्त २०२६' },
    { date: '9/13/2026', hindiDate: '१३ सितंबर २०२६' },
    { date: '9/27/2026', hindiDate: '२७ सितंबर २०२६' },
    { date: '10/4/2026', hindiDate: '४ अक्टूबर २०२६' },
    { date: '10/18/2026', hindiDate: '१८ अक्टूबर २०२६' },
  ];

  const class201Students = [
    'Ashpal Sharma',
    'Krishna Singh',
    'Vani Gaur',
    'Prathmesh Agrawal',
    'Aarnik Rai',
    'Anaisha Kumar',
    'Avani Batchu',
    'Shaurya Baranwal',
    'Anaya Tiwari',
  ];

  const attendanceRecords = {
    'Ashpal Sharma': { '8/23/2026': true, '9/13/2026': true, '9/27/2026': true, '10/4/2026': null, '10/18/2026': true },
    'Krishna Singh': { '8/23/2026': true, '9/13/2026': true, '9/27/2026': true, '10/4/2026': null, '10/18/2026': true },
    'Vani Gaur': { '8/23/2026': true, '9/13/2026': true, '9/27/2026': true, '10/4/2026': null, '10/18/2026': true },
    'Prathmesh Agrawal': { '8/23/2026': true, '9/13/2026': true, '9/27/2026': true, '10/4/2026': null, '10/18/2026': true },
    'Aarnik Rai': { '8/23/2026': true, '9/13/2026': true, '9/27/2026': true, '10/4/2026': null, '10/18/2026': true },
    'Anaisha Kumar': { '8/23/2026': true, '9/13/2026': true, '9/27/2026': true, '10/4/2026': null, '10/18/2026': false },
    'Avani Batchu': { '8/23/2026': true, '9/13/2026': false, '9/27/2026': false, '10/4/2026': null, '10/18/2026': false },
    'Shaurya Baranwal': { '8/23/2026': true, '9/13/2026': true, '9/27/2026': true, '10/4/2026': null, '10/18/2026': true },
    'Anaya Tiwari': { '8/23/2026': true, '9/13/2026': true, '9/27/2026': true, '10/4/2026': null, '10/18/2026': true },
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
              <li>Pages 67, 69, 73 & 74</li>
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
              <li>Page 63 (Note: For Q3 & Q4 take reference from page 61 & 62).</li>
              <li>Page 60: Do again "Match Oblique" in your notebook.</li>
            </ol>
          </div>

          <div className="work-block special-block">
            <h4>📖 Book Report (in Hindi) for this Semester — Due Nov 15th</h4>
            <p><strong>Lesson 16:</strong> “हिमाद्रि तुंग शृंग से” (Page 112)</p>
            <p>Q2 & Q3 will be part of the book report. No need to learn the poem, just write & read 4 lines from your book report. Thanks!</p>
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
            <h4>Class Works (कक्षा कार्य)</h4>
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

  // Helper to build the 7x5 or 7x6 month grid of days
  const renderCalendarBoxes = () => {
    const boxes = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdaysHindi = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

    // 1. Render Weekday Header Boxes
    const headers = weekdays.map((day, idx) => (
      <div key={`header-${day}`} className="calendar-grid-header-box">
        <span className="cal-day-eng">{day}</span>
        <span className="cal-day-hin">({weekdaysHindi[idx]})</span>
      </div>
    ));

    // 2. Empty padding boxes before the 1st of the month
    for (let i = 0; i < currentMonthData.startDay; i++) {
      boxes.push(<div key={`pad-${i}`} className="calendar-day-box empty-day" />);
    }

    // 3. Numbered boxes for the actual days
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
              <span className="user-name">{username || 'devanshs905@gmail.com'}</span>
              <span className="user-role-badge">
                {role || 'Student'} ({role === 'Teacher' ? 'शिक्षक' : role === 'Parent' ? 'अभिभावक' : 'छात्र'})
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
          {/* Home */}
          <div
            className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('Home');
              setSelectedSubItem('');
            }}
          >
            <span>Home (मुख्य पृष्ठ)</span>
          </div>

          {/* Class Dropdown */}
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

          {/* Attendance Dropdown */}
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

          {/* Extracurriculars Dropdown */}
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

          {/* Calendar */}
          <div
            className={`nav-item ${activeTab === 'Calendar' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('Calendar');
              setSelectedSubItem('');
            }}
          >
            <span>Calendar (कैलेंडर)</span>
          </div>

          {/* Resources Dropdown */}
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

          {/* Contact */}
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
              : selectedSubItem || activeTab}
          </h2>

          <div className="tab-inner-content">
            {/* 1. FULL INTERACTIVE CALENDAR WITH DATE BOXES */}
            {activeTab === 'Calendar' ? (
              <div className="calendar-interactive-wrapper">
                {/* Top Location Legend & Info */}
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

                {/* Month Navigator Header */}
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
                    onClick={() => setCalendarMonthIndex((prev) => Math.min(fullCalendarMonths.length - 1, prev + 1))}
                  >
                    Next Month ▶
                  </button>
                </div>

                {/* Quick Month Jumper Tabs */}
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

                {/* Full 7-column Calendar Grid */}
                <div className="calendar-box-container">
                  <div className="calendar-weekdays-grid">
                    {headers}
                  </div>
                  <div className="calendar-days-grid">
                    {boxes}
                  </div>
                </div>
              </div>
            ) : activeTab === 'Attendance' && selectedSubItem === 'Class 201' ? (
              /* 2. Class 201 Attendance View */
              <div className="attendance-view-container">
                <p className="attendance-subtitle">
                  Attendance Record for Class 201 (कक्षा २०१ उपस्थिति अभिलेख)
                </p>

                <div className="table-responsive">
                  <table className="attendance-table">
                    <thead>
                      <tr>
                        <th className="student-col">Student's Name (विद्यार्थी का नाम)</th>
                        {attendanceDates.map((d) => (
                          <th key={d.date} className="date-col">
                            <div>{d.date}</div>
                            <small className="th-hindi">{d.hindiDate}</small>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {class201Students.map((student) => (
                        <tr key={student}>
                          <td className="student-name-cell">{student}</td>
                          {attendanceDates.map((d) => {
                            const val = attendanceRecords[student]?.[d.date];
                            return (
                              <td key={d.date} className="status-cell">
                                {val === true && (
                                  <span className="badge-present" title="Present">✓ Present (उपस्थित)</span>
                                )}
                                {val === false && (
                                  <span className="badge-absent" title="Absent">✕ Absent (अनुपस्थित)</span>
                                )}
                                {val === null && (
                                  <span className="badge-unrecorded" title="Not Recorded">—</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeTab === 'Class' && selectedSubItem === 'Class 201' ? (
              /* 3. Class 201 Date Tabs View */
              <div className="class-201-container">
                <div className="date-tabs-row">
                  {class201Dates.map((item) => (
                    <button
                      key={item.id}
                      className={`date-tab-button ${selectedDateTab === item.label ? 'active' : ''}`}
                      onClick={() => setSelectedDateTab(item.label)}
                    >
                      <span className="date-eng">{item.label}</span>
                      <span className="date-hin">({item.hindiLabel})</span>
                    </button>
                  ))}
                </div>

                <div className="date-active-panel">
                  {activeDateData.content}
                </div>
              </div>
            ) : (
              /* 4. Default Portal View */
              <div>
                <p className="welcome-instruction">
                  Welcome to the Balvihar Hindi School portal section (बालविहार हिंदी विद्यालय पोर्टल अनुभाग में आपका स्वागत है).
                </p>

                <div className="notice-card">
                  <h3>Recent Announcements (नवीनतम घोषणाएँ)</h3>
                  <ul>
                    <li>Submit weekly Hindi Reading Logs before Saturday 5:00 PM (शनिवार शाम 5:00 बजे से पहले साप्ताहिक हिंदी पठन लॉग जमा करें).</li>
                    <li>Practice Vowel & Consonant worksheets uploaded in Class section (कक्षा अनुभाग में अपलोड की गई स्वर और व्यंजन अभ्यास कार्यपत्रिका का अभ्यास करें).</li>
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