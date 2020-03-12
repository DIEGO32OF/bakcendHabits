'use strict'


async function getResultSurvkey(questions){

    let arrResulset = new Array()
    let connect = questions.filter(x=> x.pillar === 1)
    let sumConnect = 0
    let porcentConect = 0
    for( const sum of connect){
        sumConnect += +sum.result
    }
    porcentConect = (sumConnect * 100)/40
    arrResulset.push({type:'connect', id: 1, porcent: porcentConect})

    let activity = questions.filter(x => x.pillar === 2)
    let sumActivity = 0
    let proceentActivity = 0
    for( const sum of activity){
        sumActivity += +sum.result
    }
    proceentActivity  = (sumActivity * 100)/20
    arrResulset.push({ type:'activate', id: 2, porcent: proceentActivity })
    
    let relax = questions.filter(x => x.pillar === 3)
    let sumRelax = 0
    let porcentRelax = 0
    for(const sum of relax){
        sumRelax += +sum.result
    }
    porcentRelax = (sumRelax * 100)/30
    arrResulset.push({ type:'relax', id: 3, porcent: porcentRelax })

    let eat = questions.filter( x => x.pillar === 4)
    let sumEat = 0
    let porcentEat = 0
    for(const sum of eat){
        sumEat += + sum.result
    }
    porcentEat = (sumEat * 100)/35

    arrResulset.push({ type:'eat', id: 4, porcent: porcentEat})

    return arrResulset = arrResulset.sort(function (a, b) { return a.porcent - b.porcent }) 
    

}

async function getActivities(arrResulset){
    let activityOne = []
    let arrActivities = []
    let idDays =[6,7,13,14,20,21,27,28]
    let counter = 0

    let mainActivity = 0
    for(let activities of arrResulset){                
        mainActivity = activities.id
        let lastPillar = 0   
        let esFinde = false
       let suplente = 0             
       for(let i = 1; i < 29; i++){
           
       let j = 1
       
       esFinde = false
       suplente = 0 
          if(lastPillar > 3 ){
          lastPillar = 0
          }

            lastPillar = lastPillar + j
            if(lastPillar !== mainActivity)
            {
              if(idDays.includes(i)){
                esFinde = true
                suplente = 0
              
                if(lastPillar  > 3){
                suplente = 1                        
                }
                else{
                    suplente = lastPillar + 1
                }
                if(suplente == mainActivity)
                {                            
                    if(suplente == 4)
                    suplente = 1
                    else{
                        if(lastPillar > 3)
                    suplente = mainActivity + 1
                    else
                    suplente = lastPillar + 2                            
                    }                            
                }
              }
              else
                suplente = 5                      
            }
            else{
              if(lastPillar == 4)
              lastPillar = 1
              else
              lastPillar = lastPillar + j

              if(idDays.includes(i)){
                suplente = 0
                esFinde = true
                if(lastPillar  > 3)
                suplente = 1
                else{
                    suplente = lastPillar + 1
                }
                if(suplente !== mainActivity)
                {

                }
                else{
                    
                    if(suplente === 4)
                    suplente = 1
                    else
                    suplente = lastPillar + 2
                }
              }
              else
              suplente = 5
            }
           
            arrActivities.push({main: mainActivity, second:lastPillar, suplenteT:suplente, day: i })
                  
        if(i === 1 && activityOne.length === 0){
            activityOne.push({main: mainActivity, second:lastPillar, suplenteT:suplente, day: 1 })
        }

        if(esFinde){
        lastPillar = suplente
        esFinde = false
        suplente =0
        }
    }

    }
    return [ arrActivities, activityOne]
}




module.exports = {getResultSurvkey, getActivities}