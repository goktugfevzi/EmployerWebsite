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

![1](https://github.com/goktugfevzi/EmployerWebsite/assets/64567701/2ddbf1d2-36fd-4619-bb35-71a811905242)
<p align="center">Database Tables</p>

![2](https://github.com/goktugfevzi/EmployerWebsite/assets/64567701/df251af2-f6ba-48c5-ae8a-d7e168c70883)
<p align="center">Login Page</p>

![3](https://github.com/goktugfevzi/EmployerWebsite/assets/64567701/ef47319b-487f-4b38-a55f-664574eebbeb)
<p align="center">Sign Up Page</p>

![4](https://github.com/goktugfevzi/EmployerWebsite/assets/64567701/ceeb1083-2284-4aa5-94e8-21499c39d07f)
<p align="center">Jobs List Page For Admin</p>

![5](https://github.com/goktugfevzi/EmployerWebsite/assets/64567701/f25745eb-357b-4219-900d-913158de05d3)
<p align="center">Adding New Job Page</p>

![6](https://github.com/goktugfevzi/EmployerWebsite/assets/64567701/5e0f1623-1714-4dd2-a6eb-76dbb5661a07)
<p align="center">Adding New User Page</p>

![7](https://github.com/goktugfevzi/EmployerWebsite/assets/64567701/dcd341cf-b38d-4d6b-a507-73cddbc6f988)
<p align="center">Personel List Page</p>

![8](https://github.com/goktugfevzi/EmployerWebsite/assets/64567701/6dd18436-920e-4e42-a1d9-89b9bca14899)
<p align="center">Profile Page For User</p>

![10](https://github.com/goktugfevzi/EmployerWebsite/assets/64567701/8626a848-8e36-4652-8253-234703c00cf5)
<p align="center">Jobs List Page For User</p>

![11](https://github.com/goktugfevzi/EmployerWebsite/assets/64567701/a575bf6f-21eb-44cf-b814-05e0806e71a9)
<p align="center">Confirm Email ScreenShot</p>


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
