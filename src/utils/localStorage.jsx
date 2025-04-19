const employees = [
    {
      "id": 1,
      "firstName": "John",
      "email": "john@example.com",
      "password": "123",
      "taskNumber": "EMP001",
      "tasks": [
        {
          "id": "t1",
          "title": "Website Redesign",
          "description": "Redesign the company website homepage with modern UI elements",
          "date": "2024-03-25",
          "category": "Design",
          "active": true,
          "newTask": false,
          "completed": false,
          "failed": false
        },
        {
          "id": "t2",
          "title": "Bug Fixes",
          "description": "Fix reported bugs in the login system",
          "date": "2024-03-20",
          "category": "Development",
          "active": false,
          "newTask": false,
          "completed": true,
          "failed": false
        },
        {
          "id": "t3",
          "title": "Mobile App Testing",
          "description": "Conduct thorough testing of the new mobile app features",
          "date": "2024-03-28",
          "category": "Testing",
          "active": true,
          "newTask": true,
          "completed": false,
          "failed": false
        }
      ]
    },
    {
      "id": 2,
      "firstName": "Jane",
      "email": "jane@example.com",
      "password": "123",
      "taskNumber": "EMP002",
      "tasks": [
        {
          "id": "t4",
          "title": "Database Optimization",
          "description": "Optimize database queries for better performance",
          "date": "2024-03-22",
          "category": "Development",
          "active": true,
          "newTask": false,
          "completed": false,
          "failed": false
        },
        {
          "id": "t5",
          "title": "API Documentation",
          "description": "Update API documentation with new endpoints",
          "date": "2024-03-21",
          "category": "Documentation",
          "active": false,
          "newTask": false,
          "completed": true,
          "failed": false
        },
        {
          "id": "t6",
          "title": "Security Audit",
          "description": "Perform security audit of the application",
          "date": "2024-03-29",
          "category": "Security",
          "active": true,
          "newTask": true,
          "completed": false,
          "failed": false
        },
        {
          "id": "t7",
          "title": "Code Review",
          "description": "Review pull requests from the development team",
          "date": "2024-03-23",
          "category": "Development",
          "active": true,
          "newTask": false,
          "completed": false,
          "failed": false
        }
      ]
    },
    {
      "id": 3,
      "firstName": "Alice",
      "email": "alice@example.com",
      "password": "123",
      "taskNumber": "EMP003",
      "tasks": [
        {
          "id": "t8",
          "title": "UI Component Library",
          "description": "Create reusable UI components for the design system",
          "date": "2024-03-24",
          "category": "Design",
          "active": true,
          "newTask": false,
          "completed": false,
          "failed": false
        },
        {
          "id": "t9",
          "title": "User Research",
          "description": "Conduct user research for new features",
          "date": "2024-03-26",
          "category": "Research",
          "active": true,
          "newTask": true,
          "completed": false,
          "failed": false
        },
        {
          "id": "t10",
          "title": "Prototype Development",
          "description": "Develop interactive prototype for client presentation",
          "date": "2024-03-19",
          "category": "Design",
          "active": false,
          "newTask": false,
          "completed": false,
          "failed": true
        }
      ]
    },
    {
      "id": 4,
      "firstName": "Bob",
      "email": "bob@example.com",
      "password": "123",
      "taskNumber": "EMP004",
      "tasks": [
        {
          "id": "t11",
          "title": "Performance Testing",
          "description": "Conduct performance testing on the application",
          "date": "2024-03-27",
          "category": "Testing",
          "active": true,
          "newTask": true,
          "completed": false,
          "failed": false
        },
        {
          "id": "t12",
          "title": "CI/CD Pipeline",
          "description": "Set up automated deployment pipeline",
          "date": "2024-03-20",
          "category": "DevOps",
          "active": false,
          "newTask": false,
          "completed": true,
          "failed": false
        },
        {
          "id": "t13",
          "title": "Code Refactoring",
          "description": "Refactor legacy code modules",
          "date": "2024-03-25",
          "category": "Development",
          "active": true,
          "newTask": false,
          "completed": false,
          "failed": false
        },
        {
          "id": "t14",
          "title": "Unit Tests",
          "description": "Write unit tests for new features",
          "date": "2024-03-22",
          "category": "Testing",
          "active": true,
          "newTask": false,
          "completed": false,
          "failed": false
        },
        {
          "id": "t15",
          "title": "Monitoring Setup",
          "description": "Set up application monitoring and alerts",
          "date": "2024-03-21",
          "category": "DevOps",
          "active": false,
          "newTask": false,
          "completed": true,
          "failed": false
        }
      ]
    },
    {
      "id": 5,
      "firstName": "Carol",
      "email": "carol@example.com",
      "password": "123",
      "taskNumber": "EMP005",
      "tasks": [
        {
          "id": "t16",
          "title": "Content Strategy",
          "description": "Develop content strategy for the marketing campaign",
          "date": "2024-03-28",
          "category": "Marketing",
          "active": true,
          "newTask": true,
          "completed": false,
          "failed": false
        },
        {
          "id": "t17",
          "title": "Analytics Dashboard",
          "description": "Create analytics dashboard for key metrics",
          "date": "2024-03-23",
          "category": "Development",
          "active": true,
          "newTask": false,
          "completed": false,
          "failed": false
        },
        {
          "id": "t18",
          "title": "User Feedback",
          "description": "Collect and analyze user feedback",
          "date": "2024-03-20",
          "category": "Research",
          "active": false,
          "newTask": false,
          "completed": true,
          "failed": false
        }
      ]
    }
]

const admin = [
    {
      "id": 1,
      "firstName": "Admin",
      "email": "admin@example.com",
      "password": "123"
    }
]

export const setLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('admin', JSON.stringify(admin))
}

export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem('employees'));
  const admin = JSON.parse(localStorage.getItem('admin'));
  return { employees, admin };
}

export { employees, admin }
