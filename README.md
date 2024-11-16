# SwingTheory

 ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-green) ![License](https://img.shields.io/badge/license-MIT-green)

## Description

SwingTheory is the app that works as the virtual tennis coach. It has adopted traditional structure which is separated into two parts, **backend** and **frontend** as shown in directory. Besides, **machine_learning** folder includes codes for pre-training the model, but it will not affect the main app running as the training has completed.

## Tech Stack

1. **[Python Flask](https://flask.palletsprojects.com/en/3.0.x/)**: Basic service component for microservice
2. **[MySQL](https://www.mysql.com/)**: Relational database for CRUD
3. **[Firebase]((https://firebase.google.com/))**: Cloud storage database for static resources
4. **[YOLO V8](https://yolov8.com/)**: Video processing CV framework to capture key joints of users
5. **[React Native]((https://github.com/facebook/react-native))**: The frontend framework that supports both IOS and Android.

## Prerequisites

- Python 3.8
- NPM
- EXPO
- MySQL instance
- A phone with EXPO app installed

## How to run the app

The process to run the app involves two main sequential steps. Firstly, run the backend code. Secondly, run the frontend code.

### 1. Run the Backend

1. Install all dependencies.

``` bash
cd backend
pip install requirements.txt
```

2. Run gateway_service and record the second URL open to public which is **not** http://127.0.0.1:7381.
``` bash
cd gateway_service
python app.py
cd ..
```

3. Run relational_database_service and you must ensure there is a MySQL instance running.
``` bash
cd relational_database_service
cd config
vim config.py
modify the DATABASE_URL to 'mysql://{Host}:{Password}@localhost:{Port}'
cd ..
python app.py
python 
```

4. Run video_process_service
``` bash
cd video_process_service
python app.py
```

### 2.Run the Frontend

1. Install the required node modules:
  ```bash
  cd frontend/frontend
  npm install
  ```
2. Config the backend URL recorded in step 1.2
  ```bash
  vim ./src/constants/backendURL.js
  modify backendURL to the recorded backendURL
  ```
3. Run the code in the frontend folders:
  ```bash
  npx expo start
  ```

4. Connect to your phone
**Android**: Scan the QR code in Expo
**iOS**: Use the default scanner of iOS (no scanner in iOS Expo).