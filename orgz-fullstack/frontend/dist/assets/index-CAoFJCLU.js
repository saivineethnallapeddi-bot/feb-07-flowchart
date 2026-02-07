// Z.ORG - Organization Chart Management System
// Complete JavaScript Application with Full Screen Layout and No Blue Borders

// Organization Data
const orgData = {
  name: "Z.ORG",
  employees: [
    {
      id: 1,
      name: "Admin User",
      role: "Org Viewer",
      department: "Management",
      email: "admin@zorg.com",
      phone: "+1-234-567-8900",
      avatar: "https://picsum.photos/seed/admin/100/100",
      subordinates: [
        {
          id: 2,
          name: "John Doe",
          role: "Senior Developer",
          department: "Engineering",
          email: "john@zorg.com",
          phone: "+1-234-567-8901",
          avatar: "https://picsum.photos/seed/john/100/100"
        },
        {
          id: 3,
          name: "Jane Smith",
          role: "Project Manager",
          department: "Management",
          email: "jane@zorg.com",
          phone: "+1-234-567-8902",
          avatar: "https://picsum.photos/seed/jane/100/100"
        }
      ]
    },
    {
      id: 2,
      name: "John Doe",
      role: "Senior Developer",
      department: "Engineering",
      email: "john@zorg.com",
      phone: "+1-234-567-8901",
      avatar: "https://picsum.photos/seed/john/100/100",
      subordinates: [
        {
          id: 4,
          name: "Mike Johnson",
          role: "Developer",
          department: "Engineering",
          email: "mike@zorg.com",
          phone: "+1-234-567-8903",
          avatar: "https://picsum.photos/seed/mike/100/100"
        }
      ]
    }
  ]
};

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // PDF Export Function
  const handleExportPDF = () => {
    try {
      const content = generateHTMLContent();
      
      // Create download link for HTML backup
      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ZORG-${currentPage}-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Open print dialog for PDF
      const printWindow = window.open('', '_blank');
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
      
      alert('✅ PDF export initiated! HTML file downloaded and print dialog opened.');
    } catch (error) {
      alert('❌ Error generating PDF: ' + error.message);
      console.error('PDF Export Error:', error);
    }
  };

  // Generate HTML Content for Export
  const generateHTMLContent = () => {
    const pageContent = document.getElementById('root').innerHTML;
    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
        } catch (e) {
          return '';
        }
      })
      .join('\n');
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Z.ORG - ${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Export</title>
        <style>
          ${styles}
          body { font-family: 'Inter', sans-serif; padding: 20px; background: #ffffff; }
          .export-header { text-align: center; margin-bottom: 30px; }
          .export-content { max-width: 800px; margin: 0 auto; }
        </style>
      </head>
      <body>
        <div class="export-header">
          <h1>Z.ORG - ${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</h1>
          <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
        <div class="export-content">
          ${pageContent}
        </div>
      </body>
      </html>
    `;
  };

  // Filter employees based on search
  const filteredEmployees = orgData.employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigation Component
  const Navigation = () => (
    <nav className="nav-menu">
      <div className="nav-header">
        <div className="logo">
          <h2>Z.ORG</h2>
        </div>
        <div className="nav-items">
          <button 
            className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-item ${currentPage === 'orgchart' ? 'active' : ''}`}
            onClick={() => setCurrentPage('orgchart')}
          >
            Org Chart
          </button>
          <button 
            className={`nav-item ${currentPage === 'employees' ? 'active' : ''}`}
            onClick={() => setCurrentPage('employees')}
          >
            Employees
          </button>
          <button 
            className={`nav-item ${currentPage === 'payroll' ? 'active' : ''}`}
            onClick={() => setCurrentPage('payroll')}
          >
            Payroll
          </button>
        </div>
      </div>
    </nav>
  );

  // Header Component
  const Header = () => (
    <header className="header">
      <div className="header-left">
        <h1>Z.ORG Management System</h1>
      </div>
      <div className="header-right">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button onClick={handleExportPDF} className="export-btn">
          Export PDF
        </button>
      </div>
    </header>
  );

  // Dashboard Component
  const Dashboard = () => (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <p>{orgData.employees.length}</p>
        </div>
        <div className="stat-card">
          <h3>Departments</h3>
          <p>4</p>
        </div>
        <div className="stat-card">
          <h3>Active Projects</h3>
          <p>12</p>
        </div>
      </div>
    </div>
  );

  // Org Chart Component
  const OrgChart = () => (
    <div className="org-chart">
      <h2>Organization Chart</h2>
      <div className="chart-container">
        {orgData.employees.map(emp => (
          <div key={emp.id} className="org-node">
            <div className="emp-card">
              <img src={emp.avatar} alt={emp.name} className="emp-avatar" />
              <div className="emp-info">
                <h4>{emp.name}</h4>
                <p>{emp.role}</p>
                <small>{emp.department}</small>
              </div>
            </div>
            {emp.subordinates && emp.subordinates.length > 0 && (
              <div className="subordinates">
                {emp.subordinates.map(sub => (
                  <div key={sub.id} className="subordinate-node">
                    <div className="sub-card">
                      <img src={sub.avatar} alt={sub.name} className="sub-avatar" />
                      <div className="sub-info">
                        <h5>{sub.name}</h5>
                        <p>{sub.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Employees List Component
  const EmployeesList = () => (
    <div className="employees-list">
      <h2>Employees Directory</h2>
      <div className="employees-grid">
        {filteredEmployees.map(emp => (
          <div key={emp.id} className="employee-card" onClick={() => setSelectedEmployee(emp)}>
            <img src={emp.avatar} alt={emp.name} className="emp-photo" />
            <div className="emp-details">
              <h4>{emp.name}</h4>
              <p className="emp-role">{emp.role}</p>
              <p className="emp-dept">{emp.department}</p>
              <p className="emp-email">{emp.email}</p>
              <p className="emp-phone">{emp.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Payroll Component
  const Payroll = () => (
    <div className="payroll">
      <h2>Payroll Management</h2>
      <div className="payroll-table">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orgData.employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>$75,000</td>
                <td className="status-active">Active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Employee Profile Modal
  const EmployeeProfile = () => {
    if (!selectedEmployee) return null;

    return (
      <div className="profile-overlay" onClick={() => setSelectedEmployee(null)}>
        <div className="profile-panel" onClick={(e) => e.stopPropagation()}>
          <div className="profile-header">
            <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="profile-avatar" />
            <div className="profile-info">
              <h3>{selectedEmployee.name}</h3>
              <p>{selectedEmployee.role}</p>
              <p>{selectedEmployee.department}</p>
            </div>
            <button className="close-btn" onClick={() => setSelectedEmployee(null)}>×</button>
          </div>
          <div className="profile-details">
            <div className="detail-section">
              <h4>Contact Information</h4>
              <p><strong>Email:</strong> {selectedEmployee.email}</p>
              <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
            </div>
            <div className="detail-section">
              <h4>Employment Details</h4>
              <p><strong>Employee ID:</strong> {selectedEmployee.id}</p>
              <p><strong>Department:</strong> {selectedEmployee.department}</p>
              <p><strong>Role:</strong> {selectedEmployee.role}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main Content Area
  const MainContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'orgchart':
        return <OrgChart />;
      case 'employees':
        return <EmployeesList />;
      case 'payroll':
        return <Payroll />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Navigation />
      <div className="content-area">
        <Header />
        <MainContent />
      </div>
      <EmployeeProfile />
    </div>
  );
}

// Initialize the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
