<template>
    <v-card
      class="profile-card"
      color="#0066cc"
      dark
    >
      <v-row class="card-title">
        <v-col cols="3">
            <img src="~/assets/img/doctor.png" alt="doctor-img">
        </v-col>
        <v-col cols="9">
            <div class="card-info">
                <span class="doctor-name">{{info.name}}</span>
                <div>
                    <v-icon :color="setColor" @click="likeHander" >
                        mdi-heart
                        
                    </v-icon>
                    <span class="subheading mr-2">{{info.likes}}</span>
                </div>
            </div>
            
            <span 
                v-for="(item,index) in info.description" 
                :key="index"
                class="doctor-info"
            >
                {{item}}
            </span>
            <span class="doctor-info"> email: {{info.email}}</span>
        </v-col>
      </v-row>
      <v-row>
            <v-text-field class="comment-container" label="Write your comment..."></v-text-field>
      </v-row>
    </v-card>
  </template>
  <script>
  export default {
    name:'ProfileCard',
    props: {
        info: {
            type: Object,
            required: true
        },
    },
    data: () => ({
      isLiked:false
    }),
    computed: {
        setColor() {
            if(this.isLiked)  return '#db3a3c' 
            return "#fff"
        }
    },
    methods: {
        addLike() {
            this.$store.dispatch('data/like',this.info.id);
            this.isLiked=true
            this.$emit('addLike',this.info.id)
        },
        disLike(){
            this.$store.dispatch('data/disLike',this.info.id);
            this.isLiked=false
            this.$emit('disLike',this.info.id)
        },
        likeHander(){
            this.isLiked ? this.disLike() : this.addLike()
        }
    },
  }
</script>

<style lang="scss" scoped>
    .profile-card{
        padding: 30px;
        width: 30%;
        margin-bottom: 20px;

        @media (max-width: 960px){
            width: 45%;
        }
        @media (max-width: 600px){
            width: 100%;
        }
        
        .card-title{

            img{
                width: 80px;
                height: 80px;
                border-radius: 50px;
            }

            .card-info{
                width: 100%;
                display: flex;
                justify-content: space-between;
                .doctor-name{
                font-weight: 700;
                font-size: 25px;
                margin-left:20px;
            }
            }
            .doctor-info{
                font-weight: 500;
                font-size: 20px;
                margin:5px 0 0 20px; 
                display: block;
            }
        }

        .comment-container{
            padding: 0 20px;
            font-weight: 500;
            font-size: 20px;
        }
    }

</style>