<template>
    <div class="about_section">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <div>
            <button1 v-on:click="navigateTo('/shop/' + person.id)"><a><i class="bi bi-caret-left">กลับ</i></a>
            </button1>
        </div>
        <h1>
            <span2>แก้ไขข้อมูล</span2>
        </h1>
        <form enctype="multipart/form-data" v-on:submit.prevent="editShop" style=" padding: 20px;" novalidate>
            <div style=" padding: 20px 300px;">
                <div class="dropbox">
                    <input type="file" multiple :name="uploadFieldName" :disabled="isSaving"
                        @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                        accept="image/*" class="input-file">
                    <p>
                        Drag your file(s) here to begin<br> or click to browse
                    </p>
                </div>
            </div>
            <div class="pictures-box">
                <ul class="pictures">
                    <div v-if="shop.shop_img != null || shop.shop_img != []">
                        <li v-for="(shop_img, index) in shopImages" :key="index">
                            <img :src="BASE_URL + shop_img" alt="shop_img">
                            <button1 v-on:click="deleteImg(shop_img)">ลบ</button1>
                            <button v-on:click.prevent="useThumbnail(shop_img)">ตั้งรูปหน้าปก</button>
                        </li>
                    </div>
                    <li v-for="picture in pictures" v-bind:key="picture.id">
                        <img style="margin-bottom:5px;" :src="BASE_URL + picture.name" alt="picture image">
                        <button1 v-on:click="deletePicture(picture)">ลบ</button1>
                        <button v-on:click.prevent="useThumbnail(picture.name)">ตั้งรูปหน้าปก</button>
                    </li>
                </ul>
            </div>
            <div class="screen-2"></div>
            <div class="flexbox">
                <div class="item3">
                    <div class="content3">
                        <div class="text">
                            <p>ชื่อสินค้า:</p>
                            <p>จุดประสงค์:</p>
                            <p>ประเภท:</p>
                            <p>จำนวน:</p>
                            <p>ราคา:</p>
                            <p>รายละเอียด:</p>
                        </div>
                    </div>
                </div>
                <div class="item4">
                    <div class="content4">
                        <div class="text1">
                            <input type="text" v-model="shop.product_name">
                            <p></p>
                            <select v-model="shop.purpose" required>
                                <option disabled value="จุดประสงค์">จุดประสงค์</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                            <p></p>
                            <select v-model="shop.category" required>
                                <option disabled value="ประเภท">ประเภท</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                            <p></p>
                            <input type="text" v-model="shop.quantity">
                            <p></p>
                            <input type="text" v-model="shop.price">
                            <p></p>
                            <textarea v-model="shop.detail"></textarea>
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
import ShopService from '@/services/ShopService'
import PersonService from '@/services/PersonService'
import UploadImage from '@/services/UploadImage'
const STATUS_INITIAL = 0,
    STATUS_SAVING = 1,
    STATUS_SUCCESS = 2,
    STATUS_FAILED = 3;
export default {
    data() {
        return {
            BASE_URL: "http://localhost:8081/assets/uploads/",
            error: null,
            uploadError: null,
            currentStatus: null,
            uploadFieldName: "userPhoto",
            uploadedFileNames: [],
            pic_name: [],
            pictures: [],
            pictureIndex: 0,
            shop: {
                product_name: '',
                purpose: '',
                category: '',
                detail: '',
                quantity: '',
                price: '',
                shop_img: null,
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
            let shopId = this.$route.params.shopId
            this.shop = (await ShopService.show(shopId)).data
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        async editShop() {
            for (let index = 0; index < this.pictures.length; index++) {
                this.pic_name.push(this.pictures[index].name)
            }
            this.shopImages.forEach(shopImage => {
                let found = false
                for (let index = 0; index < this.pic_name.length; index++) {
                    if (this.pic_name[index] == shopImage) {
                        found = true
                        break
                    }
                }
                if (!found) {
                    this.pic_name.push(shopImage)
                }
            })
            this.shop.shop_img = this.pic_name.join(',')
            try {
                await ShopService.put(this.shop)
                this.$router.push({
                    name: 'shop-show'
                })
            } catch (err) {
                console.log(err)
            }
        },
        async save(formData) {
            // upload data to the server
            try {
                this.currentStatus = STATUS_SAVING
                await UploadImage.upload(formData)
                this.currentStatus = STATUS_SUCCESS

                let pictureJSON = []
                this.uploadedFileNames.forEach(uploadFilename => {
                    let found = false;
                    for (let i = 0; i < this.pictures.length; i++) {
                        if (this.pictures[i].name == uploadFilename) {
                            found = true
                            break
                        }
                    }
                    if (!found) {
                        this.pictureIndex++
                        let pictureJSON = {
                            id: this.pictureIndex,
                            name: uploadFilename
                        }
                        this.pictures.push(pictureJSON)
                    }
                })
                this.clearUploadResult()
            } catch (error) {
                console.log(error)
                this.currentStatus = STATUS_FAILED
            }
        },
        filesChange(fieldName, fileList) {
            // handle file changes
            const formData = new FormData();
            if (!fileList.length) return;
            // append the files to FormData
            Array.from(Array(fileList.length).keys()).map(x => {
                formData.append(fieldName, fileList[x], fileList[x].name);
                this.uploadedFileNames.push(fileList[x].name);
            });
            // save it
            this.save(formData);
        },
        async deletePicture(material) {
            let result = confirm("want to delete?")
            if (result) {
                let dataJSON = {
                    "filename": material.name
                }
                await UploadImage.delete(dataJSON)
                for (var i = 0; i < this.pictures.length; i++) {
                    if (this.pictures[i].id == material.id) {
                        this.pictures.splice(i, 1)
                        this.materialIndex--
                        break
                    }
                }
            }
        },
        async deleteImg(material) {
            let result = confirm("want to delete?")
            if (result) {
                let dataJSON = {
                    "filename": material
                }
                await UploadImage.delete(dataJSON)
                let imgs = this.shop.shop_img.split(',')
                imgs = imgs.filter(img => img !== material)
                this.shop.shop_img = imgs.join(',')
            }
        },
        clearUploadResult: function () {
            setTimeout(() => this.reset(), 5000);
        },

        navigateTo(route) {
            this.$router.push(route)
        },
        useThumbnail(filename) {
            console.log(filename)
            this.shop.thumbnail = filename
        },
    },
    computed: {
        shopImages() {
            return this.shop.shop_img.split(',')
        }
    }

}
</script>
<style scoped></style>