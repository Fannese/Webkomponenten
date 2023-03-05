class Slider extends HTMLElement{
    constructor() {
        super();
      const shadow=  this.attachShadow({mode:'open'});
      this.shadowRoot.innerHTML=`
      <div class="slider">
      <h1>Hallo</h1>

<slot></slot>
      
        <p>
        <button class="prevBtn">Prev</button>
       picture <span class="currentPicture">1</span>
       <button class="nextBtn">Next</button>
</p>
</div>
<style>
.slider{
width: 500px;
}
p{
text-align: center;
}
</style>
`
      ;

        /*if (!this.hasAttribute('images')){
            console.warn('slider show no Images');
            return;

        if(!this.hasAttribute('width')){
            //Default wert
            this.setAttribute('width', "500");
        } }*/
        //der Attribute in Array umwandeln
        //this.images=this.getAttribute('images').split(',').map(i=>i.trim());
       // this.preload(this.images);

        this.images=[];
        this.images.push("https://3.bp.blogspot.com/-TOB0p76BOw0/WhT4Pl1O52I/AAAAAAAACYg/AmCgAQ01VSU0mD3GqV0meuISBvV9j-NSQCLcBGAs/s1600/DCS09JLtag.jpg");
        this.images.push("https://i.pinimg.com/originals/27/7f/7d/277f7de296757492750bd3a435040966.jpg");
        this.images.push("https://i.pinimg.com/originals/57/7e/c5/577ec5279a42b30e3101d698ec51364c.jpg");
        /*this.images[0]="https://3.bp.blogspot.com/-TOB0p76BOw0/WhT4Pl1O52I/AAAAAAAACYg/AmCgAQ01VSU0mD3GqV0meuISBvV9j-NSQCLcBGAs/s1600/DCS09JLtag.jpg";
        this.images[1]="https://i.pinimg.com/originals/27/7f/7d/277f7de296757492750bd3a435040966.jpg";
        this.images[2]="https://i.pinimg.com/originals/57/7e/c5/577ec5279a42b30e3101d698ec51364c.jpg";*/
        this.totalImages=this.objectLength(this.images)
        this.preload(this.images);
        //this.totalImages= Object.keys(this.images.length);
        this.curent=0;
       /* const wrapper=document.createElement('div');
        wrapper.innerHTML=`
<slot></slot>
        <img id ="currentImage" src="${this.images[this.curent]}">
        <p>
        <button id ="prevBtn">Prev</button>
       picture <span id="currentPicture">1</span> of ${this.totalImages}
       <button id ="nextBtn">Next</button>
</p>*/
/*<style>
div{
width: 500px;
}
p{
text-align: center;
}
</style>
        `;*/
        this._nextButton=this.shadowRoot.querySelector('.nextBtn');
        this._prevButton=this.shadowRoot.querySelector('.prevBtn');
        this._currentPicture=this.shadowRoot.querySelector('.currentPicture');
       this._image=this.shadowRoot.querySelector('.currentImage');


    }

    connectedCallback(){

        this._nextButton.addEventListener('click', this.nextImage.bind(this));
        this._prevButton.addEventListener('click',this.prevImage.bind(this));

    }
    disconnectedCallback(){
this._nextButton.removeEventListener('click',this.nextImage.bind(this));
console.log('disconnected!')
    }
    nextImage(){
        if (this.curent+1==this.totalImages)
            return;
        this.curent++;
        this.updateImage();
        console.log('register Prev clickEventImages',this.totalImages);
    }
    prevImage(){
        if (this.curent==0)
            return;
        this.curent--;
        this.updateImage();
        console.log('register clickEventImages',this.totalImages);
    }
    objectLength(obj) {
        let result = 0;
        for(let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                result++;
            }
        }
        return result;
    }

    updateImage(){

        const  imageSlide =this.shadowRoot.querySelector('.total');
       // this._image =document.querySelector(".total")
        this._image= document.createElement('img');
        this._image.src=this.images[this.curent];
        this._currentPicture.innertext=this.curent+1;
       /* if (this._image){
            this._image.src=this.images[this.curent];
        }
         {

            this._image.src="";
        }*/


    imageSlide.appendChild(this._image);
    }
    preload(i){
        for (let x=0; x<i.length;x++){
            let img = new Image();
            //img.src=i[x];
            const slider = this.shadowRoot.querySelector('.slider');
            img = document.createElement('img');
            img.setAttribute('alt','image alt');
           img.setAttribute('class','navbar-brand')
            img.src =i[x];
            img.style.width = '300px';
            slider.appendChild(img);

            const span = this.shadowRoot.querySelector(".currentPicture");
            const div=document.createElement('div');
            div.setAttribute('class',"total");
            div.textContent= `of ${this.totalImages}`;
            span.appendChild(div);

            console.log("next",i[x]);
         console.log('register clickEventImages',this.totalImages);
        }
   }
}
customElements.define('ba-slider',Slider)