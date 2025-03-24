
    <template #body>
   <Login></Login>
    </template>



<script lang="ts" setup>
import { ref } from "vue";
import Login from "@/mods/auth/Login.vue"
const msg = ref(`Bem vindo ao futuro!`);
</script>

<style scoped></style>
