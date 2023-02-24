class Dropdown extends HTMLElement{
   constructor() {
       super();
       console.log('fineee');
       this.attachShadow({mode:'open'});
       this.shadowRoot.innerHTML=`
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
flex-direction: column;
align-items: flex-start;
display: flex;
}
.details img{
width: 480px;
height: 500px;

}
..details p{
align-items: flex-end;
display: flex;
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
<ba-modal>
 <h2 slot="modal-title">Bitte bestätigen um Details anzusehen!</h2>
                <p slot="modal-text">
                    “Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>
</ba-modal>
       `;
       this.details= this.shadowRoot.querySelector('.details');
       this.filmTitle=this.shadowRoot.querySelector('.details h2');
      //this.filmImage=this.shadowRoot.querySelector('.details img');
       this.detailDescription=this.shadowRoot.querySelector('.details p');
   }
   connectedCallback(){
       //meine Elemente mit der DOM verbinden und freigeben
this.loadData();

   }
   async loadData(){
      // console.log("data");
       const resp= await fetch("../webcomponents/Dropdown/service.json")
           .then(response => response.json());
           console.log(resp)
       /*const data= await response.json();*/
     this.render(resp.items);// übergabe der Daten an die render methode

   }

   render(items) {
       const modal=document.querySelector('ba-modal');
       const menu = this.shadowRoot.querySelector('.dropdown-menü');
      items.forEach((item)=>{
           const link = document.createElement('a');
           link.setAttribute('href',"#");
           link.textContent=item.name;
           link.addEventListener('click',()=>{
               this.filmImage =document.createElement('img');
               this.shadowRoot.querySelector('.details').appendChild(this.filmImage);
               this.showDetails(item);
           });

           menu.appendChild(link);

       });

   }
   //Detail Anschicht
   showDetails(item){
       this.filmTitle.textContent=item.title;
       this.filmImage.src=item.image;
       this.detailDescription.textContent=item.description;
   }

    disconnectedCallback(){
        this.loadData();
    }
}
customElements.define('ba-dropdown',Dropdown);