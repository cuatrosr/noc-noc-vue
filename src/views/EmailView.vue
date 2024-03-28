<template>
    <div>
        <div class="flex justify-center items-center h-screen">
            <h1 class="text-4xl font-bold">Email View</h1>
        </div>
    </div>
</template>

<script>
import { axiosI } from "@/configs/axios.js";
export default {
    name: 'EmailView',
    methods: {
        async verifyEmail() {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');
            const email = params.get('email');
            if (!token || !email) {
                return this.$router.push({ name: "Login" });
            }
            const res = await axiosI.post('/auth/verify-email', {
                email,
                token
            });
            if (res.status == 200) {
                this.$router.push({ name: "ChangePassword" });
            }
        }
    },
    mounted() {
        this.verifyEmail();
    }
}
</script>