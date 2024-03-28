<template>
    <Nav :userData="userData" :current="current" />
</template>

<script>
import { axiosI } from "@/configs/axios.js";
import Nav from '@/components/Nav.vue';
export default {
    name: 'HomeView',
    components: {
        Nav
    },
    data() {
        return {
            userData: {},
            current: 'Tasks'
        }
    },
    created() {
        this.fetchUserData();
    },
    methods: {
        async fetchUserData() {
            try {
                const response = await axiosI.post('/auth/me');
                this.userData = response.data;
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>