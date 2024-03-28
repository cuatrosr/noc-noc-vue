<template>
    <form @submit.prevent="handleChange" class="space-y-6" action="#" method="POST">
        <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
                <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>

        <div>
            <label for="current_password" class="block text-sm font-medium leading-6 text-gray-900">Current
                Password</label>
            <div class="mt-2">
                <input v-model="current_password" id="current_password" name="current_password" type="password"
                    autocomplete="current-password" required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>

        <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">New Password</label>
            <div class="mt-2">
                <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>

        <div>
            <button type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                in</button>
        </div>
    </form>
</template>

<script>
import { axiosI } from "@/configs/axios.js";
import Swal from "sweetalert2";
export default {
    name: 'ChangePasswordForm',
    data() {
        return {
            email: '',
            password: '',
            current_password: ''
        }
    },
    methods: {
        async handleChange() {
            console.log(this.email, this.password, this.current_password)
            try {
                const res = await axiosI.post('/auth/change-password', {
                    email: this.email,
                    password: this.password,
                    current_password: this.current_password
                });
                if (res.status === 200) {
                    Swal.fire({
                        title: "Success!",
                        text: res.data.message,
                        icon: "success",
                    });
                    this.$router.push({ name: "Login" });
                }
            } catch (error) {
                Swal.fire({
                    title: "Oops!",
                    text: error.response.data.message,
                    icon: "error",
                });
            }
        }
    },
}
</script>
