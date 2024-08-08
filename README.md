# CapstoneMMSSinc

Talent Insight Solutions QUT Capstone Project

# Setup for vscode deployment:

1. open it in Visual Studio Code where you should see the Client and Server folders.
2. up top click terminal and click new terminal.
3. repeat step 2, you will now have 2 terminals open - you can drag them around to have both in view if needed.
4. in one terminal type "cd client" and in the other "cd server" and then in both type "npm install" to install our node modules.
5. once step 4 is complete in the client terminal you can type "npm start" and in the server terminal type "npm run dev".

# Setup for render.com deployment
# Server Side:
1. click new and select Web Service on render.com
2. select build and deploy from a Git repository
3. connect your Github account to view your current repositories - connect to the Project repo
4. enter a service name, select the branch, for the root directory type "server", runtime "Node", build command "npm install", start command "npm run start"
5. for the current hosting the instance type is set to starter - Stephen is currently paying for this and will leave it hosted until the showcase if we decide to show our product - this makes it so that the server doesn't turn off after a period of no use.
6. Select Advanced then select Add Environment Variable - add ALL the variables within the .env inside the server folder into this area - The key being the name.
7. Now select create Web Service and it should deploy the server side in afew minutes.
# Client Side:
1. click new and select Static Site on render.com
2. select build and deploy from a Git repository
3. connect to the Project repo
4. enter a service name, select the branch, for the root directory type "client", build command "npm run build", Publish directory "client/build"
6. Select Advanced then select Add Environment Variable - add a key named "REACT_APP_BASE_URL" for the value section add the url of the serverside in my deployment it is "https://dashboard-backend-mlz9.onrender.com"
7. Now select create Static Site and it should deploy the website in afew minutes.
8. navigate to the Static Sites render.com dashboard and select Redirects/Rewrites.
9. select Add Rule - add  Source: "/*", Destination: "/index.html", Action: "Rewrite". - this is required because the app uses React Router to route between pages.

# Technologies

Technologies used in this are MongoDB, Express, React, NodeJS, and React Redux.

A lot of this was created using Material UI (MUI) components and styling them - docs for Material UI can be found here https://mui.com/material-ui/getting-started/

The charts currently being used are from https://nivo.rocks/components/
