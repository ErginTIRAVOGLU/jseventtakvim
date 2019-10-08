var data = [
    {"title":"event 1", "date":"2014/09/25"},
    {"title":"event 2", "date":"2014/09/26","enddate":"2014/09/29"},
    {"title":"event 3", "date":"2014/09/27"},
    {"title":"event 4", "date":"2014/09/30"}
];

var gunler = ["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"];

const takvimUI = document.getElementById("takvim");
var seciliYil = 2014;
var seciliAy = 9;


seciliAy = seciliAy-1;
var takvimHtml = "";

var takvimBeginDate = new Date(seciliYil,seciliAy);
var takvimEndDate = new Date(takvimBeginDate);
takvimEndDate.setMonth(takvimBeginDate.getMonth() + 1 );


var getDates = function(startDate, endDate) {
    var dates = [],
        currentDate = startDate,
        addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
        };
    while (currentDate < endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
    }
    return dates;
};

var eventBas = function (tarih){
 
    var span,div;
    
    var degiskenTarih=document.createElement("td");
     
    data.forEach(event => {
        if(event.enddate)
        {
            if((new Date(tarih).getTime() > new Date(event.date).getTime()) && (new Date(tarih).getTime() < new Date(event.enddate).getTime()))
            {
             
                span = document.createElement("span")
                span.className = "arada";
                span.innerHTML = "&nbsp;";
                degiskenTarih.appendChild(span);
            }            
            else if (new Date(tarih).getTime() == new Date(event.enddate).getTime())
            {
              
                span = document.createElement("span")
                span.className = "bitti";
                span.innerHTML = event.title;
                degiskenTarih.appendChild(span);
                
            }
            else if(new Date(tarih).getTime() == new Date(event.date).getTime())
            {
              
                span = document.createElement("span")
                span.className = "basladi";
                span.innerHTML = event.title;
                degiskenTarih.appendChild(span);
                
            }
        }
        else
        {            
            if(new Date(tarih).getTime() == new Date(event.date).getTime())
            {
              
                span = document.createElement("span")
                span.className = "basladibitti";
                span.innerHTML = event.title;
                degiskenTarih.appendChild(span);
                
            }
        }
       
    });

    div = document.createElement("div")
    div.className = "gun";
    div.innerHTML = new Date(tarih).getDate();
    degiskenTarih.appendChild(div);


    return degiskenTarih;
}

var takvimTable = document.createElement("table");
var takvimHRow = document.createElement("tr");
var veri = "";
var satir = "";
var sutun = "";
gunler.forEach(gun => {
    
    satir= document.createElement("th");
    satir.innerHTML=gun;
    takvimHRow.appendChild(satir);
});
takvimTable.appendChild(takvimHRow);


var dates = getDates(takvimBeginDate, takvimEndDate);
var haftaGunu = 0;
dates.forEach(function(date) {
    if (haftaGunu == 0)
    {
        satir = document.createElement("tr");
        sutun = eventBas(new Date(date));
        satir.appendChild(sutun);
        takvimTable.appendChild(satir);
    }
    else if(haftaGunu > 0 && haftaGunu % 7 == 0)
    {
        satir = document.createElement("tr");
        sutun = eventBas(new Date(date));
        satir.appendChild(sutun);
        takvimTable.appendChild(satir);
    }
    else
    {        
        sutun = eventBas(new Date(date));
        satir.appendChild(sutun);
    }    
    
    haftaGunu = haftaGunu + 1;
});
takvimUI.appendChild(takvimTable);
 