## Introduction

### Who am I

    - I am a Senior software developer, I graduated at 42 school in France. And I have been coding professionnaly for 8 years
    - I am currently working at busbud. A website that sells intercity bus and train tickets 
    - I love open source and new technology and if you want to make me happy send me github issues with cat gif

### Purpose: Quickly establish what Nuxt and Tailwind bring to the table.
    
    - Nuxt: "A framework for building Vue.js applications with server-side rendering, routing, and more."
    - Tailwind: "A utility-first CSS framework for fast and consistent UI development."

### Goal of the Workshop:

    - Show them the github link of the project https://github.com/flozero/trivia-quiz-generator. Tell them to follow the readme it will be easier to copy past things if needed
    - Build a simple Pokémon quiz. Show the final result
    - Show excalidraw how the project is split
    - Create first page and how Nuxt handle routing
    - Show some tailwind responsive and auto complete
    - Create db.ts file and explain we will use shared folder to share types and utils. They are auto imported
    - Create pokemon api + util + shared type
    - Put the accent on interfaces they are like contract so you can easily switch to one db / service to another until you respect the contract
    - Create nuxt api quiz to create a quiz and say that we will a bit override how nuxt return types so we can normalize and simplify return accross how we fetch datas from the frontend
    - Update frontend home page to send the user to the quiz after creating one
    - Update quiz_id vue page:
        - grid design
        - pokeball to show tailwind + show animation
        - setup variables and functions + reset function
        - call api
    - some refacto
        - create header component
        - create button component

### Improvments
- Make the quiz api more quiz agnostic
- Use a real DB
- improve responsive
- Authentication
- Allow external user to join a quiz session
- Improve design overrall


## Summarize Key Takeaways:

- Nuxt simplifies Vue development with routing and server-side rendering, A lot of modules available
- Tailwind speeds up CSS development with pre-built utilities. We do use it at Busbud. We replaced material design with it

## Thank you

Thank you for listening if you have any questions about nuxt or tailwind or anything related to dev in general I will be really happy to answer outside.