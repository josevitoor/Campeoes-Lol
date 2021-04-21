function xhttpAssincrono(callBackFunction, version, params) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Chama a função em callback e passa a resposta da requisição
            callBackFunction(this.responseText);
        }
    };

    // Path completo para a requisição AJAX.
    var url = "http://ddragon.leagueoflegends.com/cdn/" + version + "/data/pt_BR/champion";
    if (!isNaN(params)) {
        url = url + params;
    }
    url = url + ".json"
    console.log(url);

    // Requisição do tipo POST
    xhttp.open("GET", url);
    xhttp.send();
}

function controlVersion(callBackFunction) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Chama a função em callback e passa a resposta da requisição
            callBackFunction(this.responseText);
        }
    };

    // Path completo para a requisição AJAX.
    var url = "https://ddragon.leagueoflegends.com/api/versions.json";
    // Requisição do tipo POST
    xhttp.open("GET", url);
    xhttp.send();
}

function selectVersionChampions(result) {
    var version = JSON.parse(result);
    xhttpAssincrono(callingChampions, version[0])
}

function selectVersionFavorites(result) {
    var version = JSON.parse(result);
    xhttpAssincrono(callingFavorites, version[0])
}

function startChampions() {
    controlVersion(selectVersionChampions);
}

function startFavorite() {
    controlVersion(selectVersionFavorites)
}

function addFavorite(favorite) {
    localStorage.setItem(favorite, favorite);
    location.href = "/src/favorite.html";
}

function removeFavorite(favorite) {
    localStorage.removeItem(favorite);
    location.reload();
}

function callingFavorites(result) {
    var obj = JSON.parse(result);
    var parent = document.getElementById('card');
    var caunt = 0;
    for (var column in obj.data) {
        obj.hasOwnProperty(column); {
            if (obj.data[column].name == localStorage.getItem(obj.data[column].name)) {
                caunt += 1;
                var div = document.createElement('div');
                div.className = "col- mt-5 mx-3"
                div.style = "width: 15rem;"
                var button = document.createElement('button');
                button.type = "button";
                button.value = obj.data[column].name;
                button.className = "card bg-cards"
                button.style = "width: 15rem;"
                button.dataset.toggle = "modal";
                button.dataset.target = "#exampleModal";
                button.addEventListener("click", function () {
                    modal(this, obj);
                }, false);
                var img = document.createElement('img');
                img.src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + obj.data[column].id + "_0.jpg";
                img.className = "card-img-top";
                var div2 = document.createElement('div');
                div2.className = "card-body";
                var h5 = document.createElement('h5');
                h5.innerHTML = obj.data[column].name.toUpperCase();
                h5.className = "text-cards";
                parent.appendChild(div);
                div.appendChild(button);
                button.appendChild(img);
                button.appendChild(div2)
                div2.appendChild(h5);
            }
        }
    }
    if (!caunt) {
        var footer = document.getElementById("footer");
        footer.className = "footer text-center";
    } else {
        var footer = document.getElementById("footer");
        footer.className = "color-modal text-center";
    }
}

function callingChampions(result) {
    var obj = JSON.parse(result);
    var parent = document.getElementById('card');
    for (var column in obj.data) {
        obj.hasOwnProperty(column); {
            var div = document.createElement('div');
            div.className = "col- mt-5 mx-3"
            div.style = "width: 15rem;"
            var button = document.createElement('button');
            button.type = "button";
            button.value = obj.data[column].name;
            button.className = "card bg-cards"
            button.style = "width: 15rem;"
            button.dataset.toggle = "modal";
            button.dataset.target = "#exampleModal";
            button.addEventListener("click", function () {
                modal(this, obj);
            }, false);
            var img = document.createElement('img');
            img.src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + obj.data[column].id + "_0.jpg";
            img.className = "card-img-top";
            var div2 = document.createElement('div');
            div2.className = "card-body";
            var h5 = document.createElement('h5');
            h5.innerHTML = obj.data[column].name.toUpperCase();
            h5.className = "text-cards";
            parent.appendChild(div);
            div.appendChild(button);
            button.appendChild(img);
            button.appendChild(div2)
            div2.appendChild(h5);
        }
    }
}

function modal(button, obj) {
    var favorite = document.getElementById('favorite');
    favorite.value = button.value;
    var title = document.getElementById('exampleModalLabel');
    title.innerHTML = button.value.toUpperCase();
    for (var column in obj.data) {
        obj.hasOwnProperty(column); {
            if (obj.data[column].name == button.value) {
                drawChart(obj.data[column].stats);
            }
        }
    }
}

function drawChart(stats) {
    var ctx = document.getElementById('myChart');
    ctx.parentElement.removeChild(ctx);
    ctx = document.createElement("canvas");
    ctx.setAttribute("id", "myChart");
    ctx.className = "color-modal";
    ctx.style = "width: 400px; height: 400px"
    document.getElementById("graphic").appendChild(ctx);

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Vida', 'Velocidade de Movimento', 'Armadura', 'Poder de Habilidade', 'Alcance de Ataque', 'Dano de Ataque'],
            datasets: [{
                label: 'Valor',
                data: [stats.hp, stats.movespeed, stats.armor, stats.spellblock, stats.attackrange, stats.attackdamage],
                backgroundColor: [
                    'rgba(255, 193, 7, 0.4)',
                    'rgba(255, 193, 7, 0.4)',
                    'rgba(255, 193, 7, 0.4)',
                    'rgba(255, 193, 7, 0.4)',
                    'rgba(255, 193, 7, 0.4)',
                    'rgba(255, 193, 7, 0.4)'
                ],
                borderColor: [
                    'rgba(255, 193, 7, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(255, 193, 7, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}