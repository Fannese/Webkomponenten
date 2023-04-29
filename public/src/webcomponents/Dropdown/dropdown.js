class Dropdown extends HTMLElement {
    constructor() {
        super();
        console.log('fineee');
        this.attachShadow({mode: 'closed'});
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
    position: inherit;;
    z-index: 1;
    background-color: #fff;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 5px;
    padding:10px;
    margin: 5rem;
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
 
    margin: 2.5rem;
    font-size: 1.5rem;
    font-family: sans-serif;
    padding: 2px;
    justify-content: center;

}
.details{
    justify-content: space-between;
    flex-direction: row-reverse;
    align-self: center;
    padding-top: 5rem;
}
.details img{
    justify-content: center;
    width: 480px;
    height: 500px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    margin: 2.5rem;
    display: flex;
}
.details p{
    align-items: center;
    display: flex;
    margin: 1.5rem;
    font-size: 1.5rem;
 
}
.details h2{
justify-content: center;
   display: flex;
  
  }
  @media screen and (max-width: 600px){
  ::slotted(p) {
  display: contents;
  align-items: inherit;
  font-size: 1rem;
  font-family: sans-serif;
   margin: 1rem;
    }
   .details{
  display: grid;
  padding-top: 5rem
  }
  .details p{
  font-size: 1rem;
  }
  .details h2{
      margin: 1rem;
  }
  .details img{
    width: 20rem;
  }
  
  } 
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
       `;

    }

    connectedCallback() {
        this.loadData();
        this._text=this.getAttribute('text');
        this._dropdownText=document.createElement('div');
        this._dropdownText.textContent=this._text
        this._dropdownText.style="justify-content:center;display: flex;padding-top: 2rem";
        this.appendChild(this._dropdownText)

    }

    async loadData() {
        const resp = await fetch("../webcomponents/Dropdown/service.json")
            .then(response => response.json());
        console.log(resp);
        this.render(resp.items);// übergabe der Daten an die render methode

    }

    render(items) {
        const menu = this.shadowRoot.querySelector('.dropdown-menü');
        items.forEach((item) => {
            const link = document.createElement('a');
            link.setAttribute('href', "#");
            link.textContent = item.name;
            link.addEventListener('click', () => {
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

            menu.appendChild(link);

        });

    }

    //Detail Anschicht
    showDetails(item) {
        this.filmTitle.textContent = item.title;
        this.filmImage.src = item.image;
        this.detailDescription.textContent = item.description;
    }
}

customElements.define('ba-dropdown', Dropdown);