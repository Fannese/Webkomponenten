class Slider extends HTMLElement{
    constructor() {
        super();
      this.attachShadow({mode:'open'});
      this.shadowRoot.innerHTML=`
      <div class="slider">
<slot></slot>
        <p>
        <button class="prevBtn">&#10094;</button>
       <span class="currentPicture"></span>
       <div class="slides"></div>
       <button class="nextBtn">&#10095;</button>
</p>
</div>
<style>
::slotted(p){
    border: 2px;
    text-align: center;
    font-size: 1.5rem;
    font-family: sans-serif;
    padding: 2px;
    justify-content: center;

}
/* Slideshow container */
.total {
  /*max-width: 1000px;
  position: relative;
 */
  margin-left: 20rem;
}
/*.slides{
border: 5px;
background-color: cadetblue;
padding-top: 1rem;
padding-block: 1rem;
margin: 12rem;
}*/

/* Next & previous buttons */
.prevBtn, .nextBtn {
  cursor: pointer;
  position: absolute;
  top: 100%;
  width: auto;
  padding: 16px;
  margin: 10px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.nextBtn {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prevBtn:hover, .nextBtn:hover {
  background-color: rgba(0,0,0,0.8);
}
/* Number text (1/3 etc) */
.currentPicture {
  color: black;
  font-size: 18px;
  padding: 8px 12px;
  position: absolute;
  
 
}
.total img {vertical-align: middle;
width: 600px;
height: 350px;
display: flex;
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
 overflow: hidden
}
.navbar-brand img{

}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .prevBtn, .nextBtn {font-size: 11px}
}
</style>
`
      ;

        this.images=[];
        /*this.images.push("https://3.bp.blogspot.com/-TOB0p76BOw0/WhT4Pl1O52I/AAAAAAAACYg/AmCgAQ01VSU0mD3GqV0meuISBvV9j-NSQCLcBGAs/s1600/DCS09JLtag.jpg");
        this.images.push("https://i.pinimg.com/originals/27/7f/7d/277f7de296757492750bd3a435040966.jpg");
        this.images.push("https://i.pinimg.com/originals/57/7e/c5/577ec5279a42b30e3101d698ec51364c.jpg");*/
        this.images[0]="https://3.bp.blogspot.com/-TOB0p76BOw0/WhT4Pl1O52I/AAAAAAAACYg/AmCgAQ01VSU0mD3GqV0meuISBvV9j-NSQCLcBGAs/s1600/DCS09JLtag.jpg";
        this.images[1]="https://i.pinimg.com/originals/27/7f/7d/277f7de296757492750bd3a435040966.jpg";
        this.images[2]="https://i.pinimg.com/originals/57/7e/c5/577ec5279a42b30e3101d698ec51364c.jpg";
        this.totalImages=this.objectLength(this.images)
        this.preload(this.images);
        this.curent=0;
        this._nextButton=this.shadowRoot.querySelector('.nextBtn');
        this._prevButton=this.shadowRoot.querySelector('.prevBtn');
        this._currentPicture=this.shadowRoot.querySelector('.slides');
       this._image=this.shadowRoot.querySelector('.currentImage');


    }

    connectedCallback(){

        this._nextButton.addEventListener('click', this.nextImage.bind(this));
        this._prevButton.addEventListener('click',this.prevImage.bind(this));

    }
    disconnectedCallback(){
this._nextButton.removeEventListener('click',this.nextImage.bind(this));
this._prevButton.removeEventListener('click',this.prevImage.bind(this));
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
//Slidern von Images
       const span = this.shadowRoot.querySelector(".slides");
        const count=document.createElement('div');
        count.setAttribute('class',"total");
        count.textContent= ` 1/ ${this.totalImages}`;
        span.appendChild(count);
        const imageSlide =this.shadowRoot.querySelector('.total');
        this._image= document.createElement('img');
        this._image.src=this.images[this.curent];
        imageSlide.innerHTML=``;
        this._currentPicture.innertext=this.curent+1;
    imageSlide.appendChild(this._image);

    }
    preload(i){
        /*for (let x=0; x<i.length;x++){
            let img = new Image();
            const slider = this.shadowRoot.querySelector('.slider');
            img = document.createElement('img');
            img.setAttribute('alt','image alt');
            img.setAttribute('class','navbar-brand')
            img.src =i[x];
            img.style.width = '300px';
            img.style.overflow='hidden';
            //img.style.display='none'
            slider.appendChild(img);

            const span = this.shadowRoot.querySelector(".slides");
            const count=document.createElement('div');
            count.setAttribute('class',"total");
            count.textContent= ` 1/ ${this.totalImages}`;
            span.appendChild(count);*/

setTimeout(this.updateImage.bind(this), 100)
         //    console.log("next",i[x]);
         // console.log('register clickEventImages',this.totalImages);
       // }
   }
}
customElements.define('ba-slider',Slider)