let posts = [];

let selectedItems = [];

let isSubscribed = false;
let i = 0;



async function loadPosts(category) {
    posts = await fetchNews();
    console.log(posts);
    let container = document.getElementById("container");
    let postsHtml = "";
    let postsFiltered = [];
    let i = 0;
    if (category) {
        postsFiltered = posts.filter(elem => elem.category === category);
    } else {
        postsFiltered = posts;
    }
    postsFiltered.forEach(elem => {
        let postHtml = `<div class="card" ><p class="card-years">${elem.author} <button id="${elem.url}" class="dd" onclick="Selected('${elem.url}')"><img src="media/2.png"  class="df"></button></p><h3 class="card-title">${elem.title}</h3><p><image src="media/1.png"/>${elem.description}</p></div>`;
        postsHtml += postHtml;
    })
    container.innerHTML = postsHtml;
}

function Selected(id) {
    var buttonID = id;
    let containerBasket = document.getElementById("containerBasket");
    let postsHtml = "";
    let postsFiltered = [];
    let i = 0;
    let buton = document.getElementById(id);
    buton.style.display = "none";
    selectedItems.push(posts.find(p => p.url == buttonID));

    selectedItems.forEach(elem => {
        let postHtml = `<div class="card" id="cart-${elem.url }"><p class="card-years">${elem.author} <button id="${elem.url}" class="ds" onclick="remove_card('${elem.url}')"><img src="media/3.png"  class="df"></button></p><h3 class="card-title">${elem.title}</h3><p><image src="media/1.png"/>${elem.description}</p></div>`;
        postsHtml += postHtml;
    })
    containerBasket.innerHTML = postsHtml;
}

window.onload = async () => {
    await loadPosts();
}



let subscribeElement = document.getElementById("subscribe-modal");

function Close(id) {
    let buton = document.getElementById(id);
    buton.style.display = "none";
}

function showDisplay() {
    subscribeElement.style.display = "block";
}

setInterval(() => {
    if (!isSubscribed) {
        showDisplay();
        i += 1;
    }
},
    3000 * (i * i));

setInterval(() => {
    if (!isSubscribed) {
        // showCloseButton();
        i += 1;
    }
},
    3000 * (i * i));

function subscribe() {
    isSubscribed = true;
    subscribeElement.style.display = "none";
}
function closeModal() {
    subscribeElement.style.display = "none";
}
var slider = document.getElementById("myRange");
var output = document.getElementById("value");
output.innerHTML = slider.value;
slider.oninput = function () {

    output.innerHTML = this.value;
}
let basketElement = document.getElementById("basket-modal");

function remove_card(id){
    let buton = document.getElementById(id);
    buton.style.display = "block";
    selectedItems = selectedItems.filter(x => x.url !== id);
    var parent = document.getElementById("containerBasket");
    var child = document.getElementById("cart-" + id);
    parent.removeChild(child);
    drawChart();
}
function basketDisplay() {
    drawChart();
    basketElement.style.display = "block";

}


function closeModalBasket() {

    basketElement.style.display = "none";
}

function drawChart() {
    const ctx = document.getElementById('myChart');
    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    let authors = selectedItems.map(x => x.author);
    let authorUnique = [...new Set(authors)];
    let data = authorUnique.map(author =>
    ({
        'count': authors.filter(y => y == author).length,
        'author': author
    }));

    let dataLables = {
        datasets: [{
            data: data.map(d => d.count)
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: data.map(d => d.author)
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: dataLables
    });
}

window.onscroll = function() {
    let percentageScroll = (window.scrollY / window.innerHeight) * 100;
    if(percentageScroll > 10){
        let buttonScroll = document.getElementById("scroll-up-button");
        buttonScroll.style.display = "block";
    } else{
        let buttonScroll = document.getElementById("scroll-up-button");
        buttonScroll.style.display = "none";
    }
};

function scrollUp(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


async function fetchNews() {
    return await fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=e106d401ccd949f99b83b303f4f240bf')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => data.articles)
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }

// console.log(fetchNews());