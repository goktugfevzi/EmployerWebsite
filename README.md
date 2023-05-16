# Employer Website
<p align="center">

This is a software project developed for managing tasks created by a team manager and assigning them to employees. The system ensures that the completed tasks are transferred to the counterpart.The project also adopts a company-wide Kanban system, which served as the motivation behind its development.

The project consists of two main sections: Personnel and Administration panels. In the user panel, after the user logs in or creates an account, the dynamic menu will display options such as Profile, Task Tracking, and Logout. The login components redirect to the Profile screen, where users can view the tasks assigned to them, manage their account information, and change their passwords. The Task Tracking page lists all the tasks, and users cannot claim tasks that are already completed, not suitable for their department, or assigned to someone else. Only the manager can assign these tasks. Users can also log out from this page.

When the administrator logs into the system, the menu section dynamically updates to display an additional Personnel tab. The administration panel has a different interface compared to the user's task tracking screen. Administrators can create, delete, and modify tasks. The Personnel screen lists all users, allowing the administrator to add new users, modify user information, and delete users.

</p>


## Technologies Used

- Front-end:</br>
  - React.js</br>
  - HTML/SCSS (HyperText Markup Language/Sassy Cascading Style Sheets)</br>
  - TypeScript</br>
  - Material UI</br>
</br>
- Back-end:</br>
  - Built with .NET Core, following the MVC architecture</br>
  - Utilized the Identity library for user operations</br>
  - Used MailKit for email operations</br>
  - Employed Entity Framework as the database framework due to its speed, usability, and reliability</br>
  - Chose PostgreSql as the database system</br>
</br>

## Some Screenshots




## Installation

Clone the repository to your local machine.</br>
```sh
git clone https://github.com/goktugfevzi/EmployerWebsite.git
```
Install PGAdmin4 and create database account</br>
Create appsettings.json file</br>
Connect DB With Backend</br>
Generate Gmail App key and integrate it into the project</br>
And Run Backend
```sh
dotnet run
```
Run Frontend
```sh
npm i
```
```sh
npm start
```
## License
Thanks My Mom
