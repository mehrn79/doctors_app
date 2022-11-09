<template>
  <div class="homePage-container">
    <h1>Doctors profiles</h1>
    <div class="setting">
      <div class="sort">
        <span>Sort by number of likes: </span>
        <v-icon color="#fff" :size="30" @click="sortAsc">mdi-arrow-up-bold-box</v-icon>
        <v-icon color="#fff" :size="30" @click="sortDesc">mdi-arrow-down-bold-box</v-icon>
      </div>
      <div class="filter">
        <v-text-field
          v-model="filter"
          filled
          outlined
          rounded
          :height="35"
          prepend-inner-icon="mdi-magnify"
          background-color="#fff"
          placeholder="filter by name"
          @input="filterProfiles"
        ></v-text-field>
      </div>
    </div>
    <div class="profile-cards-container">
      <ProfileCardVue 
        v-for="profile in doctorsProfiles" 
        :key="profile.id"
        :info="profile"
        @updateLike="updateLikes"
      />
    </div>
    <AddProfile :profiles-len="profiles.length" @addLike="addLikes" @disLike="disLike" />
  </div>
</template>

<script>
import ProfileCardVue from '../components/ProfileCard.vue';
import AddProfile from '~/components/addProfile'
export default {
  name: 'IndexPage',
  components: {
    ProfileCardVue,
    AddProfile
  },
  data() {
    return {
      profiles: null,
      doctorsProfiles:null,
      filter:''
    }
  },
  created () {
    this.fetchProfiles();
    this.filterProfiles()
  },
  methods: {
    fetchProfiles() {
      this.profiles=[...this.$store.getters['data/loadeDoctore']];
    },
    sortAsc() {
      this.doctorsProfiles.sort((a, b)=> {
        return a.likes - b.likes;
      });
    },

    sortDesc() {
      this.doctorsProfiles.sort((a, b)=> {
        return b.likes - a.likes;
      });
    },

    filterProfiles(){
      this.doctorsProfiles=this.profiles.filter(elm=> 
        elm.name.toLowerCase().includes(this.filter.toLowerCase())
      )
    },
    updateprofiles(){
      this.fetchProfiles();
      this.filterProfiles()
    },
    addLikes(id){
      this.doctorsProfiles.map(doctor => doctor.id === id ? doctor.likes++ : doctor )
    },
    disLike(id){
      this.doctorsProfiles.forEach(doctor =>{
        if(doctor.id === id && doctor.likes!==1)
          doctor.likes -=2
      })
    }
  },
}
</script>
<style lang="scss" scoped>
  .homePage-container{
    height: 100vh;
    padding: 50px 100px ;
    background: #03d682;

    @media (max-width: 600px){
      padding: 50px 20px ;
      height: auto;
      .setting{
        
        .sort{
          margin-left: 20px;
        }
        .filter{
          width: 100%;
          margin-top: 20px;
        }
      }
    }

    @media (max-width: 960px){
      height: auto;
    }

    h1 {
      font-weight: 900;
      font-size: 50px;
      color: #fff;
      text-align: center;
      margin-bottom: 50px;
    }
    .setting{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 30px;
      .sort{
        color: #fff;
        font-weight: 700;
        font-size: 20px;
        margin-top: 20px;
      }
    }

    .profile-cards-container{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
</style>
