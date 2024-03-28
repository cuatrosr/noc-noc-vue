<template>
    <form @submit.prevent="handleRegister" class="space-y-6" action="#" method="POST">
        <div>
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div class="mt-2">
                <input v-model="name" id="name" name="name" type="text" autocomplete="name" required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>

        <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
                <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>

        <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
                <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>

        <div>
            <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">Confirm your
                Password</label>
            <div class="mt-2">
                <input v-model="password_confirmation" id="password_confirmation" name="password_confirmation"
                    type="password" autocomplete="current-password" required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    :class="{ 'ring-red-500': password !== password_confirmation && password_confirmation !== '' }" />
                <p v-if="password !== password_confirmation && password_confirmation !== ''"
                    class="mt-1 text-sm text-red-500">Passwords do not match.</p>
            </div>
        </div>

        <div>
            <label for="role" class="block text-sm font-medium leading-6 text-gray-900">Role</label>
            <div class="mt-2">
                <select v-model="role" id="role" name="role" required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
        </div>

        <div>
            <button :disabled="password !== password_confirmation" type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
        </div>
    </form>
</template>

<script>
import { axiosI } from "@/configs/axios.js";
import Swal from "sweetalert2";
export default {
    name: 'RegisterForm',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            role: ''
        }
    },
    methods: {
        async handleRegister() {
            try {
                const res = await axiosI.post('/auth/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                    role: this.role
                });
                if (res.status == 200) {
                    Swal.fire({
                        title: "Success!",
                        text: res.data.message,
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Oops!",
                        text: res.data.message || "Something went wrong!",
                        icon: "error",
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Oops!",
                    text: error.response.data.message || "Something went wrong!",
                    icon: "error",
                });
            }
        }
    },
}
</script>
