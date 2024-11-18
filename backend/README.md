# Tennis_Stroke_Backend

 ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-0.5.1-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## Description

This project is the backend for Freitag project. 

It is mainly for processing videos and returning results if for the frontend to display. It also provides basic **CRUD** function.

## Tech Stack

1. **Python Flask**: basic service component for microservice
2. **MySQL**: Relational database for CRUD
3. **Firebase**: Cloud storage database for static resources
4. **YOLO V8**: Video processing CV framework to capture key joints of users 

## Description

The project is structured in **microservices**

Currently there are 3 services:

1. **Gateway Service**: works as the entry exposed to the outer world for the whole project. All the requests will be then sent to corresponding services
2. **Relational Database Service**: works for basic CRUD manipulation
3. **Video Process Service**: works for processing video, getting keyframes and ratings

## How to run

1. Ensure you have Python version >= 3.8
2. Ensure you have MySQL running and change the DATABASE_URL under config/config.py from relational_data_service if necessary
3. Ensure you have set up a Firebase project and you can get a credential JSON file by clicking *Generate new private key* from service accounts. Move it to config directory in video_process_service and rename it to "firebase_cred.json"
4.  Ensure you have all dependencies mentioned in requirements.txt installed.
5. Use CMD python to run app.py under each service

