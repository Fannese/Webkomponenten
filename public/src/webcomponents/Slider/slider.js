class Slider extends HTMLElement{
    constructor() {
        super();
      this.attachShadow({mode:'open'});
      this.shadowRoot.innerHTML=`
      <div class="slider">
<slot></slot>
        <button class="prevBtn">&#10094;</button>
       <span class="currentPicture"></span>
       <div class="slides"></div>
       <button class="nextBtn">&#10095;</button>

</div>
<style>
::slotted(p){
    border: 2px;
    text-align: center;
    font-size: 1.5rem;
    font-family: sans-serif;
    padding: 2px;
    justify-content: center;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;

}
/* Slideshow container */
.total {
  /*max-width: 1000px;
  position: relative;
*/ 
 margin-left: 10rem;
}

   
.slider{
display: flex;
flex-direction: column;
align-items: center;
padding: 0px 0;
margin: 0;
justify-self: center;

}
.slides{
display: flex;
flex-direction: column;
align-items: center;
margin: auto;
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
 
}
.prevBtn{
left:0;
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
width: 50rem;
height: 30rem;

box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);

}
.navbar-brand img{

}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 600px) {
  .total img{
  width: 15rem;
  margin-right: 8rem;
  }
  .slides{
 
  margin: 0rem;
  
  }
   .nextBtn{
    position: absolute;
    top: 125%;
    margin-right: 0rem
  }
  .prevBtn{
    margin-left: 0rem;
    position: absolute;
    top: 125%;
  }
  }
/*}
@media only screen and (min-width: 600px) {
  .prevBtn, .nextBtn {font-size: 15px;
  border-radius: 0 1px 1px 0;}
  .total img{
  width: 400px;
  display: flex;
  margin-right: 8rem;
  }
  .prevBtn {
    margin-left: 3rem;
}
.nextBtn{
margin-right: 2rem;
}

}*/
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
        //this.preload(this.images);
        this.curent=0;
        this._nextButton=this.shadowRoot.querySelector('.nextBtn');
        this._prevButton=this.shadowRoot.querySelector('.prevBtn');
        this._currentPicture=this.shadowRoot.querySelector('.slides');
       this._image=this.shadowRoot.querySelector('.currentImage');
       this.tex="some one"



    }

    connectedCallback(){
    this._nextButton.addEventListener('click', this.nextImage.bind(this));
    this._prevButton.addEventListener('click',this.prevImage.bind(this));
    this.preload(this.images);

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
        //count.textContent= ` 1/ ${this.totalImages}`;
        span.appendChild(count);
        const imageSlide =this.shadowRoot.querySelector('.total');
        this._image= document.createElement('img');
        this._image.src=this.images[this.curent];
        imageSlide.innerHTML=``;
        this._currentPicture.innertext=this.curent+1;
    imageSlide.appendChild(this._image);

    }
    preload(i){

setTimeout(this.updateImage.bind(this), 100)
   }
}
customElements.define('ba-slider',Slider)