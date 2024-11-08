import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore('user', () => {
  const user = ref({})
    
  function storeUser(_user){
    user.value = _user
  }

  function clearUser(){
    user.value = {}
  }

  return { user,storeUser,clearUser }
},{
  persist:true,
})
