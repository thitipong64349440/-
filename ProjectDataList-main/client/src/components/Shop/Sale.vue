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
            <div class="page">
                <div class="form2">
                    <span3>
                        <h1>โพสความสินค้า</h1>
                    </span3>
                    <form enctype="multipart/form-data" class="register-form" v-on:submit.prevent="createSale"
                        novalidate>
                        <div class="dropbox">
                            <input type="file" multiple :name="uploadFieldName" :disabled="isSaving"
                                @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                                accept="image/*" class="input-file">
                            <p>
                                Drag your file(s) here to begin<br> or click to browse
                            </p>
                        </div>
                        <div class="pictures-box">
                            <ul class="pictures">
                                <li v-for="picture in pictures" v-bind:key="picture.id">
                                    <img style="margin-bottom:5px;" :src="BASE_URL + picture.name" alt="picture image">
                                    <button1 v-on:click="deletePicture(picture)">ลบ</button1>
                                    <button v-on:click.prevent="useThumbnail(picture.name)">Thumbnail</button>
                                </li>
                            </ul>
                        </div>
                        <div class="screen-2">
                            <input class="product" type="text" placeholder="ชื่อสินค้า *" v-model="shop.product_name"
                                required>
                            <input class="quantity" type="text" placeholder="จำนวน" v-model="shop.quantity">
                            <select class="purpose" v-model="shop.purpose" required>
                                <option disabled value="จุดประสงค์">จุดประสงค์</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                            <select class="category" v-model="shop.category" required>
                                <option disabled value="ประเภท">ประเภท</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                            <input class="detail" type="text" placeholder="รายละเอียด" v-model="shop.detail">
                            <input class="price" type="text" placeholder="ราคา" v-model="shop.price">
                            <a type="text" v-bind="shop.shop_name = person.shop_name"></a>
                            <div class="button-center">
                                <button type="submit">โพส</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div2>
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
                shop_img: '',
                thumbnail: 'null',
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
            }
        }
    },
    async created() {
        let personId = this.$route.params.personId
        this.person = (await PersonService.show(personId)).data
    },
    methods: {
        wait(ms) {
            return x => {
                return new Promise(resolve => setTimeout(() => resolve(x), ms));
            };
        },
        // onFileChange() {
        //     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        //     const file = this.$refs.file.files[0]
        //     this.file = file
        //     // this.shop.shop_img = file
        //     if (!allowedFileTypes.includes(file.type)) {
        //         alert('กรุณาเลือกรูปภาพ')
        //     }
        // },
        reset() {
            // reset form to initial state
            this.currentStatus = STATUS_INITIAL
            // this.uploadedFiles = []
            this.uploadError = null
            this.uploadedFileNames = []
        },
        async createSale() {
            for (let index = 0; index < this.pictures.length; index++) {
                this.pic_name.push(this.pictures[index].name)
            }
            this.shop.shop_img = this.pic_name.join(',')
            try {
                await ShopService.post(this.shop)
                this.$router.push({
                    path: '/indexs/' + this.person.id
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
        clearUploadResult: function () {
            setTimeout(() => this.reset(), 5000);
        },

        navigateTo(route) {
            console.log(route)
            this.$router.push(route)
        },
        useThumbnail(filename) {
            console.log(filename)
            this.shop.thumbnail = filename
        },
    },
}
</script>
<style scoped></style>