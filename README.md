# [CUSEC 2025](https://2025.cusec.net/) - Build Fast, Build Fresh: Nuxt and Tailwind - Build a Trivia quiz generator
> By Florent Giraud ([LinkedIn](https://www.linkedin.com/in/fgiraud42/))

## 📍 For this workshop you will need:

- An IDE (I am using VS Code)
    - Also recommend to install [vscode tailwind plugin](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Node.js](https://nodejs.org/en/) installed on your computer
- Git
- A terminal

## Goal of the project 

Design:

<img width="1718" alt="Screenshot 2025-01-10 at 10 52 13 PM" src="https://github.com/user-attachments/assets/f6fa6bc2-f07f-4a61-b106-08e9bb0c9a27" />

Architecture:

<img width="913" alt="Screenshot 2025-01-10 at 10 51 10 PM" src="https://github.com/user-attachments/assets/1f48c544-8349-44d8-92ce-4f72a5921b9f" />

## 📍 Setting up your Nuxt project and TailwindCSS

1. Create a new project 

```javascript
npx nuxi@latest init trivia-quiz-generator
```

``javascript
npm i pokenode-ts
```

2. Install tailwind. You can manually Installed tailwind or you can use Nuxt modules to simplify the setup. I recommend to use as much [NUXT MODULES](https://nuxt.com/modules) as there are a lot of existing modules for a lot of things you may need to speed up your dev.



```javascript
npx nuxi module add @nuxtjs/tailwindcss`
```

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

1. Create a `pages` folder at the root. Move `app.vue` file into pages and rename it to `index.vue`. This is going to be the home page of the app. Everything should work the same

2. Create a new file `pages/quiz/[quizId].vue`. This will be the page we would be able to share for multi player for examples. 
```pages/quiz/[quizId].vue
<template>
    <div>
        {{ $route.params.quizId }}
    </div>
</template>
```

3. If everything worked nagivate to `http://localhost:3000/quiz/awesome-id` You should see the text `awesome-id` 

## 📍 Create shared folder and what we will need inside

### `shared/types/quiz.types.ts`

```typescript
export interface Quiz {
    id: string,
    users: string[],
    created_at: Date
}

export type QuizAPICreateParams = Omit<Quiz, "id" | "created_at">
export type QuizAPIReturn = Quiz
```

### `shared/types/pokemon.types.ts`

```typescript
export interface PokemonAPICreateQuestionReturn {
    question: string,
    possible_answers: string[],
    answer_data: {
        name: string,
        image: string
    }
}
```

### `shared/types/genericReturn.types.ts`

```typescript
export type GenericReturn<T> = {
    data: T | null,
    error: Error | null
}
```

### utils `shared/utils/number.ts`

```typescript
export const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
```

## 📍 Create quiz db.ts `server/database/db.ts`

```typescript
import { GenericReturn } from "~/shared/types/genericReturn.types"
import { Quiz, QuizAPICreateParams } from "~/shared/types/quiz.types"

const quiz: Quiz[] = []

export const db = () => {
  const create = async (data: QuizAPICreateParams): Promise<GenericReturn<QuizAPIReturn>> => {
    const q: Quiz = {
      id: new Date().getTime().toString(),
      created_at: new Date(),
      ...data
    }

    quiz.push(q)

    return {
      data: q,
      error: null
    }
  }

  const get = async (quiz_id: string): Promise<GenericReturn<Quiz>> => {
    const q = quiz.find((q) => q.id === quiz_id)
    return {
      data: q ?? null,
      error: !q ? new Error("quiz not found") : null
    }
  }

  return {
    create,
    get
  }
}
```

## 📍 Create Quiz api endpoints `server/api/index.post.ts`

```typescript
import { db } from "~/server/database/db"
import { GenericReturn } from "~/shared/types/genericReturn.types"
import { QuizAPIReturn } from "~/shared/types/quiz.types"

export default defineEventHandler(async (): Promise<GenericReturn<QuizAPIReturn>> => {
    const { data: quiz_data, error: quiz_error } = await db().create({
        "users": ["1"],
    })

    return {
        data: quiz_data,
        error: quiz_error
    }
  })
```

## Update home page to now create a Quiz and redirect the user to the quiz page `/pages/index.vue`

```html
<header class="bg-slate-800 py-10 flex justify-between items-center text-white px-4 text-4xl ">
    <div class="tracking-wide font-bold text-center ">
        Pokemon Guessor
    </div>
</header>
<div class="mx-auto max-w-2xl py-32">
    <div class="text-center">
        <h1 class="text-balance text-5xl font-semibold tracking-tight text-gray-900">Pokemon Guessor!</h1>
        <p class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Show me Your knowledge about Pokemons.</p>
        <button type="button" @click="createQuiz" class="mt-4 bg-white text-2xl leading-relaxed border-2 rounded-lg border-slate-400 px-6 py-4 hover:bg-slate-300 hover:text-black first-letter:capitalize">Play a Game</button>
        <div v-if="error_api" class="mt-10">
            {{ error_api }}
        </div>
    </div>
</div>
```

```typescript
<script setup lang="ts">
const error_api = ref<string | null>(null)

const createQuiz = async () => {
  try {
    const { data: quiz, error } = await $fetch('/api/quiz', {
      "method": "POST"
    })
    if (!quiz || error) return error_api.value = error?.message ?? "error when creating the quiz"
    
    const router = useRouter()
    router.push(`/quiz/${quiz.id}`)

  } catch(e) {
    error_api.value = e as string
  }
}
</script>
```

if everything is Done well now when you click on the button you should be redirect to the quiz page.


## 📍 Create pokemon api service to retrieve pokemons and build the quiz questions `/server/services/pokemon.ts`

```typescript
import { EventHandlerRequest, H3Event } from "h3"
import { PokemonClient } from "pokenode-ts";
import { GenericReturn } from "~/shared/types/genericReturn.types";
import { PokemonAPICreateQuestionReturn } from "~/shared/types/pokemon.types";
import { randomNumber } from "~/shared/utils/number";

let pokemons: string[] = []
let pokemons_informations: {
    [key: string]: PokemonAPICreateQuestionReturn
} = {}

const POKEMON_LIMITS = 151

export const usePokemonAPI = ((event: H3Event<EventHandlerRequest>) => {
    const api = new PokemonClient();

    const createAnswers = (pokemon_name_to_exclude: string) => {
    }

    const createOneQuestion = async (): Promise<GenericReturn<PokemonAPICreateQuestionReturn>> => {
    }

    return {
        createOneQuestion
    }
})
```

- createOneQuestion function

```typescript
 if (!pokemons.length) {
            try {
                const data = await api.listPokemons(1, POKEMON_LIMITS)
                pokemons = data.results.map(p => p.name)
            } catch(e){
                return {
                    error: new Error("issue retrieving pokemon list"),
                    data: null
                }
            }
        }

        try {
            const random_pokemon_name = pokemons[randomNumber(0, 150)]

            if (typeof pokemons_informations[random_pokemon_name] !== "undefined") {
                return {
                    data: pokemons_informations[random_pokemon_name],
                    error: null
                }
            }
            const pokemon_species_data = await api.getPokemonSpeciesByName(random_pokemon_name)
            const pokemon_data = await api.getPokemonByName(random_pokemon_name)
            let question = pokemon_species_data.flavor_text_entries.filter(e => e.language.name === "en")[0].flavor_text
            question = question.replaceAll(random_pokemon_name, '...')

            pokemons_informations[random_pokemon_name] = {
                question,
                possible_answers: createAnswers(random_pokemon_name),
                answer_data: {
                    name: pokemon_data.name,
                    image: pokemon_data.sprites.other?.home.front_default ?? "",
                }
            }

            return {
                data: pokemons_informations[random_pokemon_name],
                error: null
            }
            
        } catch(e) {
            return {
                error: new Error("error generating questions"),
                data: null
            }
        }
```

- createAnswers function

```typescript
let possible_answers: string[] = [];

while (possible_answers.length < 3) {
    let random_answer = pokemons[randomNumber(0, POKEMON_LIMITS - 1)];
    if (
        random_answer !== pokemon_name_to_exclude && 
        !possible_answers.includes(random_answer)
    ) {
        possible_answers.push(random_answer)
    }
}

const current_pokemon_postion_in_response = randomNumber(0, 4)
possible_answers.splice(current_pokemon_postion_in_response, 0, pokemon_name_to_exclude)
return possible_answers
```

## 📍 Create endpoing that will check if the quiz is there and return the created questions `/server/api/quiz/[quiz_id]/index.get.ts`

```typescript
import { db } from "~/server/database/db"
import { usePokemonAPI } from "~/server/services/pokemon"
import { GenericReturn } from "~/shared/types/genericReturn.types"
import { PokemonAPICreateQuestionReturn } from "~/shared/types/pokemon.types"

export default defineEventHandler(async (event): Promise<GenericReturn<PokemonAPICreateQuestionReturn>> => {
    const pokemon_api = usePokemonAPI(event)
    const quiz_id = getRouterParam(event, "quiz_id")
    const { data: quiz, error: quiz_error } = await db().get(quiz_id || "")

    if (!quiz || quiz_error) {
        return {
            data: null,
            error: quiz_error
        }
    }

    const { 
        data: question,
        error: question_error
    } = await pokemon_api.createOneQuestion()

    return {
        data: question ?? null,
        error: question_error ?? null
    }
  })
```

## 📍 Update Quiz page `/pages/quiz/[quizId].vue`

- basic setup

```typescript
<script lang="ts" setup>
const route = useRoute()
const fail_number = ref(0)
const success_number = ref(0)
const { data, refresh } = await useLazyFetch(`/api/quiz/${route.params.quizId}`)

const pokemon_name_selected = ref<string | null>(null)
const answer_status = ref<"none" | "pending" | "error" | "success">("none")

const fakeTimer = () => new Promise((resolve) => setTimeout(() => resolve(""), 2000))

const checkAnswer = async (pokemon_name: string) => {
}

const resetAndRetrieveNewQuestion = async () => {
    answer_status.value = 'none'
    pokemon_name_selected.value = null
    await refresh()
}
</script>
```

- update template to show the question

```typescript
<header class="bg-slate-800 py-10 flex justify-between items-center text-white px-4 text-4xl ">
    <div class="tracking-wide font-bold text-center ">
        Pokemon Guessor
    </div>
    <div class="flex gap-4">
        <div class="text-red-400"> 
            Fail: {{  fail_number }}
        </div>
        <div class=" text-green-400"> 
            Success: {{  success_number }}
        </div>
    </div>
</header>
```

```typescript
<main class="px-4 grid grid-cols-2 gap-8 mt-4">
    <template v-if="data?.error">
        ERROR: {{ data?.error }}
    </template>
    <template v-else>
        
        <div class="grid grid-cols-1 gap-4">
            <h1 class="text-4xl font-semibold leading-loose">
                {{  data?.data?.question }}
            </h1>
            <button
                :disabled="!!pokemon_name_selected"
                :class="pokemon_name_selected === pokemon_name ? '!bg-slate-300 !text-black' : ''"
                type="button"
                class="w-full bg-white text-2xl leading-relaxed border-2 rounded-lg border-slate-400 py-4 hover:bg-slate-300 hover:text-black first-letter:capitalize"
                v-for="(pokemon_name, index) in data?.data?.possible_answers" :key="index"
                @click="checkAnswer(pokemon_name)"
            >
                {{ pokemon_name }}
            </button>
            <button v-if="answer_status === 'error' || answer_status === 'success'" @click="resetAndRetrieveNewQuestion" class="text-2xl bg-black text-white leading-relaxed border-2 rounded-lg border-slate-400 py-4 hover:bg-slate-300 hover:text-black first-letter:capitalize">Next Question</button>
        </div>
    </template>
    <div class="bg-slate-200 relative">
        <template v-if="answer_status !== 'error' && answer_status !=='success'">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]" :class="answer_status === 'pending' ? 'animate-pulse' : ''">
                <div class=" bg-rose-500 w-[200px] pt-[100px] rounded-t-full"></div>
                <div class="relative">
                    <div class="absolute w-[200px] h-2 bg-slate-700"></div>
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] border-8 bg-white border-slate-700 rounded-full"></div>
                </div>
                <div class=" bg-white w-[200px] pb-[100px] rounded-b-full"></div>
            </div>
        </template>
        <template v-else>
            <div class="py-10 text-center text-white" :class="answer_status === 'success' ? 'bg-green-400 ' : 'bg-red-400'">
                {{ answer_status === 'success' ? 'Success' : 'Failure' }}
            </div>
            <div class="flex justify-center items-center flex-col gap-4 mt-8">
                <h2 class="text-4xl text-black font-semibold">{{  data?.data?.answer_data.name }}</h2>
                <NuxtImg :src="data?.data?.answer_data.image"/>
            </div>
        </template>
    </div>
</main>
```

- Update check Answer function

```typescript
if (pokemon_name_selected.value) return
const question = data.value?.data

pokemon_name_selected.value = pokemon_name
answer_status.value = "pending"
await fakeTimer()

if (question?.answer_data.name === pokemon_name) {
    answer_status.value = "success"
    success_number.value = success_number.value + 1
} else {
    answer_status.value = "error"
    fail_number.value = fail_number.value + 1
}
```


## 📍 Refactor by creating header component and button

## 📍 Ideas to improve the project ?

- Make the quiz api more quiz agnostic
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
