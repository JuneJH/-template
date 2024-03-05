import { defineStore } from 'pinia';
import { ref } from 'vue';


export interface IUser {
    name: string
    age: number
    sex: string
    habbit: string[]
}

const useUser = defineStore("user", () => {
    const user = ref<IUser>();

    function setUser(u: IUser) {
        user.value = u;
    }

    return {
        user,
        setUser
    }

})

export default useUser;