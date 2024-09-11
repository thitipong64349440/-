<template>
    <div class="full">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <div v-if="person && person.type === 'shop'">
            <div>
                <button1 v-on:click="navigateTo('/shop/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
                </button1>
            </div>
            <h1>
                <span2>ดูรายละเอียด</span2>
            </h1>
        </div>
        <div v-else>
            <div>
                <button1 v-on:click="navigateTo('/shops/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
                </button1>
            </div>
            <h1>
                <span2>{{ shop.shop_name }}</span2>
            </h1>
        </div>
        <div class="pictures-box1">
            <div class="pictures">
                    <div class="slides" v-for="(shop_img, index) in shopImages" :key="index">
                            <img :src="BASE_URL + shop_img" alt="shop_img">
                    </div>
            </div>
        </div>
        <hr>
        <div class="text_detail">
            <a>ชื่อสินค้า:</a>
            <a1>{{ shop.product_name }}</a1>
            <a>จุดประสงค์:</a>
            <a1>{{ shop.purpose }}</a1>
            <a>ประเภท:</a>
            <a1>{{ shop.category }}</a1>
            <a>รายละเอียด:</a>
            <a1>{{ shop.detail }}</a1>
            <a>จำนวน:</a>
            <a1>{{ shop.quantity }}</a1>
            <a>ราคา:</a>
            <a1>{{ shop.price }}</a1>
            <p></p>
        </div>
    </div>
</template>
<script>
import ShopService from '@/services/ShopService'
import PersonService from '@/services/PersonService'
import PostCService from '@/services/PostCService'
export default {
    data() {
        return {
            BASE_URL: "http://localhost:8081/assets/uploads/",
            postCs: [],
            shop: {
                shop_name: '',
                shop_img: '',
                product_name: '',
                purpose: '',
                category: '',
                detail: '',
                quantity: '',
                price: '',
            },
            person: {
                email: '',
                password: '',
                name: '',
                lastname: '',
                company_name: '',
                shop_name: '',
                address: '',
                tel: '',
                type: ''
            },
        }
    },
    async created() {
        try {
            let personId = this.$route.params.personId
            this.person = (await PersonService.show(personId)).data
            let shopId = this.$route.params.shopId
            this.shop = (await ShopService.show(shopId)).data
            let postCId = this.$route.params.postCId
            this.postC = (await PostCService.show(postCId)).data
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route)
        },
    },
    computed: {
        shopImages() {
            return this.shop.shop_img.split(',')
        },
    }

}
</script>
<style scoped>
.full {
    width: 100vw;
    height: 100vh;
    background-color: #00204a;
}

.full span2 {
    color: #ffffff;
}
</style>