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
                            Delcom
                        </span>
                    </a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" v-on:click="navigateTo('/indexs/' + person.id)">หน้าหลัก</a><span
                                    class="sr-only">(current)</span>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link2" v-on:click="navigateTo('/replyA/' + person.id)">
                                    <a1>{{ person.name }}</a1><span class="sr-only"></span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link3" v-on:click="logout">
                                    <a1>Logout</a1>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
        <section class="service_section layout_padding">
            <div class="service_container">
                <div class="container ">
                    <div class="row">
                        <div class="col-md-6 ">
                            <div class="box ">
                                <div class="img-box">
                                    <img src="../assets/user.png" alt="">
                                </div>
                                <div class="detail-box">
                                    <h5>
                                        คุยกับหน่วยงานและร้านค้า
                                    </h5>
                                    <p>
                                        การแจ้งเหตุต่างๆ หรือการแนะนำให้กับทางหน่วยงานและร้านค้า
                                    </p>
                                    <button v-on:click="navigateTo('/chatA/' + person.id)">พูดคุย</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 ">
                            <div class="box ">
                                <div class="img-box">
                                    <img src="../assets/online-shop.png" alt="">
                                </div>
                                <div class="detail-box">
                                    <h5>
                                        ประวัติการคุย
                                    </h5>
                                    <p>
                                        ประวัติการคอมเมนต์ของหน่วยงานและร้านค้า
                                    </p>
                                    <button v-on:click="navigateTo('/chatH/' + person.id)">ประวัติการคุย</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
import ShopService from '@/services/ShopService'
import { mapState } from 'vuex';
import Api from '@/services/Api'

export default {

    data() {
        return {
            person: null,
            shops: [],
            postCs: []
        }
    },
    computed: {
        ...mapState({
            userType: state => state.person.type
        })
    },
    async created() {
        this.shops = (await ShopService.index()).data
        this.postCs = (await PostCService.index()).data
        let personId = this.$route.params.personId
        this.person = (await PersonService.show(personId)).data
    },
    massage: '',
    methods: {
        navigateTo(route) {
            this.$router.push(route)
        },
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push({
                name: 'login'
            })
        }
    }
}
</script>