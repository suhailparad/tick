
<script setup>
import GoogleLoginButton from '@/components/GoogleLoginButton.vue';
import { auth } from '../firebase';
import { signInWithEmailAndPassword,onAuthStateChanged, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref } from 'vue';
import router from '@/router';
import { notify } from "@kyvg/vue3-notification";
 

const email = ref('');
const password = ref('');
const type=ref("password")
const inputValueVisible=ref(false)

const toggleType= ()=>{
  type.value='text'
  inputValueVisible.value=true
}

const signInWithGoogle = async()=>{ 
  const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      notify({
        // title: "Authorization",
        text: "Logged in successfully!",
        type: 'success',
      }); 
      router.push('/login');
    } catch (error) {
      console.error("Error during login:", error);
    }
} 

const signIn = async()=>{  
  try {    
      await signInWithEmailAndPassword(auth,email.value, password.value);
      notify({
        // title: "Authorization",
        text: "Logged in successfully!",
        type: 'success',
      }); 
      router.push('/login');
    } catch (error) {
      // console.error("Error during login:", error);
      notify({
        // title: "Authorization",
        text: "Login attempt failed!",
        type: 'error',
      }); 
    }
}

</script>

<template>
  <div class="flex min-h-screen w-full flex-wrap items-stretch bg-white dark:bg-gray-800 max-md:pb-20 max-md:pt-32">
    <div class="grow md:flex md:w-1/2 md:flex-col md:items-center md:justify-center md:py-20">
        <div class="w-full px-4 text-center text-xs lg:w-1/2">
            <h1 class="mb-8 text-2xl font-bold text-gray-800 dark:text-white">Welcome Back !</h1>
            <p class="mb-6 text-gray-600 dark:text-gray-400">Access your account to explore our amazing features.</p>
            <div class="flex flex-col gap-6" novalidate="novalidate">
                <input id="plan" type="hidden" value="" name="plan">

                <div class="relative">
                    <label class="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200 mb-3" for="email">
                        <span class="">Email Address</span>
                    </label>
                    <input id="email" class="block peer w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 placeholder-gray-400 transition-colors focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500" v-model="email" type="email" placeholder="you@example.com">
                </div>

                <div class="relative">
                    <label class="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200 mb-3" for="password">
                        <span class="">Password</span>
                    </label>
                    <div class="relative">
                        <input id="password" class="block peer w-full px-4 py-3 border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 placeholder-gray-400 transition-colors focus:border-indigo-500 focus:outline-0 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500" v-model="password" :type="type" placeholder="Your password">
                        <button class="lqd-show-password absolute right-3 top-1/2 z-10 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center rounded transition-colors hover:bg-gray-200 dark:hover:bg-gray-600" type="button" @click="toggleType()">
                            <!-- <svg stroke-width="1.5" :class="inputValueVisible ? 'hidden' : ''" class="w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                            </svg>
                            <svg stroke-width="1.5" :class="inputValueVisible ? 'block' : 'hidden'" class="hidden w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path>
                                <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path>
                                <path d="M3 3l18 18"></path>
                            </svg> -->
                        </button>
                    </div>
                </div>

                <div class="my-2 flex justify-between gap-2">
                    <div class="grow">
                        <div class="relative">
                            <label class="flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200" for="remember">
                                <input id="remember" class="peer rounded border-gray-300 dark:border-gray-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500" name="remember" type="checkbox">
                                <span class="">Remember me</span>
                            </label>
                        </div>
                    </div>
                    <div class="text-right">
                        <a class="text-indigo-600 dark:text-indigo-400" href="/forgot-password">Forgot Password?</a>
                    </div>
                </div>

                <input class="hidden" id="recaptcha" value="0">
                <button @click="signIn" class="lqd-btn group inline-flex items-center justify-center gap-1.5 font-medium rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl lqd-btn-primary bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:bg-indigo-700 focus-visible:shadow-indigo-300/10 px-5 py-3" id="LoginFormButton">
                    Sign in
                </button>

                <div class="text-gray-600 dark:text-gray-400 border-t-[1px] border-gray-600 pt-5">
                    <GoogleLoginButton @click="signInWithGoogle" />
                </div>

            </div>

            <div class="mt-20 text-gray-600 dark:text-gray-400">
                Don't have an account yet? <RouterLink class="font-medium text-indigo-600 underline" to="/register">Register</RouterLink> 
            </div>
        </div>
    </div>

    <div class="hidden flex-col justify-center overflow-hidden bg-cover bg-center md:flex md:w-1/2"
        style="background-image: url(https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)">
    </div>

</div>
</template>