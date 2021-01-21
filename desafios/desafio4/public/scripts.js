const localePathname = location.pathname;
const links = document.querySelectorAll('.links a');

for(link of links){
    if(localePathname.includes(link.getAttribute('href'))){
        link.classList.add('active');
    }
}