import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const counterStore = defineStore('counter', () => {
    const user = ref({
        name: 'andrew ne',
        email: '',
    })
    const product = ref({
        listItem: [],
        listCategory: [],
        currentPage: 1,
        totalItem: 0,
        currentCategory: "",
        inputSearch: "",
        listCartItem:[],
        listOrder:[],
        billOrder:null,
    })

  return { user, product };
})
