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

// Application State
let currentPage = 'dashboard';
let selectedEmployee = null;
let searchTerm = '';

// PDF Export Function
function handleExportPDF() {
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
}

// Generate HTML Content for Export
function generateHTMLContent() {
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
}

// Navigation Component
function renderNavigation() {
  return `
    <nav class="nav-menu">
      <div class="nav-header">
        <div class="logo">
          <h2>Z.ORG</h2>
        </div>
        <div class="nav-items">
          <button class="nav-item ${currentPage === 'dashboard' ? 'active' : ''}" onclick="navigateTo('dashboard')">
            Dashboard
          </button>
          <button class="nav-item ${currentPage === 'orgchart' ? 'active' : ''}" onclick="navigateTo('orgchart')">
            Org Chart
          </button>
          <button class="nav-item ${currentPage === 'employees' ? 'active' : ''}" onclick="navigateTo('employees')">
            Employees
          </button>
          <button class="nav-item ${currentPage === 'payroll' ? 'active' : ''}" onclick="navigateTo('payroll')">
            Payroll
          </button>
        </div>
      </div>
    </nav>
  `;
}

// Header Component
function renderHeader() {
  return `
    <header class="header">
      <div class="header-left">
        <h1>Z.ORG Management System</h1>
      </div>
      <div class="header-right">
        <div class="search-container">
          <input type="text" placeholder="Search employees..." value="${searchTerm}" onchange="updateSearch(this.value)" class="search-input">
        </div>
        <button onclick="handleExportPDF()" class="export-btn">
          Export PDF
        </button>
      </div>
    </header>
  `;
}

// Dashboard Component
function renderDashboard() {
  return `
    <div class="dashboard">
      <h2>Dashboard Overview</h2>
      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Total Employees</h3>
          <p>${orgData.employees.length}</p>
        </div>
        <div class="stat-card">
          <h3>Departments</h3>
          <p>4</p>
        </div>
        <div class="stat-card">
          <h3>Active Projects</h3>
          <p>12</p>
        </div>
      </div>
    </div>
  `;
}

// Org Chart Component
function renderOrgChart() {
  return `
    <div class="org-chart">
      <h2>Organization Chart</h2>
      <div class="chart-container">
        ${orgData.employees.map(emp => `
          <div class="org-node">
            <div class="emp-card">
              <img src="${emp.avatar}" alt="${emp.name}" class="emp-avatar">
              <div class="emp-info">
                <h4>${emp.name}</h4>
                <p>${emp.role}</p>
                <small>${emp.department}</small>
              </div>
            </div>
            ${emp.subordinates && emp.subordinates.length > 0 ? `
              <div class="subordinates">
                ${emp.subordinates.map(sub => `
                  <div class="subordinate-node">
                    <div class="sub-card">
                      <img src="${sub.avatar}" alt="${sub.name}" class="sub-avatar">
                      <div class="sub-info">
                        <h5>${sub.name}</h5>
                        <p>${sub.role}</p>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Employees List Component
function renderEmployeesList() {
  const filteredEmployees = orgData.employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return `
    <div class="employees-list">
      <h2>Employees Directory</h2>
      <div class="employees-grid">
        ${filteredEmployees.map(emp => `
          <div class="employee-card" onclick="showEmployeeProfile(${emp.id})">
            <img src="${emp.avatar}" alt="${emp.name}" class="emp-photo">
            <div class="emp-details">
              <h4>${emp.name}</h4>
              <p class="emp-role">${emp.role}</p>
              <p class="emp-dept">${emp.department}</p>
              <p class="emp-email">${emp.email}</p>
              <p class="emp-phone">${emp.phone}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Payroll Component
function renderPayroll() {
  return `
    <div class="payroll">
      <h2>Payroll Management</h2>
      <div class="payroll-table">
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
            ${orgData.employees.map(emp => `
              <tr>
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td>$75,000</td>
                <td class="status-active">Active</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Employee Profile Modal
function renderEmployeeProfile() {
  if (!selectedEmployee) return '';
  
  return `
    <div class="profile-overlay" onclick="closeEmployeeProfile()">
      <div class="profile-panel" onclick="event.stopPropagation()">
        <div class="profile-header">
          <img src="${selectedEmployee.avatar}" alt="${selectedEmployee.name}" class="profile-avatar">
          <div class="profile-info">
            <h3>${selectedEmployee.name}</h3>
            <p>${selectedEmployee.role}</p>
            <p>${selectedEmployee.department}</p>
          </div>
          <button class="close-btn" onclick="closeEmployeeProfile()">×</button>
        </div>
        <div class="profile-details">
          <div class="detail-section">
            <h4>Contact Information</h4>
            <p><strong>Email:</strong> ${selectedEmployee.email}</p>
            <p><strong>Phone:</strong> ${selectedEmployee.phone}</p>
          </div>
          <div class="detail-section">
            <h4>Employment Details</h4>
            <p><strong>Employee ID:</strong> ${selectedEmployee.id}</p>
            <p><strong>Department:</strong> ${selectedEmployee.department}</p>
            <p><strong>Role:</strong> ${selectedEmployee.role}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Navigation Functions
function navigateTo(page) {
  currentPage = page;
  renderApp();
}

function updateSearch(value) {
  searchTerm = value;
  if (currentPage === 'employees') {
    renderApp();
  }
}

function showEmployeeProfile(employeeId) {
  selectedEmployee = orgData.employees.find(emp => emp.id === employeeId);
  renderApp();
}

function closeEmployeeProfile() {
  selectedEmployee = null;
  renderApp();
}

// Main Content Area
function renderMainContent() {
  switch (currentPage) {
    case 'dashboard':
      return renderDashboard();
    case 'orgchart':
      return renderOrgChart();
    case 'employees':
      return renderEmployeesList();
    case 'payroll':
      return renderPayroll();
    default:
      return renderDashboard();
  }
}

// Main App Render Function
function renderApp() {
  const app = document.getElementById('root');
  app.innerHTML = `
    <div class="app">
      ${renderNavigation()}
      <div class="content-area">
        ${renderHeader()}
        ${renderMainContent()}
      </div>
      ${renderEmployeeProfile()}
    </div>
  `;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  renderApp();
});
