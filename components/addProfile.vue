<template>
    <v-row justify="space-around">
      <v-col cols="auto">
        <v-dialog
          transition="dialog-bottom-transition"
          max-width="600"
        >
            <template #activator="{ on, attrs }">
              <v-fab-transition>
                <v-btn
                  color="#db3a3c"
                  v-bind="attrs"
                  fab
                  dark
                  large
                  absolute
                  bottom
                  left
                  v-on="on"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-fab-transition>
            </template>
          <template #default="dialog">
            <v-card color="#f1f3ff">
              <v-toolbar
                color="#009459"
                dark
                class="toolbar"
              >Adding profile</v-toolbar>
              <v-card-text class="card" dark >
                <v-form
                    ref="form"
                    @submit.prevent="submit"
                >
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="form.name"
                                :rules="rules.name"
                                prepend-inner-icon="mdi-magnify"
                                background-color="#75b8fb"
                                placeholder="enter name"
                                required
                                light
                                filled
                                outlined
                                rounded
                                :height="20"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="form.email"
                                :rules="rules.email"
                                prepend-inner-icon="mdi-magnify"
                                background-color="#75b8fb"
                                placeholder="enter email"
                                type="email"
                                light
                                required
                                filled
                                outlined
                                rounded
                                :height="20"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="form.description"
                                :rules="rules.description"
                                prepend-inner-icon="mdi-magnify"
                                background-color="#75b8fb"
                                placeholder="enter description"
                                light
                                required
                                readonly
                                filled
                                outlined
                                rounded
                                :height="20"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-row class="options">
                                <v-checkbox
                                    v-model="form.description"
                                    label="Surgeon"
                                    value="Surgeon"
                                    light
                                ></v-checkbox>
                                <v-checkbox
                                    v-model="form.description"
                                    label="Radiologist"
                                    value="Radiologist"
                                    light
                                ></v-checkbox>   
                                <v-checkbox
                                    v-model="form.description"
                                    label="Cardiologist"
                                    value="Cardiologist"
                                    light
                                ></v-checkbox> 
                                <v-checkbox
                                    v-model="form.description"
                                    label="Psychiatrist"
                                    value="Psychiatrist"
                                    light
                                ></v-checkbox> 
                                <v-checkbox
                                    v-model="form.description"
                                    label="Dermatologist"
                                    value="Dermatologist"
                                    light
                                ></v-checkbox>                              
                            </v-row>
                        </v-col>
                    </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions class="card-action">
                <v-btn
                  color="#db3a3c"
                  @click="dialog.value = false,resetForm"
                >Close</v-btn>
                <v-btn
                  color="#009459"
                  type="submit"
                  @click="submit"
                >submit</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </template>
  <script>
   export default {
    name:'AddProfile',
    props: {
        profilesLen: {
            type: Number,
            required:true 
        },
    },

    data () {
        
      const profile = Object.freeze({
        name:'',
        description:[],
        email:'',
        likes:0,
        id:this.profilesLen+1
      })

      return {
        form: Object.assign({}, profile),
        rules: {
          name: [val => (val || '').length > 0 || 'This field is required'],
          description: [val => (val || '').length > 0 || 'This field is required'],
          email: [val => (val || '').includes('@')  || 'invalide email type'],
        },
        profile,
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.name &&
          this.form.description &&
          this.form.email.includes('@')
        )
      },
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.profile)
        this.$refs.form.reset()
      },
      submit () {
        if(this.formIsValid){
            this.$store.dispatch('data/addDoctor',this.form);
            this.$emit('updateState')
            this.resetForm() 
        }

      },
    },
  }
</script> 
<style lang="scss" scoped>
    .v-dialog__container{
        display: block;
    }
    .v-btn--fab.v-size--large.v-btn--absolute.v-btn--bottom{
      bottom: 30px;
      position: fixed;
    }
    .toolbar{
      font-weight: 700;
      font-size: 25px;
    }
    .card{
      margin-top: 30px;
    }

    .options{
      padding-left: 20px;
      margin-top: -50px;
    }
    .card-action{
      width: 40%;
      display: flex;
      justify-content: space-around;
      padding-bottom: 20px;

      @media (max-width: 600px){
        width: 60%;
      }
    }
</style>