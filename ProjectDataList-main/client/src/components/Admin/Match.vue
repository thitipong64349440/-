<template>
    <div class="about_section layout_padding5">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <button1 v-on:click="navigateTo('/shops/' + person.id + '/' + postC.id)"><a><i
                    class="bi bi-caret-left">กลับ</i></a></button1>
        <span3>
            <h1>ยืนยันการจับคู่</h1>
        </span3>
        <form v-on:submit.prevent="match">
            <div class="flexbox">
                <div class="item">
                    <div class="content">
                        <div><a>ชื่อหน่วยงาน:</a>
                            <a1>{{ postC.company_name }}</a1>
                        </div>
                        <div><a>ชื่อสินค้า:</a>
                            <a1>{{ postC.product_name }}</a1>
                        </div>
                        <div><a>จุดประสงค์:</a>
                            <a1>{{ postC.purpose }}</a1>
                        </div>
                        <div><a>ประเภท:</a>
                            <a1>{{ postC.category }}</a1>
                        </div>
                        <div><a>รายละเอียด:</a>
                            <a1>{{ postC.detail }}</a1>
                        </div>
                        <a type="text" v-bind="postC.shop_name = shop.shop_name"></a>
                        <a type="text" v-bind="postC.shopId = shop.id"></a>
                    </div>
                </div>
                <div class="item1">
                    <div class="content1">
                        <i class="bi bi-activity pulse"></i>
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <div><a>ชื่อหน่วยงาน:</a>
                            <a1>{{ shop.shop_name }}</a1>
                        </div>
                        <div><a>ชื่อสินค้า:</a>
                            <a1>{{ shop.product_name }}</a1>
                        </div>
                        <div><a>จุดประสงค์:</a>
                            <a1>{{ shop.purpose }}</a1>
                        </div>
                        <div><a>ประเภท:</a>
                            <a1>{{ shop.category }}</a1>
                        </div>
                        <div><a>รายละเอียด:</a>
                            <a1>{{ shop.detail }}</a1>
                        </div>
                        <div><a>จำนวน:</a>
                            <a1>{{ shop.quantity }}</a1>
                        </div>
                        <div><a>ราคา:</a>
                            <a1>{{ shop.price }}</a1>
                        </div>
                        <a type="text" v-bind="shop.company_name = postC.company_name"></a>
                        <a type="text" v-bind="shop.companyId = postC.id"></a>
                    </div>
                </div>
            </div>
            <div class="button-center">
                <button5 type="submit">ยืนยัน</button5>
            </div>
        </form>
    </div>
</template>
<script>
import PostCService from '@/services/PostCService'
import PersonService from '@/services/PersonService'
import ShopService from '@/services/ShopService'
export default {
    data() {
        return {
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
            postC: null,
            shop: null
        }
    },
    // แสดงข้อมูล
    async created() {
        let personId = this.$route.params.personId
        let postCId = this.$route.params.postCId
        let shopId = this.$route.params.shopId
        this.person = (await PersonService.show(personId)).data
        this.postC = (await PostCService.show(postCId)).data
        this.shop = (await ShopService.show(shopId)).data
    },
    methods: {
        async match() {
            try {
                await ShopService.put(this.shop)
                await PostCService.put(this.postC)
                this.$router.push({
                    name: 'indexs'
                })
            } catch (err) {
                console.log(err)
            }
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        // ลบข้อมูล
        async deletePost_Company(postC) {
            let result = confirm("want to delete?")
            if (result) {
                try {
                    await PostCService.delete(postC)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.postCs = (await PostCService.index()).data
        },
    },


    catch(error) {
        console.log(error)
    }
}
</script>
<style scoped></style>
