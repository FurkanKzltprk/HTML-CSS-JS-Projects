
// burada yakalama işlemleri yapıyorum JavaScript üzerinden
const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imagelist-wrapper");
//  burada tüm değerleri yakaladım javascript de artık oynayabilirim. //? classları . id leri # ile unutma.


runEventListeners();

// fonskiyon oluşturdum çalışınca içindeki eventlarımı tetikleyeceğim.
// arama butonuna bastığımda form submit olacak, bir şey gönderiyorum yani.
// todo yani şu : form submit olduğunda sen git unsplash(verileri çekeceğim site)'tan şu resimleri getir.
function runEventListeners() {
    form.addEventListener("submit", search); // biri sana submit ederse f(search)' e git
    clearButton.addEventListener("click", clear);
}
function clear() {
    searchInput.value = "";
    // Array.from(imageListWrapper.children).forEach((child) => child.remove());
    imageListWrapper.innerHTML = "";
}

function search(e) { //burada yazdığım yani aramak istediğim değeri yakalayabilmem lazım (araba,resim,kalem vb.)
    const value = searchInput.value.trim(); // searchInputtan gelen veriyi al trim(bkz.)'le value ye ata.

    //@RequestParam '?' - spring -Rest APİ
    //! fetch APİ 
    //todo 1.Biz burda isteğimizi attık ********
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: "Client-ID LwwzJCycNY8HtdS-v9q_sH5kXNTLgew_MfKN04NNGzY"
        }
    }) //todo **********************************

        //todo 2. cevabımızı ↓↓↓ aldık data olarak  aldık*****
        //todo onun içerisindeki results u aldık
        .then((res) => res.json())
        .then((data) => {
            //todo bana obje döndü objeyi arrays yaptım for each ile döndüm
            //todo sonra içindeki image'in içindeki urls'in içindeki' small'a eriştim ---
            clear();

            // Array.from(data.results).forEach((image) => {
            //console.log(image.urls.small)
            //     //todo --> ELİME SMALL BOYUTTA RESİMİN URLS İ geçti amacım bunu ekrana bastırmak f(x) lazım
            //     addImagetoUI(image.urls.small); // <----- //todo soldkai o  f(x) 
            // })
            data.results.forEach((image, index) => {
                addImagetoUI(image.urls.small, index + 1);
            });



        })
        .catch((err) => console.log(err));

    e.preventDefault(); // bu sayfa sürekli yenilenmesin gelen veriler ekranda dursun diye (araştır)
}



//todo ekrana bastımrak için gereken f(x)

function addImagetoUI(url, index) {

    console.log(imageListWrapper)
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.height = '400';
    img.width = '400';

    const caption = document.createElement("p");
    caption.textContent = `Görsel ${index}`;
    caption.className = "caption";


    div.append(img, caption);
    imageListWrapper.append(div);

}