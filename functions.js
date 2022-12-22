import {Activity, UserActivities, UserSessions, UserSession} from './entities.js';



/* ---------------------------*/
/*     Functions  to fetch   */
/* --------------------------*/

/* send the request to fetch */
const handleFetch = (request) =>{
    return fetch(request) 
    .then(handleError)
}

/*we create a error object and put information if something bad happen*/
const handleError = (response) =>{
    if(!response.ok){
        const statusText = response.status == 400 ? "Bad request" : response.status == 401 ? "Unauthorized" : "Too many requests (en el caso de ser rate-limited)";
        var error = response.status + ' ' + statusText 
        throw error;
    }
    return response
}

/* get data from API */
export const  fetch_data= async(url="",options = {})=>{
    const request = new Request(url,options)
    let response = await handleFetch(request)
    let data = await response.json()
    return data
}




/* ---------------------------*/
/*     Control Functions    */
/* --------------------------*/

/* sort by date from smallest to largest */
const sort_by_date = (data) => {
    return data.activities.sort((act1, act2) =>( 
        (Date.parse(act1.first_seen_at) < Date.parse(act2.first_seen_at)) ? -1: 1  
        )
    )
}
const group_activities_by_user= (activities) => {

    let aux = []

    for (let i = 0; i < activities.length; i++) {

        let user_id = activities[i]['user_id'];
        let id = activities[i]["id"];
        let first_seen_at = activities[i]["first_seen_at"];
        let answered_at = activities[i]["answered_at"];

        let userActivity = new Activity(id, first_seen_at,answered_at)
        let userActivities = new UserActivities(user_id)

        if(aux[user_id] === undefined)
            aux[user_id] = []

        aux[user_id].push(userActivity)

    }
        
    return aux

}

const group_activities_by_sesion= (users = []) => {
    
    let userSesions = new UserSessions() ;

    for (var user in users) {
        let started_at = null;
        let ids =[]

        for (let j = 0; j < users[user].length; j++) {
            
            /* el primero almacena el timestamp, el segundo el date */
            let firts_seen_at = [Date.parse(users[user][j]['first_seen_at']),users[user][j]['first_seen_at']]
            let answered_at = [Date.parse(users[user][j]['answered_at']),users[user][j]['answered_at']]
            let ended_at = j>0 ? [Date.parse(users[user][j-1]['first_seen_at']),users[user][j-1]['first_seen_at']] :answered_at
            let id = users[user][j]['activity_id']

            
            if(started_at == null){
                started_at = firts_seen_at
            }

            if(j+1 == users[user].length || ended_at[0] - firts_seen_at[0]<= -300000 ){ 
                
                if(j+1 == users[user].length )
                    ids.push(id)

                    
                let  time = ended_at[0]-started_at[0]
                time = new Date(time)

                let sesion = new UserSession(ended_at[1], started_at[1], ids, time.getTime()/1000)            
                
                if (userSesions["user_sessions"][user] == undefined)
                    userSesions["user_sessions"][user] = []

                userSesions["user_sessions"][user].push(sesion)
                sesion= null
                started_at = null
                ids= []
            }

            ids.push(id)
            

        }
       
    }
        
    return userSesions

}


export const logic = (DB) => {
    
    let aux = []
    aux = sort_by_date(DB);
    aux = group_activities_by_user(aux)
    aux =group_activities_by_sesion(aux)
    
    return aux
}




