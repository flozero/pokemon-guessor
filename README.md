# [CUSEC 2025](https://2025.cusec.net/) - Build Fast, Build Fresh: Nuxt and Tailwind - Build a Trivia quiz generator
> By Florent Giraud ([LinkedIn](https://www.linkedin.com/in/fgiraud42/))

## FOR THIS WORKSHOP, YOU WILL NEED:

- An IDE (I am using VS Code)
    - Also recommend to install [vscode tailwind plugin](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Node.js](https://nodejs.org/en/) installed on your computer
- Git
- A terminal

## 📍 Setting up your Nuxt project and TailwindCSS

1. Create a new project 

`npx nuxi@latest init trivia-quiz-generator`

2. Install tailwind. You can manually Installed tailwind or you can use Nuxt modules to simplify the setup. I recommend to use as much [NUXT MODULES](https://nuxt.com/modules) as there are a lot of existing modules for a lot of things you may need to speed up your dev.

`npx nuxi module add @nuxtjs/tailwindcss`

3. Improve auto completions for tailwind classes so they show faster

Create a `.vscode/settings.json` at the root folder of the project with 

```json
{
    "editor.quickSuggestions": {
        "other": "on",
        "comments": "off",
        "strings": "off"
    }
}
```

4. Update app.vue with

``` vue
<template>
  <div class="bg-red-500">
    hello World
  </div>
</template>
```

Congrats you have setup your first Nuxt project with Tailwind

![Screenshot from 2025-01-06 23-45-19](https://github.com/user-attachments/assets/946068ba-bcf1-4adb-8cbe-91b7b67de336)


## 📍 [Setup routing](https://nuxt.com/docs/getting-started/routing)

- Create a `pages` folder at the root. Move `app.vue` file into pages and rename it to `index.vue`. This is going to be the home page of the app. Everything should work the same
- Create a new file `pages/quiz/[quizId].vue`. This will be the page we would be able to share for multi player for examples. 
```pages/quiz/[quizId].vue
<template>
    <div>
        {{ $route.params.quizId }}
    </div>
</template>
```
- If everything worked nagivate to `http://localhost:3000/quiz/awesome-id` You should see the text `awesome-id` 

## 📍 Create pokemon api service to retrieve pokemons

## 📍 Create db.ts

## 📍 Create Pokemon service

## 📍 Update home page

## 📍 Update Quiz page

## 📍 Refactor by creating header component and button

Button classes:

`bg-white text-2xl leading-relaxed border-2 rounded-lg border-slate-400 px-6 py-4 hover:bg-slate-300 hover:text-black first-letter:capitalize`

## 📍 Ideas to improve the project ?

- Improve error handling to have a nicer look and redirect when quiz is not found
- Use a real database
- [Improve responsivness](https://tailwindcss.com/docs/responsive-design)
- Authentication
- Allow external user to join a quiz session
- Improve design
- Have fun 

## USEFUL LINKS:

- [tsnode-poke-package](https://pokenode-ts.vercel.app/)
- [pokeAPI](https://pokeapi.co/docs/v2)
- [Nuxt](https://nuxt.com)
- [Tailwind](https://tailwindcss.com)
- [TailwindUI](https://tailwindui.com/components)
- [Nuxt image Module](https://image.nuxt.com/get-started/installation)
