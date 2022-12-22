
/* ---------------------*/
/* To build sort data */
/* ---------------------*/

/* entity to make a list activities by user */
export function UserActivities (user_id){
    this.user_id = user_id,
    this.activity= []
}

/* entity to make a simple activity */
export function Activity (id, first_seen_at, answered_at){
    this.activity_id = id,
    this.first_seen_at = first_seen_at,
    this.answered_at = answered_at
}




/* ---------------------*/
/* To build final POST */
/* ---------------------*/


/* entity to make a list sesions by user */
export function UserSessions (){
    this.user_sessions ={}
}

/* entity to make a simple sesion */
export function UserSession(ended_at, started_at,activity_ids,duration_secons){
    this.ended_at = ended_at,
    this.started_at = started_at,
    this.activity_ids = activity_ids,
    this.duration_seconds=duration_secons
}
