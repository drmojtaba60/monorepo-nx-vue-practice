import "@shared/ui-styles";
import './styles.less';
import { useTheme } from "@shared/ui-styles";
import { createApp } from 'vue';
import App from './app/App.vue';




const { setTheme } = useTheme();
setTheme("forest");

const app = createApp(App);
app.mount('#root');
