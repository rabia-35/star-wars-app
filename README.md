# Star Wars's Starships App

* React
* Redux
* React-Router
* Axios
* Fortawesome

## Kurulum

1. Clone the repo

```sh
git clone https://github.com/rabia-35/star-wars-app.git
```

2. Run project

```sh
npm run start
```

## Komut Dosyaları

1. Projeyi ayağa kaldırmak için

```sh
npm start
```

2. Projeyi dağıtmak için

```sh
npm run build
```
#### Netlify
[![Netlify Status](https://api.netlify.com/api/v1/badges/3b0f0243-a5de-4628-a11c-6ad63bdc5616/deploy-status)](https://app.netlify.com/sites/starwars-starships-app/deploys)

### Proje Açıklaması
 Bu projemde `axios` ile starships datalarını çektim. Data linkleri page parametresi ve 4 page bulunmakta `${process.env.REACT_APP_API_BASE_ENDPOINT}/?page=${page}` Load More butonu ile tek tek pull etmek yerine döngü içerisinde tek seferde tüm dataları çektim buradaki amacım search kısmına sayfada olmayan starship ismi/model yazıldığında da datanın filter edilebilmesi.
 
 Search kısmına eşleşmeyen bir text yazıldığında Error mesajı görülmektedir.
 
Card kısmındaki görsele basınca Detail sayfasına yönlendirme olmakta veya direk Detail butonuna basarakta yönlendirilebilirsiniz.

```javascript
{<Link
      to={`/starships/${detailName}`}
      className="btn btn-outline-warning "
       >
        Detail
</Link>
} 
```
 Starships sayfasının dışında bir yerde iseniz size oraya yönlendirmenizi sağlayacak `Back to Starships Page` butonu bulunmaktadır. 
 ```javascript
 {
 <Link
          to="/starships"
          className="back-page text-decoration-none text-muted d-flex align-items-center"
        >
          <FontAwesomeIcon icon={faCaretLeft} className="fa-2x" />
          <span>Back to Starships Page</span>
        </Link>
 }
 ```
 Starships sayfasında alt kısmınlara indikten sonra en üst kısma çıkmak için `Back to top` butonu bulunmakta
 ```javascript
 {
 <div
            role="button"
            className="text-muted text-center mt-3"
            onClick={scrollWin}
          >
            <FontAwesomeIcon icon={faChevronUp} className="fa-2x me-2" />
            <p>Back to top</p>
          </div>
 }
 ```
  ```javascript
 {
const scrollWin = () => {
    window.scrollTo(0, 0);
  };
 }
 ```
 Starship'i favorilere eklemek isterseniz Card içinde favori ekleme iconu bulunmakta. Favoriler kısmında icon değişmektedir ve favoriden kaldırma iconu gelmektedir. 
 ```javascript
 {
  <div onClick={handleClick} role="button">
                    <FontAwesomeIcon
                      icon={faStar}
                      className={
                        favorites.includes(starship)
                          ? "text-warning"
                          : "text-secondary"
                      }
                    />
 }
 ```   
 Navbar içerisnde theme'yı değiştirecek iconlar bulunmakta ve theme sayfa render edilsebile en son haliyle kalması için `localStorage` üzerinden alınmakta. 
```javascript
{
localStorage.setItem("theme", JSON.stringify(!state.mode));
      state.mode = JSON.parse(localStorage.getItem("theme"));
}
```

### Proje Videosu
[recording-2022-09-30-22-53-21.webm](https://user-images.githubusercontent.com/85495654/193346808-bebf9de0-ebba-4185-87c1-39048f545a17.webm)
