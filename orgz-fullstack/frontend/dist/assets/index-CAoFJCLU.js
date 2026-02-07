// Z.ORG - Organization Chart Management System
// Complete React Application with Full Screen Layout and No Blue Borders

// React and ReactDOM imports (for production build)
import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

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
function Navigation({ currentPage, setCurrentPage }) {
  return React.createElement('nav', { className: 'nav-menu' },
    React.createElement('div', { className: 'nav-header' },
      React.createElement('div', { className: 'logo' },
        React.createElement('h2', null, 'Z.ORG')
      ),
      React.createElement('div', { className: 'nav-items' },
        React.createElement('button', { 
          className: `nav-item ${currentPage === 'dashboard' ? 'active' : ''}`,
          onClick: () => setCurrentPage('dashboard')
        }, 'Dashboard'),
        React.createElement('button', { 
          className: `nav-item ${currentPage === 'orgchart' ? 'active' : ''}`,
          onClick: () => setCurrentPage('orgchart')
        }, 'Org Chart'),
        React.createElement('button', { 
          className: `nav-item ${currentPage === 'employees' ? 'active' : ''}`,
          onClick: () => setCurrentPage('employees')
        }, 'Employees'),
        React.createElement('button', { 
          className: `nav-item ${currentPage === 'payroll' ? 'active' : ''}`,
          onClick: () => setCurrentPage('payroll')
        }, 'Payroll')
      )
    )
  );
}

// Header Component
function Header({ searchTerm, setSearchTerm, onExportPDF }) {
  return React.createElement('header', { className: 'header' },
    React.createElement('div', { className: 'header-left' },
      React.createElement('h1', null, 'Z.ORG Management System')
    ),
    React.createElement('div', { className: 'header-right' },
      React.createElement('div', { className: 'search-container' },
        React.createElement('input', {
          type: 'text',
          placeholder: 'Search employees...',
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: 'search-input'
        })
      ),
      React.createElement('button', { onClick: onExportPDF, className: 'export-btn' },
        'Export PDF'
      )
    )
  );
}

// Dashboard Component
function Dashboard() {
  return React.createElement('div', { className: 'dashboard' },
    React.createElement('h2', null, 'Dashboard Overview'),
    React.createElement('div', { className: 'dashboard-stats' },
      React.createElement('div', { className: 'stat-card' },
        React.createElement('h3', null, 'Total Employees'),
        React.createElement('p', null, orgData.employees.length)
      ),
      React.createElement('div', { className: 'stat-card' },
        React.createElement('h3', null, 'Departments'),
        React.createElement('p', null, '4')
      ),
      React.createElement('div', { className: 'stat-card' },
        React.createElement('h3', null, 'Active Projects'),
        React.createElement('p', null, '12')
      )
    )
  );
}

// Org Chart Component
function OrgChart() {
  return React.createElement('div', { className: 'org-chart' },
    React.createElement('h2', null, 'Organization Chart'),
    React.createElement('div', { className: 'chart-container' },
      ...orgData.employees.map(emp =>
        React.createElement('div', { key: emp.id, className: 'org-node' },
          React.createElement('div', { className: 'emp-card' },
            React.createElement('img', { src: emp.avatar, alt: emp.name, className: 'emp-avatar' }),
            React.createElement('div', { className: 'emp-info' },
              React.createElement('h4', null, emp.name),
              React.createElement('p', null, emp.role),
              React.createElement('small', null, emp.department)
            )
          ),
          emp.subordinates && emp.subordinates.length > 0
            ? React.createElement('div', { className: 'subordinates' },
                ...emp.subordinates.map(sub =>
                  React.createElement('div', { key: sub.id, className: 'subordinate-node' },
                    React.createElement('div', { className: 'sub-card' },
                      React.createElement('img', { src: sub.avatar, alt: sub.name, className: 'sub-avatar' }),
                      React.createElement('div', { className: 'sub-info' },
                        React.createElement('h5', null, sub.name),
                        React.createElement('p', null, sub.role)
                      )
                    )
                  )
                )
              )
            : null
        )
      )
    )
  );
}

// Employees List Component
function EmployeesList({ searchTerm }) {
  const filteredEmployees = orgData.employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return React.createElement('div', { className: 'employees-list' },
    React.createElement('h2', null, 'Employees Directory'),
    React.createElement('div', { className: 'employees-grid' },
      ...filteredEmployees.map(emp =>
        React.createElement('div', { key: emp.id, className: 'employee-card' },
          React.createElement('img', { src: emp.avatar, alt: emp.name, className: 'emp-photo' }),
          React.createElement('div', { className: 'emp-details' },
            React.createElement('h4', null, emp.name),
            React.createElement('p', { className: 'emp-role' }, emp.role),
            React.createElement('p', { className: 'emp-dept' }, emp.department),
            React.createElement('p', { className: 'emp-email' }, emp.email),
            React.createElement('p', { className: 'emp-phone' }, emp.phone)
          )
        )
      )
    )
  );
}

// Payroll Component
function Payroll() {
  return React.createElement('div', { className: 'payroll' },
    React.createElement('h2', null, 'Payroll Management'),
    React.createElement('div', { className: 'payroll-table' },
      React.createElement('table', null,
        React.createElement('thead', null,
          React.createElement('tr', null,
            React.createElement('th', null, 'Employee'),
            React.createElement('th', null, 'Department'),
            React.createElement('th', null, 'Salary'),
            React.createElement('th', null, 'Status')
          )
        ),
        React.createElement('tbody', null,
          ...orgData.employees.map(emp =>
            React.createElement('tr', { key: emp.id },
              React.createElement('td', null, emp.name),
              React.createElement('td', null, emp.department),
              React.createElement('td', null, '$75,000'),
              React.createElement('td', { className: 'status-active' }, 'Active')
            )
          )
        )
      )
    )
  );
}

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = React.useState('dashboard');
  const [searchTerm, setSearchTerm] = React.useState('');

  const renderMainContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return React.createElement(Dashboard);
      case 'orgchart':
        return React.createElement(OrgChart);
      case 'employees':
        return React.createElement(EmployeesList, { searchTerm });
      case 'payroll':
        return React.createElement(Payroll);
      default:
        return React.createElement(Dashboard);
    }
  };

  return React.createElement('div', { className: 'app' },
    React.createElement(Navigation, { currentPage, setCurrentPage }),
    React.createElement('div', { className: 'content-area' },
      React.createElement(Header, { 
        searchTerm, 
        setSearchTerm, 
        onExportPDF: handleExportPDF 
      }),
      renderMainContent()
    )
  );
}

// Initialize the application
const container = document.getElementById('root');
const root = createRoot(container);
root.render(React.createElement(App));
