import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md' || 'fa' || 'md'
    },
    theme: {
        themes: {
            light: {
                primary: '#444C5C',
                secondary: '#b0bec5',
                anchor: '#8c9eff',
            }
        }
    }
});
