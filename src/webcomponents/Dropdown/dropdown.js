import {CdService} from './service.js';
export class Dropdown extends HTMLElement{
    cdService= new CdService();
   constructor() {
       super();
       console.log('fineee');
       this.attachShadow({mode:"open"});
       this.shadowRoot.innerHTML=`
<slot></slot>
       `;
   }
   connectedCallback(){
       const template= document.createElement('template');
       template.innerHTML=`
       <select>
       <option value="" class="bg-primary">select option</option>
</select>
       `
this.appendChild(template.content.cloneNode(true));
   }
   _render(){
       const data=this.cdService.list();
   }
}
customElements.define('ba-dropdown',Dropdown);