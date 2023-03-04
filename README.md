Following https://bennierobinson.com/programming/2020/12/01/react-rails-setup.html


## CI/CD
Using Semaphore CI for deploying
https://utricularian.semaphoreci.com/projects/the-recipe-spreadsheet

### Troubleshooting
#### Authentication method Expired
```The .netrc file is not a permanent token. It must be updated from time to time.```

If you encounter a job hanging at the authentication step, it could be due to an expired .netrc file. In this case, recreating the file and the secret should solve the issue.
https://docs.semaphoreci.com/examples/heroku-deployment/
