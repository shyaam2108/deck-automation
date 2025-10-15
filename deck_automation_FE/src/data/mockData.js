export const managers = [
  'Carlo',
  'Jan Isaac',
  'Mary',
  'Jahir',
  'Julie'
]

export const teams = [
  'Mobile',
  'Web',
  'Build',
  'TechOps',
  'Testing'
]

export const mockExcelData = [
  {
    jira: 'SING-1234',
    date: '2024-01-15',
    description: 'Implement user authentication module',
    status: 'Completed',
    hours: 8,
    team: 'Web',
    manager: 'Mary',
    teamLead: 'Mary Clare Delos Reyes',
    sprint: 'Sprint #12',
    sprintStart: '2024-01-08',
    sprintEnd: '2024-01-22',
    section: 'BACK END'
  },
  {
    jira: 'SING-1235',
    date: '2024-01-16',
    description: 'Create dashboard UI components',
    status: 'In Progress',
    hours: 6,
    team: 'Web',
    manager: 'Mary',
    teamLead: 'Mary Clare Delos Reyes',
    sprint: 'Sprint #12',
    sprintStart: '2024-01-08',
    sprintEnd: '2024-01-22',
    section: 'FRONT END'
  },
  {
    jira: 'SING-1236',
    date: '2024-01-17',
    description: 'Setup CI/CD pipeline for deployment',
    status: 'Completed',
    hours: 10,
    team: 'TechOps',
    manager: 'Jahir',
    teamLead: 'Jahir Ahmed',
    sprint: 'Sprint #12',
    sprintStart: '2024-01-08',
    sprintEnd: '2024-01-22',
    section: 'DEVOPS'
  },
  {
    jira: 'SING-1237',
    date: '2024-01-18',
    description: 'Implement payment gateway integration',
    status: 'In Progress',
    hours: 12,
    team: 'Build',
    manager: 'Jan Isaac',
    teamLead: 'Jan Isaac Santos',
    sprint: 'Sprint #12',
    sprintStart: '2024-01-08',
    sprintEnd: '2024-01-22',
    section: 'BACK END'
  },
  {
    jira: 'SING-1238',
    date: '2024-01-19',
    description: 'Mobile app performance optimization',
    status: 'Testing',
    hours: 8,
    team: 'Mobile',
    manager: 'Carlo',
    teamLead: 'Carlo Martinez',
    sprint: 'Sprint #12',
    sprintStart: '2024-01-08',
    sprintEnd: '2024-01-22',
    section: 'MOBILE'
  },
  {
    jira: 'SING-1239',
    date: '2024-01-20',
    description: 'Write unit tests for API endpoints',
    status: 'Completed',
    hours: 7,
    team: 'Testing',
    manager: 'Julie',
    teamLead: 'Julie Anderson',
    sprint: 'Sprint #12',
    sprintStart: '2024-01-08',
    sprintEnd: '2024-01-22',
    section: 'TESTING'
  },
  {
    jira: 'SING-1240',
    date: '2024-01-21',
    description: 'Design system implementation',
    status: 'In Progress',
    hours: 9,
    team: 'Web',
    manager: 'Mary',
    teamLead: 'Mary Clare Delos Reyes',
    sprint: 'Sprint #12',
    sprintStart: '2024-01-08',
    sprintEnd: '2024-01-22',
    section: 'FRONT END'
  },
  {
    jira: 'SING-1241',
    date: '2024-01-22',
    description: 'Database schema optimization',
    status: 'Completed',
    hours: 11,
    team: 'Build',
    manager: 'Jan Isaac',
    teamLead: 'Jan Isaac Santos',
    sprint: 'Sprint #12',
    sprintStart: '2024-01-08',
    sprintEnd: '2024-01-22',
    section: 'BACK END'
  }
]

// Mock data with missing fields for validation testing
export const mockInvalidData = [
  {
    jira: 'SING-2001',
    date: '2024-01-15',
    description: '',  // Missing description
    status: 'Completed',
    hours: 8,
    team: 'Web',
    manager: 'Mary'
  },
  {
    jira: '',  // Missing JIRA
    date: '2024-01-16',
    description: 'Some work done',
    status: 'In Progress',
    hours: null,  // Missing hours
    team: 'Mobile',
    manager: 'Carlo'
  }
]

export const validateExcelData = (data) => {
  const errors = []
  const requiredFields = ['jira', 'date', 'description', 'status', 'hours', 'team', 'manager']

  data.forEach((row, index) => {
    const missingFields = []
    requiredFields.forEach(field => {
      if (!row[field] || row[field] === '' || row[field] === null) {
        missingFields.push(field)
      }
    })

    if (missingFields.length > 0) {
      errors.push({
        row: index + 1,
        fields: missingFields,
        data: row
      })
    }
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

