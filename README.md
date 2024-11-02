# website
Repo for gmail classifier website

# SuperUserInfo for testing purposes
username: admin

email: None

password: root

# Requirement


npm, node, nvm for node version control, python, django,
```nvm -v```
0.39.7

```nvm use 20```
Now using node v20.15.1 (npm v10.7.0)


# build

1. To start a python enviroment:
    ```python -m venv env```

2. To activate the enviroment:
 - for windows
```env\Scripts\activate```

 - for mac
```source env/bin/activate```

3. Install the dependency for django:
```cd backend```
```pip install -r requirements.txt```

4. Install the dependency for npm(node version=20):
```cd frontend```
```npm install```

5. run:
 - front-end Compile methods:
 - - ```npm start```: webpack serve --config webpack.config.js
 - - ```npm run default```: npm react-scripts start --host
 - back-end compile method:
 - - ```python manage.py runserver```



https://www.youtube.com/watch?v=BxpA6ZavFCQ&ab_channel=KenyanEngineer
need to put frontend into backend

default compile method:
"start": "react-scripts start --host",
"build": "react-scripts build",

