# Project Roomsy
Building a replica of Hotel Management application "Roomsy"  
University Group Project [QLDAPM-4]  

Project is built as a microservices system with below components (Still Updating)  
## Gateway
**Repo:** _rocketspacer/roomsy-gateway_ - this repository  
A gateway stand as a web server entry-point for client to other services in the system

## Authentication
**Repo:** _rocketspacer/roomsy-auth_   
Authentication service that do the job of managing user accounts  
Provide a set of APIs that allow user to:  
- Create new account
- Provide credentials in exchange for an access token
- Resolve an access token to account information to pass along request to internal services (allow them to do authorization)
