<template>
    <div class="hero_area">
        <div class="hero_bg_box">
            <div class="bg_img_box">
                <img src="./assets/hero-bg.png" alt="">
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
                            <div v-if="person && person.type === 'company'">
                                <li class="nav-item active">
                                    <a class="nav-link" v-on:click="navigateTo('/edit/' + person.id)">
                                        {{ person.name }}<span class="sr-only">(current)</span>
                                    </a>
                                </li>
                            </div>
                            <div v-else-if="person && person.type === 'shop'">
                                <li class="nav-item active">
                                    <a class="nav-link1" v-on:click="navigateTo('/edit/' + person.id)">
                                        <a1>{{ person.name }}</a1><span class="sr-only">(current)</span>
                                    </a>
                                </li>
                            </div>
                            <div v-else>
                                <li class="nav-item">
                                    <a class="nav-link2" v-on:click="navigateTo('/person/create')">
                                        <a1>{{ person.name }}</a1><span class="sr-only"></span>
                                    </a>
                                </li>
                            </div>
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
        <div2
            style=" margin-left: 30%; margin-right: 30%; background-color: white; border-radius: 20px 20px 20px 20px;">
            <div class="edituser" v-if="person && person.type === 'company'">
                <h1>{{ person.company_name }}</h1>
                <div v-if="!isMessaging && hasMatchedMessage(person)">
                    <button4 style="float: right; margin-right: 10px;" @click="toggleMessage">ข้อความจาก Admin</button4>
                </div>
            </div>
            <div class="edituser" v-else>
                <h1>{{ person.shop_name }}</h1>
                <div v-if="!isMessaging && hasMatchedMessage(person)">
                    <button4 style="float: right; margin-right: 10px;" @click="toggleMessage">ข้อความจาก Admin</button4>
                </div>
            </div>
            <form v-if="!isMessaging" v-on:submit.prevent="create">
                <div v-if="!isEditing">
                    <div class="eu">
                        <a>ชื่อ-นามสกุล:</a>
                        <h4>{{ person.name }} {{ person.lastname }}</h4>
                        <p></p>
                        <a>อีเมล:</a>
                        <h4>{{ person.email }}</h4>
                        <p></p>
                        <a>รหัสผ่าน:</a>
                        <h4>{{ maskedPassword }}</h4>
                        <p></p>
                        <a>ที่อยู่:</a>
                        <h4>{{ person.address }}</h4>
                        <p></p>
                        <a>เบอร์ติดต่อ:</a>
                        <h4>{{ person.tel }}</h4>
                    </div>
                </div>
                <div v-if="isEditing">
                    <div class="eu">
                        <a>ชื่อ-นามสกุล:</a>
                        <p></p>
                        <input v-model="person.name" type="text" /><input v-model="person.lastname" type="text" />
                        <p></p>
                        <a>รหัสผ่าน:</a>
                        <p></p>
                        <input v-model="person.password" type="password" />
                        <p></p>
                        <a>ที่อยู่:</a>
                        <p></p>
                        <input v-model="person.address" type="text" />
                        <p></p>
                        <a>เบอร์ติดต่อ:</a>
                        <p></p>
                        <input v-model="person.tel" type="text" />
                    </div>
                </div>
                <div class="button-center">
                    <button @click="toggleEditing">{{ isEditing ? 'Save' : 'Edit' }}</button>
                </div>
            </form>
            <form v-if="isMessaging" v-on:submit.prevent="createMessage">
                <div v-if="person && person.type === 'company'">
                    <div v-for="message in messages" v-bind:key="message.id"
                        v-if="person.company_name === message.company_name && message.type === null && message.personId != person.id">
                        <div class="message_text">
                            <h5 style="color: black; margin-left: 20px;">{{ message.comment }}</h5>
                        </div>
                    </div>
                </div>
                <div v-if="person && person.type === 'shop'">
                    <div v-for="message in messages" v-bind:key="message.id"
                        v-if="person.shop_name === message.shop_name && message.type === null && message.personId != person.id">
                        <div class="message_text">
                            <h5 style="color: black; margin-left: 20px;">{{ message.comment }}</h5>
                        </div>
                    </div>
                </div>
                <div class="message_box" v-if="!isSend">
                    <textarea style="margin-left: 70px;" v-model="message.comment" placeholder="ข้อความ"></textarea>
                    <button style="margin-left: 20px;" type="submit">ส่ง</button>
                </div>
                <div class="message" v-else>
                    <div class="hr1"></div>
                    <div class="message_text">
                        <h3>ส่งข้อความสําเร็จ</h3>
                    </div>
                </div>
            </form>
            <button v-if="isSend" @click="resetMessage">ส่งใหม่</button>
            <button style="float: right; margin: 20px;" v-if="isMessaging" @click="toggleMessage">Back</button>
        </div2>
    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
import ShopService from '@/services/ShopService'
import MessageService from '@/services/MessageService';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            person: null,
            shops: [],
            postCs: [],
            messages: [],
            message: {
                company_name: '',
                product_name: '',
                comment: '',
                shop_name: '',
                personId: '',
                type: ''
            },
            isEditing: false,
            isMessaging: false,
            isSend: false,
        }
    },
    computed: {
        maskedPassword() {
            return this.person.password.slice(0, 3) + this.person.password.slice(3).replace(/./g, '*');
        }
    },
    async created() {
        this.shops = (await ShopService.index()).data
        this.postCs = (await PostCService.index()).data
        this.messages = (await MessageService.index()).data
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
        },
        toggleEditing() {
            this.isEditing = !this.isEditing
        },
        hasMatchedMessage(person) {
            if (this.person.type === 'company') {
                return this.messages.some(message => message.company_name === person.company_name)
            } else {
                return this.messages.some(message => message.shop_name === person.shop_name)
            }
        },
        toggleMessage() {
            this.isMessaging = !this.isMessaging
        },
        async createMessage() {
            this.message.personId = this.person.id
            // this.message.postCId = this.postC.id
            // this.message.company_name = this.postC.company_name
            // this.message.product_name = this.postC.product_name
            this.message.type = this.person.type
            if (this.person.type === 'company') {
                this.message.company_name = this.person.company_name
            } else {
                this.message.shop_name = this.person.shop_name
            }
            try {
                await MessageService.post(this.message)
                // this.$router.push({
                //     path: '/indexs/' + this.person.id
                // })
            } catch (err) {
                console.log(err)
            }
            this.isSend = !this.isSend
        },
        resetMessage() {
            this.isSend = !this.isSend
            this.message = {
                company_name: '',
                postCId: '',
                product_name: '',
                comment: '',
                shop_name: '',
                shopId: '',
                personId: '',
                type: ''
            }
        }
    },
}
</script>
<style>
.ba{
    
}
</style>