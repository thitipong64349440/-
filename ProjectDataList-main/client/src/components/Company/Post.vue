<template>
    <div class="hero_area">
        <div class="hero_bg_box">
            <div class="bg_img_box">
                <img src="../assets/hero-bg.png" alt="">
            </div>
        </div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <button1 v-on:click="navigateTo('/indexs/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a></button1>
        <div2 style="display:flex; align-items:center; justify-content:center;">
            <div class="form2">
                <span3>
                    <h1>โพสความต้องการ</h1>
                </span3>
                <form class="post-form" v-on:submit.prevent="createPost">
                    <div class="screen-2">
                        <input class="product" type="text" placeholder="ชื่อสินค้า *" v-model="postC.product_name"required>
                        <input class="quantity" type="text" placeholder="จำนวน" v-model="postC.quantity">
                        <select class="purpose" v-model="postC.purpose">
                            <option disabled value="จุดประสงค์">จุดประสงค์</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        <select class="category" v-model="postC.category">
                            <option disabled value="ประเภท">ประเภท</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        <textarea class="detail" placeholder="รายละเอียด" v-model="postC.detail"></textarea>
                        <a type="text" v-bind="postC.company_name = person.company_name"></a>
                        <div class="button-center">
                            <button type="submit">โพสความต้องการ</button>
                        </div>
                    </div>
                </form>
            </div>
        </div2>
    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
export default {
    data() {
        return {
            postC: {
                company_name: '',
                product_name: '',
                purpose: '',
                category: '',
                detail: '',
                quantity: '',
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
            }
        }
    },
    async created() {
        let personId = this.$route.params.personId
        this.person = (await PersonService.show(personId)).data
    },
    methods: {
        async createPost() {
            try {
                await PostCService.post(this.postC)
                this.$router.push({
                    name: 'postC-show'
                })
            } catch (err) {
                console.log(err)
            }
        },
        navigateTo(route) {
            this.$router.push(route)
        }
    },
}
</script>
<style scoped></style>