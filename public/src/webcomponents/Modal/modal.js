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
       
</style>
<div class="modal-backdrop">
<div class="modal">
<header><slot name="modal-title"></slot></header>
<section id="actions">
        <button id="cancel-btn">Cancel</button>
        <button id="confirm-btn">Confirm</button>
</section>
</div>
</div>
`;

        //this.shadowRoot.append(template.content.cloneNode(true));
        this.backdrop = this.shadowRoot.querySelector('.modal-backdrop');
        this.modalText = this.shadowRoot.querySelector('.modal');
        //this.mainSection=this.shadowRoot.querySelector('.main');
        const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
        const confirmButton = this.shadowRoot.querySelector('#confirm-btn');
    }

    showModal() {
        const bb = document.createElement('button');
        const mainSection = document.createElement('section');
        bb.innerHTML = "jhja";
        bb.addEventListener('click', () => {
            mainSection.innerHTML = `
            <slot name="modal-text"></slot>
            `;

        })
        this.modalText.appendChild(mainSection);
        this.backdrop.appendChild(bb);
    }

    connectedCallback() {
        this.showModal();
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