import '@/assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi } from 'vuetify/iconsets/mdi-svg'
//import { mdiAccount } from '@mdi/js'
import { md } from 'vuetify/iconsets/md'
import { aliases, fa } from 'vuetify/iconsets/fa-svg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import router from '@/routes/routes'


const vuetify = createVuetify({
	components,
	directives,
	icons: {
	    defaultSet: 'fa',
	    aliases,
	    sets: {
			fa,
			md,
			mdi
	    },
	},
	defaultTheme: 'light'
})
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas) // Include needed solid icons
library.add(far) // Include needed regular icons

/*App error top-level handler*/
app.config.errorHandler = (err) => {
	/* Error handling */
}

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')
