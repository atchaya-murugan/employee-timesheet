# ClockySheet
<p align="center">
   <a href="assets/clock-logo (1).jpg" rel="noopener" target="_blank"><img width="400" src="timesheet_logo.png" alt="Timesheet logo"></a>
   
</p>
![clock-logo (1)](https://github.com/atchaya-murugan/employee-timesheet/assets/139705786/47364fe7-af41-471f-882f-323b01ffce8c)

Timesheet is an application designed to streamline the management and access of daily work time. With a minimalist feature set and sleek design, it simplifies the process of tracking work hours, eliminating the need for manual time calculation. Start using Timesheet now to enhance your workflow efficiency.

#### Table of Contents
- **How to Use**
- **How to Run**
- **Development**
- **Privacy**

#### How to Use
Access the application by visiting the [Website](https://timesheet.js.org). Timesheet offers the following features:

- **Timetracker:** The Timetracker module empowers users to meticulously monitor their work hours by providing a comprehensive platform for logging project-related activities. Users can input pertinent project details and designate the nature of their tasks, whether it involves Self-learning, Customer Work, or Training. Once initiated, users can start and stop the timer at their discretion, facilitating accurate recording of work duration. This module seamlessly integrates with the backend system to securely store logged data, including timestamps, project details, and work types, ensuring a reliable repository of work history.
- **Timesheet:** The Timesheet module streamlines the process of tracking and managing work hours over a specified time period. Users can effortlessly retrieve the cumulative working hours for a given project throughout the current week. By simply entering the project name, users gain instant access to a detailed breakdown of their weekly work hours, aiding in efficient time management and resource allocation.
- **Report:** The Report module offers valuable insights into team productivity and project dynamics by furnishing comprehensive reports on work activities. Users can select a specific project to generate detailed reports showcasing the total work hours contributed by team members. Furthermore, this module delineates between billable and non-billable hours based on the nature of the work undertaken, providing stakeholders with actionable data to facilitate informed decision-making and resource planning.
- **Project:** The Project module serves as a centralized hub for project management, allowing users to create and oversee various project initiatives. By completing a simple project form, users can initiate new projects, defining key parameters such as project name, scope, and objectives. This module fosters efficient project initiation and facilitates streamlined project administration, enhancing overall project management efficacy.
- **Team:** The Team module empowers administrators to construct and manage cohesive project teams, fostering collaboration and synergy among team members. Administrators can create and customize team structures, adding members, groups, and establishing reminders to streamline communication and task delegation. This module facilitates efficient team coordination and cultivates a conducive environment for collective goal attainment.
- **Timeoff:** The Timeoff module facilitates seamless management of employee leave requests, ensuring transparent and efficient leave allocation processes. Employees can effortlessly submit leave requests by selecting leave dates from an intuitive calendar interface and specifying the type of leave desired, including options such as Sick Leave, Casual Leave, or Annual Leave. This module provides administrators with an overview of available leave days, streamlining leave approval workflows and promoting workforce well-being and work-life balance.

#### How to Run
- **Step 1:** Open VS Code and open the project folder.
- **Step 2:** Set Git Bash as default terminal, Open Terminal.
- **Step 3:** Run " npm start " command for backend
- **Step 4:** change the directory from src folder to backend folder by run the " cd backend " command.
- **Step 5:** Run " npm start " command in the backend folder to run the backend.
- **Step 6:** Open XAMPP server and start the Apache & Mysql in the XAMPP Control Panel.

#### Development
The application is scaffolded using create-react-app (CRA) with Typescript templating. Clone the Timesheet repository for custom development.

#### Privacy
Timesheet prioritizes the privacy and security of your data. Here's how:

- **Local Storage:** Timesheet uses local storage to persist work hour lines, ensuring that your data stays within your device and is accessible only to you. No timesheet data is stored on external servers.
- **Server Storage:** User data, including timesheet information, is securely stored on a local server managed by XAMPP. This ensures that sensitive data is kept confidential and is accessible only to authorized users within your network.

