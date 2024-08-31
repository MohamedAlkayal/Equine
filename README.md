# Equine Frontend Application

![Equine Logo.](https://equinesolutions.co/assets/images/logo.png)

## Introduction

This project is a Vue 3 application built as part of a frontend developer interview assignment. The application is designed to manage employees and departments, demonstrating the ability to work with RESTful APIs, handle CRUD operations, manage complex data relationships, and implement robust error handling. Employees can be assigned to or removed from departments, and all CRUD operations are managed via the provided API. The project leverages Nuxt 3 for the application structure, @vee-validate/nuxt for form validation, and Yup for schema validation. The focus is on delivering a functional and user-friendly interface with a clean and organized codebase.

## Live Preview

I deployed a version of the application on Vercal for convenience [Live Preview](https://equine-delta.vercel.app/employees).
   - note: This app is not fully customized for small screens 

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. The project has been tested with Node.js version 18.x and higher.
- **npm**: The project uses npm as the package manager.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/equine.git
   cd equine
   ```

2. **Install Dependencies**

   ```bash
   git clone https://github.com/your-username/equine.git
   cd equine
   ```

3. **Environment Variables**

   - Create a .env file in the root directory of the project.

   - Add the following environment variable:

   ```bash
   BASE_API_URL="https://interview.frontend.equinesolutions.co/api"
   ```

4. Running the Application

   To start the development server, run:

   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:3000.

5. Building for Production

   To build the application for production, run:

   ```bash
   npm run build
   ```

## Structure

### 1. Pages

- **index**: Redirects to `/employees`.
- **employees**: Displays a table of employees with CRUD functionality and the ability to assign employees to departments.
- **departments**: Displays a table of departments with CRUD functionality and the ability to assign employees to each department.

### 2. Layouts

- **default**: A layout to structure the dashboard and the side navigation component.

### 3. Middleware

- **redirect.global**: Middleware that redirects from `/` to `/employees`.

### 4. Composables

- **useAsyncApi**: A wrapper around `$fetch` to add extra functionality.
- **useFetchApi**: A wrapper around `useFetch` to add extra functionality.

### 5. Utilities

- **convertDate**: A JavaScript utility function to format dates into readable and usable forms.

### 6. Components

- **Department Directory**: Modals used in the departments page.
- **Employee Directory**: Modals used in the employees page.
- **Global Directory**: Components used across all pages.

## Departments Page Implementation

The `Departments` page is a critical part of the application, providing CRUD functionality for departments and allowing users to assign employees to specific departments. This section will detail the implementation, including key components, modals, and utilities used.

### Overview

- **Purpose**: Manage departments, including creation, update, deletion, and employee assignments.
- **Features**:
  - List departments with details such as ID, name, manager, and creation date.
  - Create new departments via a modal.
  - Update existing department details.
  - Delete departments with confirmation.
  - View and manage employees assigned to departments.

### Key Components

- **Modal Management**:

  - `DepartmentCreateModal`: Handles the creation of new departments.
  - `DepartmentUpdateModal`: Allows updating existing departments.
  - `DepartmentEmployeesModal`: Displays and manages employees within a department.
  - `DeleteModal`: Confirms and handles the deletion of departments.

- **Utility Functions**:

  - `convertDate`: A utility function used to format date fields (`birthDate`, `dateOfJoining`) into a readable format.

- **Action Items**:
  - Each department row includes action items for updating, viewing employees, and deletion. These actions are implemented using a dropdown menu for ease of access.

### Search and Filtering

- The page includes a search functionality with a debounced query update to ensure efficient API requests and a smooth user experience. The search input filters the list of departments by name.

### Data Fetching and State Management

- The `useAsyncApi` composable is utilized for fetching department data from the API. This composable handles the API request, loading state, and provides a refresh mechanism to update the list after any CRUD operation.

### UI and UX Considerations

- The table displaying departments is designed with a clean UI, sticky headers for better navigation, and loading indicators to inform users of background operations. The page also handles various UI states such as loading, empty results, and error messages gracefully.

## Employees Page Implementation

The `Employees` page is an integral part of the application, providing CRUD functionality for employees and allowing users to manage employee details and their department assignments. This section details the implementation, including key components, modals, and utilities used.

### Overview

- **Purpose**: Manage employees, including creation, update, deletion, and department assignments.
- **Features**:
  - List employees with details such as ID, name, salary, date of birth, joining date, and creation date.
  - Create new employees via a modal.
  - Update existing employee details.
  - Delete employees with confirmation.
  - View and manage departments assigned to employees.

### Key Components

- **Modal Management**:

  - `EmployeeCreateModal`: Handles the creation of new employees.
  - `EmployeeUpdateModal`: Allows updating existing employees.
  - `EmployeeDepartmentsModal`: Displays and manages departments associated with an employee.
  - `DeleteModal`: Confirms and handles the deletion of employees.

- **Utility Functions**:

  - `convertDate`: A utility function used to format date fields (`birthDate`, `dateOfJoining`) into a readable format.

- **Action Items**:
  - Each employee row includes action items for updating, viewing departments, and deletion. These actions are implemented using a dropdown menu for ease of access.

### Search and Filtering

- The page includes a search functionality with a debounced query update to ensure efficient API requests and a smooth user experience. The search input filters the list of employees by name or other details.

### Data Fetching and State Management

- The `useAsyncApi` composable is utilized for fetching employee data from the API. This composable handles the API request, loading state, and provides a refresh mechanism to update the list after any CRUD operation.

### UI and UX Considerations

- The table displaying employees is designed with a clean UI, sticky headers for better navigation, and loading indicators to inform users of background operations. The page also handles various UI states such as loading, empty results, and error messages gracefully.
