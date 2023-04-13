class Modal extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.attachShadow({mode: 'open'});
        //const template= document.createElement('template');
        this.shadowRoot.innerHTML = `
    <style>
         ::slotted(header){
        padding: 2rem;
        border-bottom: 2px solid #ccc;
        }
       
         :host([opened]) .modal, 
         :host([opened]) .modal-backdrop{
        opacity: 1;
        pointer-events: all;
        }
        .modal-backdrop{
         position: fixed;
        top: 0px;
        left: 0px;
       width: 100%;
       height: 100vh;
       opacity: 0;
       pointer-events: none;
      
       z-index: 10;
        
        }
        .modal{
        display: flex;
    flex-direction: column;
        /*translate: 150%;
        transition: 5s;*/
        opacity: 0;
        pointer-events: none;
        position: fixed;
        top: 25vh;
        left: 25%;
        width: 50%;
       
        z-index: 100;
        background-color: orange;
        border-radius: 3px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        
        }
         #actions{
        border-top: 1px solid #ccc;
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
        }
        #actions button{
        margin: 0 0.25rem;
        }
         #confirm-btn{
         background-color: green;
         }
          ::slotted(h1){
         font-size: 1rem;
         }
         ::slotted(h2){
         padding: 1rem;
         margin: 0.5rem;
       
         }
          ::slotted(p){
         font-size: 1rem;
         margin: 0;
         padding: 1rem;
         border-top: 1px solid #ccc;
         
         }
         @media screen and(min-width: 600px) {
         .modal{
          height: 60rem;
         }
        
         }
       
</style>
<div class="modal-backdrop">
<div class="modal">
<header><slot name="modal-title"><button id="close" style="float: right; margin: 5px; background-color: orange">
      x</button>
<h2>Bitte bestätigen um Details anzusehen!</h2>

</slot></header>
<section>
              
                <p slot="modal-text">
                    We and our partners store and/or access information on a device, such as cookies 
                    and process personal data, such as unique identifiers and standard information sent by 
                    a device for personalised ads and content, ad and content measurement, and audience insights,
                     as well as to develop and improve products. With your permission we and our partners may use
                      precise geolocation data and identification through device scanning. You may click to consent 
                      to our and our partners’ processing as described above. 
                </p>
</section>
<section id="actions">
        <button id="cancel-btn">Cancel</button>
        <button id="confirm-btn">Ok</button>
</section>
</div>
</div>
`;

    }

    connectedCallback() {
        this.backdrop = this.shadowRoot.querySelector('.modal-backdrop');
        this.modalText = this.shadowRoot.querySelector('.modal');
        const close= this.shadowRoot.querySelector('#close');
        const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
        close.addEventListener('click',this._cancel.bind(this));
        cancelButton.addEventListener('click', this._cancel.bind(this));
        const confirmButton = this.shadowRoot.querySelector('#confirm-btn');
        confirmButton.addEventListener('click', this._confirm.bind(this));
    }
    hide() {

        if (this.hasAttribute('opened')) {
            this.removeAttribute('opened');
        }
        this.isOpen = true;
    }
    _cancel(event) {
        this.hide();
        const cancelEvent= new Event('cancel',{bubbles:true, composed:true});
        event.target.dispatchEvent(cancelEvent);
    }
    _confirm(event){
        this.hide();
        const confirmEvent=new Event('confirm',{bubbles:true, composed:true});
        event.target.dispatchEvent(confirmEvent);
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (this.hasAttribute('opened')) {
            this.isOpen = true;
        }
else {
    this.isOpen=false;
        }
    }
    static get observedAttributes(){
        return (['opened'])
    }
}
customElements.define('ba-modal', Modal);