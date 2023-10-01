
let button = document.getElementById('button');

let darkMode = localStorage.getItem('darkMode')
darkMode = darkMode == "true"

if(darkMode == true){
    document.body.classList.add('darkMode')
    localStorage.setItem('darkMode', true)
    button.innerHTML='<i class="fa-regular fa-sun sunColor"></i>'
}else if(darkMode == false){
    document.body.classList.remove('darkMode')
    localStorage.setItem('darkMode', false)
    button.innerHTML='<i class="fa-regular fa-moon"></i>'
}

button.addEventListener('click', (evt) =>{
    evt.target.checked;
    document.body.classList.toggle('darkMode')
    if(document.body.classList.contains('darkMode') == true){
        localStorage.setItem('darkMode', true)
        button.innerHTML='<i class="fa-regular fa-sun sunColor"></i>'
    }
    else{
        localStorage.setItem('darkMode', false)
        button.innerHTML='<i class="fa-regular fa-moon"></i>'
    }
})