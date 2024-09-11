<template>
    <div class="hero_area">
        <div class="hero_bg_box">
            <div class="bg_img_box">
                <img src="../assets/hero-bg.png" alt="">
            </div>
        </div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <button1 v-on:click="navigateTo('/postC/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a></button1>
        <h1>
            <span2>แก้ไขข้อมูล</span2>
        </h1>
        <form v-on:submit.prevent="editPostC">
            <div class="flexbox">
                <div class="item3">
                    <div class="content3">
                        <div class="text">
                            <p>ชื่อสินค้า:</p>
                            <p>จุดประสงค์:</p>
                            <p>ประเภท:</p>
                            <p>จำนวน:</p>
                            <p>รายละเอียด:</p>
                        </div>
                    </div>
                </div>
                <div class="item4">
                    <div class="content4">
                        <div class="text1">
                            <input type="text" v-model="postC.product_name">
                            <p></p>
                            <select v-model="postC.purpose" required>
                                <option disabled value="จุดประสงค์">จุดประสงค์</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                            <p></p>
                            <select v-model="postC.category" required>
                                <option disabled value="ประเภท">ประเภท</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                            <p></p>
                            <input type="text" v-model="postC.quantity">
                            <p></p>
                            <textarea v-model="postC.detail"></textarea>

                        </div>
                    </div>
                </div>
                <div class="item3">
                    <div class="content3">
                        <div class="text">
                            <a>ชื่อสินค้า:</a>
                            <p></p>
                            <a>จุดประสงค์:</a>
                            <p></p>
                            <a>ประเภท:</a>
                            <p></p>
                            <a>จำนวน:</a>
                            <p></p>
                            <a>รายละเอียด:</a>
                        </div>
                    </div>
                </div>
                <div class="item4">
                    <div class="content4">
                        <div class="text1">
                            <a1>{{ postC.product_name }}</a1>
                            <p></p>
                            <a1>{{ postC.purpose }}</a1>
                            <p></p>
                            <a1>{{ postC.category }}</a1>
                            <p></p>
                            <a1>{{ postC.quantity }}</a1>
                            <p></p>
                            <a1>{{ postC.detail }}</a1>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-center">
                <p><button type="submit">ยืนยันการแก้ไข</button></p>
            </div>
        </form>
    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
export default {
    data() {
        return {
            postC: {
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
        try {
            let personId = this.$route.params.personId
            this.person = (await PersonService.show(personId)).data
            let postCId = this.$route.params.postCId
            this.postC = (await PostCService.show(postCId)).data
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        async editPostC() {
            try {
                await PostCService.put(this.postC)
                this.$router.push({
                    name: 'postC-show'
                })
            } catch (err) {
                console.log(err)
            }
        },
        navigateTo(route) {
            this.$router.push(route)
        },
    },

}
</script>
<style scoped></style>