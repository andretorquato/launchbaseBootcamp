module.exports = {
    age: function age(timestamp){
        const today = new Date()
        
        const birthDay = new Date(timestamp)

        let age = today.getFullYear() - birthDay.getFullYear()
        const month = today.getMonth() - birthDay.getMonth()

        if(month < 0 || month == 0 && today.getDate() < birthDay.getDate()){
            return age = age - 1
        }
        
        return age
    },
    graduation: function graduations(level){
       
       const graduations = {
         
        medio:"Ensíno Médio Completo",
        superior:"Ensino Superior Completo",
        mestrado:"Mestrado",
        doutorado:"Doutorado"

       }
        
       for(graduation in graduations){
        if(level == graduation){
               return graduations[this.graduation]
           }

       }
    }
}