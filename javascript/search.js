/**
 * Created by jamestaber on 7/23/17.
 */
var subForm = document.querySelector('.searchForm');
var searchInput = document.querySelector('#input');


//listen for forms submission
function searchForm(event) {

    //stop default submit action
    event.preventDefault();

    //take in value from form
    var query = searchInput.value;

    console.log(query);

    //set additional values
    var limit = "12";
    var client_Id = "81twkqgzahbim1nmtd47klviib0vck";

    var request = new XMLHttpRequest();

    //build query string
    var api = 'https://api.twitch.tv/kraken/search/streams?client_id=' + client_Id + '&query=' + query + '&limit=' + limit;
    console.log(api);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);

            console.log(data);

            var ele = document.getElementById("results");

            if (ele) {
                var gameInfo = document.querySelector("#searchResults");
                var title = document.querySelector('#resultsInfo');

                console.log(data.streams.length);

                var searchData='';

                gameInfo.innerHTML='';

                title.innerHTML= 'results for '+query;

                if(data.streams.length >0){

                    document.querySelector("#userFeedback").innerHTML = '';

                    for (var i = 0; i < data.streams.length; i++)  {
                        searchData += '<article class="info-base container result col-md-4 col-sm-6">';
                        searchData += '<a href="' + data.streams[i].channel.url + '" target="_blank">';
                        searchData += '<img class="img-result img-responsive" src=' + data.streams[i].preview.large +
                            ' alt="preview">';
                        searchData += '<div class="result-info overlay">';
                        searchData += '<h3 class="streamer"><strong>' + data.streams[i].channel.name + '</strong></h3>';
                        searchData += '<p>' + data.streams[i].channel.game + '</p>';
                        searchData += '<p><img src="images/icons8-Heart%20Filled-100.png" ' +
                            'width="20" height="20" class="heart" alt="heart">'
                            + data.streams[i].channel.followers +'</p>';
                        searchData += '<p><img src="images/icons8-Eye-96.png" ' +
                            'width="20" height="20" class="eye" alt="eye">'
                            + data.streams[i].viewers+'</p>';
                        searchData += '</div>';
                        searchData += '</a>';
                        searchData += '</article>';
                    }
                }else{
                    document.querySelector("#userFeedback").innerHTML = "Your search results didn't return anything";
                }

                gameInfo.insertAdjacentHTML('beforeEnd', searchData);
                console.log(data.streams[0]);

            } else {
                console.log('response error');
            }

            request.onerror = function () {

                console.log('connection error');
            };
            //request close
        }
//onload close
    };

    request.open('GET', api, true);
    request.send();

    //search function end
}

subForm.addEventListener('submit', searchForm, false);