class Dropdown extends HTMLElement {
    constructor() {
        super();
        console.log('fineee');
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
<style>
.dropdown{
    position: relative;
    display: inline-block;
}
.dropdown-toggle{
    border: none;
    background-color: lightseagreen;
    color: #333;
    cursor: pointer;
    padding: 10px;
    font-size: 16px;
    transition: 1.5s;
    left: 50%;
    top: 50%;
    transform: translate(70%, 50%);
}
.dropdown-toggle:hover{
    background-color: #eee;
}
.dropdown-menü{
    position: absolute;
    z-index: 1;
    background-color: #fff;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 5px;
    padding:10px;
    display: none;

}
.dropdown-menü a{
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #333;
}
.dropdown-menü a:hover{
    background-color: #eee;
}
.dropdown:hover .dropdown-menü{
    display: block;
}
::slotted(p){
    border: 2px;
    text-align: center;
    font-size: 1.5rem;
    font-family: sans-serif;
    padding: 2px;
    justify-content: center;

}
.details{
    justify-content: space-between;
    flex-direction: row-reverse;
    display: flex;
    align-self: center;
}
.details img{
    width: 480px;
    height: 500px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    margin: 2.5rem;
    

}
.details p{
    align-items: center;
    display: flex;
    margin: 1.5rem;
    padding-top: 5rem;
    font-size: 1.5rem;
 
}
.details h2{
   display: flex;
   position: absolute;
   
</style>
<slot></slot>
<div class="dropdown">
  <button class="dropdown-toggle">
    Film auswählen
  </button>
  <ul class="dropdown-menü">
  </ul>
</div>
<div class="details">
<h2></h2>
<p></p>

</div>
<ba-modal>
 <h2 slot="modal-title">Bitte bestätigen um Details anzusehen!</h2>
                <p slot="modal-text">
                    We and our partners store and/or access information on a device, such as cookies 
                    and process personal data, such as unique identifiers and standard information sent by 
                    a device for personalised ads and content, ad and content measurement, and audience insights,
                     as well as to develop and improve products. With your permission we and our partners may use
                      precise geolocation data and identification through device scanning. You may click to consent 
                      to our and our partners’ processing as described above. Alternatively you may click to refuse 
                      to consent or access more detailed information and change your preferences before consenting. 
                      Please note that some processing of your personal data may not require your consent, but you have
                       a right to object to such processing. Your preferences will apply to this website only.
                     You can change your preferences at any time by returning to this site or visit our privacy policy.
                </p>
</ba-modal>
       `;

    }

    connectedCallback() {
        //meine Elemente mit der DOM verbinden und freigeben
        this.loadData();

    }

    async loadData() {
        // console.log("data");
        const resp = await fetch("../webcomponents/Dropdown/service.json")
            .then(response => response.json());
        console.log(resp);
        this.render(resp.items);// übergabe der Daten an die render methode

    }

    render(items) {
        const modal = this.shadowRoot.querySelector('ba-modal');
        //const modalMainSection = document.createElement('section');
        const menu = this.shadowRoot.querySelector('.dropdown-menü');
        items.forEach((item) => {
            const link = document.createElement('a');
            link.setAttribute('href', "#");
            link.textContent = item.name;
            console.log('register clickEvent',item);
            link.addEventListener('click', () => {
                modal.setAttribute('opened', '');
                modal.addEventListener('cancel',()=>{
                    console.log('canceled.....');
                    this.details = this.shadowRoot.querySelector('.details');
                    this.details.innerHTML=``;
                })
                modal.addEventListener('confirm',()=>{
                    console.log('confirm');
                    this.details = this.shadowRoot.querySelector('.details');
                    this.details.innerHTML=``;
                    this.filmTitle = document.createElement('h2');
                    this.detailDescription = document.createElement('p');
                    this.filmImage = document.createElement('img');
                    this.shadowRoot.querySelector('.details').appendChild(this.filmTitle);
                    this.shadowRoot.querySelector('.details').appendChild(this.detailDescription);
                    this.shadowRoot.querySelector('.details').appendChild(this.filmImage);
                    this.showDetails(item);
                })

            });

            menu.appendChild(link);

        });

    }

    //Detail Anschicht
    showDetails(item) {
        this.filmTitle.textContent = item.title;
        this.filmImage.src = item.image;
        this.detailDescription.textContent = item.description;
    }

    disconnectedCallback() {
        // this.loadData();
    }
}

customElements.define('ba-dropdown', Dropdown);