// https://nuxt.com/docs/api/configuration/nuxt-config
import type {NuxtPage} from '@nuxt/schema'
import {routes} from "./routes";
import router from "#app/plugins/router";

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},

    hooks: {
        'pages:extend'(pages) {
            routes.forEach(route => {
                pages.push(route)
            });

            // remove routes
            function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
                const pagesToRemove: NuxtPage[] = []
                for (const page of pages) {
                    if (page.file && pattern.test(page.file)) {
                        pagesToRemove.push(page)
                    } else {
                        removePagesMatching(pattern, page.children)
                    }
                }
                for (const page of pagesToRemove) {
                    pages.splice(pages.indexOf(page), 1)
                }
            }

            removePagesMatching(/\.ts$/, pages)
        }
    },
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=block",
                },
                {
                    rel:'stylesheet',
                    href:"https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
                }
            ],
        }
    },
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.NUXT_API_BASE_URL
        }
    },
    routeRules:{
        '/login':{ssr:false},
        '/cart':{ssr:false},
        '/order':{ssr:false},
        '/signup':{ssr:false},
    }
})