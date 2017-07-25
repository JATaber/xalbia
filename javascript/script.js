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


// Set up submit listener
var submit = document.querySelector('#formSubmit');
var nameField = document.querySelector('#name');
var emailField = document.querySelector('#email');


// Create a validity class

class CheckValidity {
    constructor(input, type) {
        this.input = input;
        this.type = type;
        this.errors = [];
    }

    addError(message) {
        this.errors.push(message);
    }

    getNameMessages(){
        const status = this.input.validity;

        if(status.valueMissing){
            this.addError('Must not be left blank');
        }

        return this.errors;
    }

    getEmailMessages(){
        const status = this.input.validity;

        if(status.valueMissing){
            this.addError('Must not be left blank');
        }

        if(status.typeMismatch){
            this.addError('Please enter a valid email address');
        }

        return this.errors;
    }

}

submit.addEventListener("click", (event) => {
    event.preventDefault(); // this will stop the standard form submission.
    let validateName = new CheckValidity(nameField);
    let validateEmail = new CheckValidity(emailField);
    let nameError = validateName.getNameMessages();
    let emailError = validateEmail.getEmailMessages();
    //let removeElem = elms => Array.from(elms).forEach(el => el.remove);

    //removeElem(document.querySelectorAll("error"));
    var elem = document.querySelector("error");

    if(elem !== null) {
        elem.remove();
    }

    if(nameError.length > 0){
        nameError.forEach((err) => {
            nameField.insertAdjacentHTML('afterend', '<p class="error">'+ err + '</p>');
        });
    } else if(emailError.length > 0){
        emailError.forEach((err) => {
            emailField.insertAdjacentHTML('afterend', '<p class="error">'+ err + '</p>');
        });
    }else {
        document.getElementById('alert').classList.toggle("show");
    }
});