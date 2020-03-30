# AWS Amplify React Native Auth Starter

![](hero.jpg)

# AWS Amplify React Authentication Starter

![](hero.png)

## This project includes:    
- User sign up
- User sign in
- 2 factor authentication
- Real world auth flow using React Navigation

## Getting started  

1. Make sure you are on a new version of the AWS Amplify CLI to be sure you have multiple environment support.

```sh
npm install -g @aws-amplify/cli
```

2. clone the project    

```sh
git clone https://github.com/aws-samples/aws-amplify-auth-starters.git
```

3. Check out the React Native branch

```sh
git checkout react-native
```

4. install dependencies using npm or yarn    

```sh
yarn || npm i
```

5. For iOS, install the pods:

```sh
cd ios
pod install
cd ..
```

6. Start project    

```sh
react-native run-ios

# or

react-native run-android
```

## Setting up AWS services    
If you do not have your AWS services already created, follow these steps. If you already have your services set up, just configure your aws-exports.js file.    

1. From the root of the project, initialize the Amplify project    

```sh
amplify init
```

2. Create the resources in your account

```sh
amplify push
```
