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
                            Finexo
                        </span>
                    </a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav  ">
                            <li class="nav-item active">
                                <a class="nav-link" v-on:click="navigateTo('/')">Home <span
                                        class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" v-on:click="navigateTo('/login')"> <i class="fa fa-user"
                                        aria-hidden="true"></i> Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" v-on:click="navigateTo('/person/create')">Signup</a>
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
        <section class="slider_section ">
            <div id="customCarousel1" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="container ">
                            <div class="row">
                                <div class="col-md-6 ">
                                    <div class="detail-box">
                                        <h1>
                                            Crypto <br>
                                            Currency
                                        </h1>
                                        <p>
                                            Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam
                                            fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat
                                            molestias, veniam, vel architecto veritatis delectus repellat modi impedit
                                            sequi.
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="img-box">
                                        <img src="./assets/slider-img.png" alt="">
                                    </div>
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
export default {
    methods: {
        navigateTo(route) {
            this.$router.push(route)
        }
    }
}
</script>