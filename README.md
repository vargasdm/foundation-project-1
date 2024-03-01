# Reimbursement Ticketing System

## Overview

The Reimbursement Ticketing System is a backend application designed to streamline the process of managing reimbursement requests within an organization. It provides a platform for employees to submit reimbursement requests and for managers to review, approve, or deny these requests.

## Features

- **User Registration**: Employees can register new accounts with a username and password.
- **Role Management**: User roles are initially set to "employee" and can only be changed by a manager.
- **Authentication**: Users must log in with their credentials to access the system.
- **Ticket Submission**: Employees can submit reimbursement requests by providing an amount and description.
- **Ticket Management**: Managers can view all pending tickets submitted.
- **Approval Workflow**: Managers can approve or deny reimbursement requests.

## User Roles

- **Employee**: Can submit reimbursement requests and view their own submitted tickets.
- **Manager**: Can view all pending tickets and approve or deny requests.

## How to Use

1. **Registration**: Employees must register a new account with a username and password.
2. **Login**: Users can log in using their credentials.
3. **Employee Actions**:
   - View submitted tickets.
   - Submit a new reimbursement request.
4. **Manager Actions**:
   - View all pending tickets.
   - Approve or deny reimbursement requests.

## Technologies Used

- Backend: JavaScript, Node.js, Express.js, Bcrypt, Uuid, Dotenv
- Database: DynamoDB
- Testing: Jest

## Installation

1. Clone the repository: `git clone https://github.com/example/reimbursement-ticketing-system.git`
2. Navigate to the project directory: `cd reimbursement-ticketing-system`
3. Install dependencies: `npm install`
4. Start the server: `npm run start`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is not licensed.
