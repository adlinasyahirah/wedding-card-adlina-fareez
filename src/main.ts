import { createApp } from 'vue'
import './styles/main.css'
import App from './App.vue'
import { reveal } from './directives/reveal'

createApp(App).directive('reveal', reveal).mount('#app')
