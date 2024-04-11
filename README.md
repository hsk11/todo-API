# API - BACKEND TASK MANAGER

## Author

[![Twitter Follow](https://img.shields.io/twitter/follow/Harpalsingh_11?label=Follow)](https://twitter.com/intent/follow?screen_name=Harpalsingh_11)
[![Linkedin: Harpal Singh](https://img.shields.io/badge/-harpalsingh11-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/harpalsingh11)](https://www.linkedin.com/in/hsk11/)
[![GitHub followers](https://img.shields.io/github/followers/hsk11?label=Follow&style=social)](https://github.com/hsk11)
---

# NOTE * - The Server Library used in this Project is Created by Harpal Singh (Author Himself) and is Open Source

I have make sure the this app is super scalable and easy to Manage. Mine main focus was to manage taks ,thus haven't created delete and Update api for user. (https://www.npmjs.com/package/jai-server)

## Features - API

- Create Task
- Delete Task
- Update Tasks
- Get all Users Tasks
- Get particular task
- Search Tasks by Name, Status, and Description
- Create User
- User Login
- Auth Validation
- Payload Validation using Joi - Automated Using Custom Function
- Auto Routes Generation Using - Function Names
- Jwt Token Generation
- MongoDB Database Used
- Auth Validation on All routes except login and signup
- Integrated Validation Method in Schema
- Integrated Hashing Method in user Schema
- ESLINT formating
- Nodemon installed for better DEV experience


## Getting Started

## Requirements
- Node.js 16> & npm or yarn
- MongoDB 5>


Note*: Kindly Edit .env as per your requirements and system setting like : mongodb url, PORT etc. Kindly Update the Port on Frontend APP

### Installation


CD in to project Folder


```bash

  npm install

```

### Start App


```bash

  npm run start 
  # or for development continous filechanges watch by nodemon
  npm run dev

```

Note* For production Kindly use Process Manger for Monitoring and high availability of the APP. 
* Also Kindly add CORS as per Front END app. Right Not set to Allow All