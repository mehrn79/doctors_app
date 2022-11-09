export const state = () => ({
    doctors: [
        {
            id: 1,
            name: "Wojciech",
            email: "wojciech@poz.pl",
            description: ["Anaesthesiologist"],
            likes: 34
          },
          {
            id: 2,
            name: "Maria",
            email: "maria@poz.pl",
            description: ["Radiologist"],
            likes: 28
          },
          {
            id: 3,
            name: "Anna",
            email: "anna@poz.pl",
            description: ["Surgeon"],
            likes: 53
          }
    ]
  });
  
  export const mutations = {
    setDoctor(state, doctor){
      state.doctors.push(doctor) ;
    },
    addLikes(state, id){
      state.doctors.map(doctor => doctor.id === id ? doctor.likes++ : doctor )
    },
    decreaseLikes(state, id){
      state.doctors.forEach(doctor =>{
        if(doctor.id === id && doctor.likes!==1)
          doctor.likes -=2
      })
    }
  };
  
  export const actions = {
    addDoctor(vuexContext, doctor){
      vuexContext.commit('setDoctor', doctor);
    },
    like(vuexContext,id){
      vuexContext.commit('addLikes',id);
    },
    disLike(vuexContext,id){
      vuexContext.commit('decreaseLikes',id);
    },
  };
  
  export const getters = {
    loadeDoctore(state){
      return state.doctors;
    }
  };