<template>
    <div class="container">
        <div class="header-container">
            <div class="left">
                <router-link to="/">首页</router-link>
                <router-link to="/about">关于</router-link>
            </div>

            <div class="right">
                <div v-if="store.user">
                    <span>{{ store.user.name }}</span>
                    <span>{{ store.user.age }}</span>
                    <span>{{ store.user.sex }}</span>
                    <div>
                        <span>爱好：</span>
                        <span v-for="(love, i) in store.user.habbit">{{ love }}{{ i === store.user.habbit.length - 1 ?
                    "" : "、" }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-container">
            <router-view></router-view>
        </div>
        <div class="footer-container">@copy right junejh</div>
    </div>
</template>

<script setup lang="ts">
import { useUser } from '../model';

const store = useUser();

</script>

<style>
.container {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;
    height: 60px;
    background-color: orange;
}

.left {
    width: 100px;
    display: flex;
    justify-content: space-around;
}

.right {
    color: #fff;
}

.right>div>span {
    margin: 5px;
}

.right>div div {
    margin-top: 5px;
}

.content-container {
    flex: 1;
}

.footer-container {
    height: 30px;
    text-align: center;

}
</style>