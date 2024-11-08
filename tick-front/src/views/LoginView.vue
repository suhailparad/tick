<script setup>
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthenticationStore } from '@/stores/authentication';
import { onMounted } from 'vue';

const authStore = useAuthenticationStore()

const loginWithGoogle=async()=>{
    const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        authStore.storeUser(result.user);
      } catch (error) {
        console.error("Error during login:", error);
      }
}

const logout = async ()=>{ 
    try {
        await signOut(auth);
        this.user = null;
    } catch (error) {
        console.error("Error during logout:", error);
    } 
}

onMounted(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
      } else {
        console.log('no loggin ')
      }
    });
})


</script>

<template>
  <div>
    <button @click="loginWithGoogle()">Login with Google</button>
  </div>
</template>