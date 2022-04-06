# **家庭記帳本 Expense Tracker :money_with_wings:**

Expense Tracker built with Node.js, express and MongoDB for taking a record for daily expenses with an account: Create, View, Edit, Delete and use filter to show particular expenses.

## Project First Look
*Use one method you prefer to login.*
![GITHUB](https://raw.githubusercontent.com/winnielinn/expense-tracker/main/public/login_page.png "login_page")

*Manage your expenses in home page.*
![GITHUB](https://raw.githubusercontent.com/winnielinn/expense-tracker/fea44e2fd94f0e217150883fa8d22b06bee65bde/public/home_page.png "home_page")

## **Getting Start**

### **Environment Setup**

* Node.js v14.16.0

* MongoDB v4.2.18

### **Installing**

1. Open your terminal and use 'git clone' to copy this project to local.

```
git clone https://github.com/winnielinn/expense-tracker.git
```

2. Change directory to the project.

```
cd expense-tracker
```

3. Install all dependencies.

```
npm install
```

4. Install nodemon package.

```
npm install -g nodemon 
```

5. Run seed data. Once seed data created, terminal will show `categorySeeder created` and `recordSeeder created` .

```
npm run seed
```

6. Please refer `.env.example` to check which environment varible you need for full web app experience. Following API service you'll need:

* [Meta for Developers](https://developers.facebook.com/)
* [Google OAuth 2.0 Login](https://console.developers.google.com/)

7. Run server in localhost by using following npm script. If successful, `The server is listening on http://localhost:3000` will show in terminal.

```
npm run dev
```

8. Kindly visit `https://stormy-forest-44412.herokuapp.com/` to use this app online.

## **Contributor**

> [Winnie Lin](https://github.com/winnielinn)
