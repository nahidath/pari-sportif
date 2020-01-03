
function date_heure(){
        var x=document.getElementsByClassName("date");
        let days = [];
        let daysRequired = 7
        moment.locale('fr');
        for (let i = 1; i <= daysRequired; i++) {
          days.push( moment().add(i, 'days').format('dddd DD MMMM') );
        }
        for(j=0;j<days.length;j++){
          for(y=0;y<x.length;y++){
            x[j]=x[j].innerHTML=days[j];
          } 
        }
}