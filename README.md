# Cypress + Jenkins + Docker integration Tutorial
I. Setup Environment
1.Down Nodejs https://nodejs.org/en/download/
2.Down VS https://code.visualstudio.com/download 
3.Down Docker
a. Install Jenkins/jenkins on Docker 
b. Install tool Ngrok

II. Create a project

1. Create a folder

D:\ProjectTest\CypressAuto

2. Create package.json file

Open cmd from D:\ProjectTest\CypressAuto & input "code ." to open VS

"Ctrl+Shift+`" to open terminal 

Input: npm init or npm init -y

Enter: Ok to create package.json file

3. Install Cypress

Input: npm install cypress --save-dev

wait setup..

II. Cypress runner

Input: npx cypress open

4. Setup package.json

"scripts": {
    "dev": "cypress open",
    "test": "cypress run --browser chrome --headed"
  }
5. Setup cypress.config.js

projectId:"CypressTest",
    specPattern:"./cypress/test/**.*", //direct folder
    baseUrl:"https://www.thegioididong.com" //url


III. Practice

1. Create file with action 
a. Access to any website, then check content automatically
b. Access to any website, then check function login automatically
c. Access to any website, then check chatbox automtically
