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

  const handleItemClick = (parentTab, itemLabel) => {
    setActiveTab(parentTab);
    setSelectedSubItem(itemLabel);
  };

  return (
    <div className="portal-container">
      {/* Top Banner Header */}
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
                    handleItemClick('Attendance', `${lvl} Attendance`);
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
            {selectedSubItem || activeTab}
          </h2>

          <div className="tab-inner-content">
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
        </div>
      </main>
    </div>
  );
}

export default Dashboard;