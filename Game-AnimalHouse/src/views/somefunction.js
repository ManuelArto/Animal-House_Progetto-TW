let changedLike = false;
let changedDisLike = false;
function myLike(x){
    if(!changedLike && !changedDisLike){
        document.getElementById("like"+x).style.color = "red";
        changedLike = true;
    }else if(!changedLike && changedDisLike){
        document.getElementById("like"+x).style.color = "red";
        document.getElementById("dislike"+x).style.color = "black";
        changedLike = true;
        changedDisLike = false;
    }else{
        document.getElementById("like"+x).style.color = "black";
        changedLike = false;
    }
}

function myDisLike(x){
    if(!changedDisLike && !changedLike){
        document.getElementById("dislike"+x).style.color = "red";
        changedDisLike = true;
    }else if(!changedDisLike && changedLike){
        document.getElementById("dislike"+x).style.color = "red";
        document.getElementById("like"+x).style.color = "black";
        changedDisLike = true;
        changedLike = false;
    }else{
        document.getElementById("dislike"+x).style.color = "black";
        changedDisLike = false;
    }
}