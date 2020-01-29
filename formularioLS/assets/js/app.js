
//variables
const listaTwets = document.querySelector('#lista-tweets')



//Event Listeners
eventListeners();

function eventListeners(){
    //cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //borrar tweet
    listaTwets.addEventListener('click', borrarTweet);

    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

}


//Fuctiones


//añadir tweet del formulario

function agregarTweet(e){
    e.preventDefault();
    //leer el valor de textarea
    const tweet = document.getElementById('tweet').value;

    //crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerHTML = 'X';

    //crear elemento y añadir el valor del tweet
    const li = document.createElement('li');
    li.innerHTML = tweet
    li.appendChild(botonBorrar);
    listaTwets.appendChild(li);
    // añardir al local Storage
    agregarTweetLocalStorage(tweet);
}


function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === "borrar-tweet"){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}


function localStorageListo() {
    let tweets;

    tweets = ObtenerTweetsLocalStorage();
    tweets.forEach(tweet => {
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerHTML = 'X';

        //crear elemento y añadir el valor del tweet
        const li = document.createElement('li');
        li.innerHTML = tweet;
        li.appendChild(botonBorrar);
        listaTwets.appendChild(li);
    });
}


//Agrega tweet a local storage

function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = ObtenerTweetsLocalStorage();
    tweets.push(tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


function ObtenerTweetsLocalStorage(){
    let tweets;
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}


//eliminar tweet de Local Store

function borrarTweetLocalStorage(tweet){
    let tweets, tweetsBorrar;
    //elimina la X del dom
    tweetsBorrar = tweet.substring(0, tweet.length - 1);

    tweets = ObtenerTweetsLocalStorage();
    
    tweets.forEach((e, index) => {
        if( tweetsBorrar === e){
            tweets.splice(index, 1);
        }
    })

    localStorage.setItem('tweets', JSON.stringify(tweets));
}

