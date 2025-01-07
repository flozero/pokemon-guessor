# [CUSEC 2025](https://2025.cusec.net/) - Build a Trivia quiz generator with Nuxt and Tailwind
> By Florent Giraud ([LinkedIn](https://www.linkedin.com/in/fgiraud42/))

## FOR THIS WORKSHOP, YOU WILL NEED:

- An IDE (I am using VS Code)
    - Also recommend to install [vscode tailwind plugin](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
    - 
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










