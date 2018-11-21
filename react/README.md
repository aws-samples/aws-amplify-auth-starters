# AWS Amplify React Authentication Starter

![](hero.png)

## This project includes:    
- User sign up
- User sign in
- 2 factor authentication
- Real world auth flow using React Router
- Protected routes
- Redirects for unauthorized users
- Time-baed one time password (TOTP)    

## Getting started    

1. clone the project    

```
git clone <repourl>
```

2. install dependencies using npm or yarn    

```
yarn || npm i
```

3. Start project    

```
npm start
```

## Setting up AWS services    
If you do not have your AWS services already created, follow these steps. If you already have your services set up, just configure your aws-exports.js file.    

1. from the root of the project, create awsmobile project    

```sh
amplify init
```

2. add user sign-in / authentication (Amazon Cognito)    

```sh
amplify add auth

## choose default configuration or create your own custom configuration
```

3. push to create new services in your account

```sh
amplify push
```

## Enabling MFA

1. Visit the [Amazon Cognito User Pool Dashboard](https://console.aws.amazon.com/cognito/users) & click on your user pool.

2. Click on MFA & verifications

3. Do you want to enable Multi-Factor Authentication (MFA)? __Optional__