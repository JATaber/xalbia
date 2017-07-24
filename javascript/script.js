var request = new XMLHttpRequest();

var url = 'https://api.twitch.tv/kraken/search/streams?client_id=81twkqgzahbim1nmtd47klviib0vck&query=league&limit=12';

request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);

        console.log(data);

        var ele = document.getElementById("searchResults");


        if (ele) {
            var gameInfo = document.querySelector("#searchResults");

            console.log(data.streams.length);

            var searchData= '';

            if(data.streams.length > 0){

                for (var i = 0; i < data.streams.length; i++)  {
                    searchData += '<article>';
                    searchData += '<a href="' + data.streams[i].channel.url + '" target="_blank">';
                    searchData += '<img class="img-result" src=' + data.streams[i].preview.large +
                                                            ' alt="preview">';
                    searchData += '<div class="result-info">';
                    searchData += '<h3>' + data.streams[i].channel.name + '<strong>' + data.streams[i].channel.game + '</strong></h3>';
                    searchData += '</a>';
                    searchData += '</article>';
                }
            }else{
                document.querySelector("#userFeedback").innerHTML = "Your search results didn't return anything";

            }


            gameInfo.insertAdjacentHTML('beforeEnd', searchData);


            console.log(data.streams[0]);

        } else {
            console.log('response error')
        }

        request.onerror = function () {

            console.log('connection error');
        };
        //request close
    }
//onload close
};

request.open('GET', url, true);
request.send();


function show(){

    var x = document.getElementById('nav');
    if(x.style.display === 'none'){
        x.style.display = 'block';
    }else{
        x.style.display = 'none';
    }

}