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
              <li class="nav-item">
                <a class="nav-link" v-on:click="navigateTo('/login')"> <i class="fa fa-user" aria-hidden="true"></i>
                  Login</a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" v-on:click="navigateTo('/person/create')">Signup <span
                    class="sr-only">(current)</span></a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
    <div class="about_section layout_padding">
      <div class="heading_container heading_center">
        <h1>
          Sign<span>up</span>
        </h1>
      </div>
      <div2 style="display:flex; align-items:center; justify-content:center;">
        <div>
          <form v-on:submit.prevent="create">
            <div class="screen-1">
              <input class="name" type="text" placeholder="name" v-model="person.name">
              <input class="lastname" type="text" placeholder="lastname" v-model="person.lastname">
              <input class="email" type="email" placeholder="email" v-model="person.email" required>
            </div>
            <link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.9/css/unicons.css">
            <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
            <div class="section">
              <div class="container">
                <div class="row full-height justify-content-center">
                  <div class="col-12 text-center align-self-center py-5">
                    <div class="section pb-5 pt-5 pt-sm-2 text-center">
                      <h6><span>หน่วยงาน</span>
                        <span1>ร้านค้า</span1>
                      </h6>
                      <p></p>
                      <input class="checkbox" type="checkbox" id="reg-log" name="reg-log" v-model="person.type"
                        true-value="shop" false-value="company" />
                      <label for="reg-log"></label>
                      <div class="card-3d-wrap mx-auto">
                        <div class="card-3d-wrapper">
                          <div class="card-front">
                            <div class="center-wrap">
                              <div class="section text-center">
                                <h4 class="mb-4 pb-3">
                                  <l><B>หน่วยงาน</B></l>
                                </h4>
                                <div class="form-group">
                                  <input type="text" class="form-style" name="company" placeholder="companyname"
                                    v-model="person.company_name">
                                </div>
                                <div class="form-group mt-2">
                                  <input type="text" class="form-style" placeholder="address" v-model="person.address">
                                </div>
                                <div class="form-group mt-2">
                                  <input type="text" class="form-style" placeholder="telephone" v-model="person.tel">
                                </div>
                                <div class="form-group mt-2">
                                  <input type="text" class="form-style" placeholder="password"
                                    v-model="person.password">
                                </div>
                                <button type="submit">Signup</button>
                              </div>
                            </div>
                          </div>
                          <div class="card-back">
                            <div class="center-wrap">
                              <div class="section text-center">
                                <h4 class="mb-3 pb-3">
                                  <l><B>ร้านค้า</B></l>
                                </h4>
                                <div class="form-group">
                                  <input type="text" class="form-style" name="shop" placeholder="shopname"
                                    v-model="person.shop_name">
                                </div>
                                <div class="form-group mt-2">
                                  <input type="text" class="form-style" placeholder="address" v-model="person.address">
                                </div>
                                <div class="form-group mt-2">
                                  <input type="text" class="form-style" placeholder="telephone" v-model="person.tel">
                                </div>
                                <div class="form-group mt-2">
                                  <input type="text" class="form-style" placeholder="password"
                                    v-model="person.password">
                                </div>
                                <button type="submit">Signup</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div2>
    </div>
  </div>
</template>
<script>
import PersonService from '@/services/PersonService'
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
        type: 'company'
      }
    }
  },
  methods: {
    async create() {
      try {
        await PersonService.post(this.person)
        this.$router.push({
          name: 'indexs',
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