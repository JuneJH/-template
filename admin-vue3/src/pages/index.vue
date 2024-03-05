<template>
    <h1>this is home page;</h1>
    <button @click="setUser">设置用户信息</button>
    
</template>

<script setup lang="ts">
import { useUser } from '../model';

const store = useUser();

const setUser = () => {
    store.setUser({
        name: "JuneJH",
        age: Math.ceil(Math.random() * 20 + 10),
        sex: "男",
        habbit: ["足球", "电影"]
    })
}


</script>