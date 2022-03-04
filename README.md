## Getting started

1. Clone the project using `git clone`
2. Navigate to the folder where you cloned the project.
3. Execute ```npm run build``` inside the `frontend` folder.
4. Back to the root folder containing the `docker-compose.yml` file, execute `docker-compose up -d --build`
5. Once docker images have been successfully built, open a new tab in your browser and go to the following url.
```
 http://localhost
```

## Setting up crown job for daily run
6. For daily notifications, set up a crown job which calls the following URL.
```
 http://localhost/api/services?days_ago=30
```
7. Email notifications are sent to users for the respective country where alert is generated. For the moment, the email is simulated by writing to a local file