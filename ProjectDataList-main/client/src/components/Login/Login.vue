<template>
    <div class="hero_area">
        <div class="hero_bg_box">
            <div class="bg_img_box">
                <img src="../assets/hero-bg.png" alt="">
            </div>
        </div>
        <header class="header_section">
            <div class="container-fluid">
                <nav class="navbar navbar-expand-lg custom_nav-container ">
                    <a class="navbar-brand">
                        <span>
                            Finexo
                        </span>
                    </a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav  ">
                            <li class="nav-item">
                                <a class="nav-link" v-on:click="navigateTo('/')">Home</a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link" v-on:click="navigateTo('/login')"> <i class="fa fa-user"
                                        aria-hidden="true"></i>
                                    Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" v-on:click="navigateTo('/person/create')">Signup <span
                                        class="sr-only">(current)</span></a>
                            </li>
                            <form class="form-inline">
                                <button class="btn  my-2 my-sm-0 nav_search-btn" type="submit">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </form>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
        <div class="heading_container heading_center about_section1">
            <h1>
                Log<span>in</span>
            </h1>
        </div>
        <div3>
            <form class="form1" v-on:submit.prevent="onLogin">
                <div class="screen-1">
                    <input class="email" type="text" placeholder="email" v-model="email">
                    <input class="password" type="text" placeholder="password" v-model="password">
                    <div class="section text-center">
                        <p><button type="submit">Login</button></p>
                        <p><a v-on:click="navigateTo('/person/create')" class="link">Create</a></p>
                    </div>
                    <div class="error" v-if="error">{{ error }}</div>
                </div>
            </form>
        </div3>
    </div>
</template>
<script>

import LoginService from '@/services/LoginService'
export default {
    data() {
        return {
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async onLogin() {
            try {
                const response = await LoginService.login({
                    email: this.email,
                    password: this.password
                })

                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.person)

                this.$router.push({
                    path: 'indexs/' + response.data.person.id
                })

            } catch (error) {
                console.log(error)
                this.error = error.response.data.error
                this.email = ''
                this.password = ''

            }
        },
        navigateTo(route) {
            this.$router.push(route)
        }
    }
}
</script>
<style scoped>
.error {
    color: red;
}
</style>