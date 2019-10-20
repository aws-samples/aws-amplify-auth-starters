# AWS Amplify Vue Auth Starter

![](hero.png)

## This project includes:    
- User sign up
- User sign in
- 2 factor authentication
- Real world auth flow
- Protected routes
- Redirects for unauthorized users

## Getting started    

#### Initial setup

1. Make sure you are on a new version of the AWS Amplify CLI to be sure you have multiple environment support.

```sh
npm install -g @aws-amplify/cli
```

2. clone the project    

```sh
git clone https://github.com/aws-samples/aws-amplify-auth-starters.git
```

3. Check out the vue branch

```sh
git checkout vue
```

4. install dependencies using npm or yarn    

```sh
npm install
```

5. Start project    

```sh
npm run serve
```

#### Setting up back end AWS services
    
If you do not have your AWS services already created, follow these steps. If you already have your services set up, just configure your aws-exports.js file.    

1. From the root of the project, initialize the Amplify project    

```sh
amplify init
```

2. Create the resources in your account

```sh
amplify push
```