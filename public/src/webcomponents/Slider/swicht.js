/*
class Swicht extends HTMLElement{
    constructor() {

        super();
       this.attachShadow({mode:'open'});
       this.shadowRoot.innerHTML=`
                <style>
                    .slider{
                    max - width: 1000px;
                    position: relative;
                    margin: auto;
                }
                    img {vertical - align: middle;}

                    .preview-btn, .next-btn {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    width: auto;
                    padding: 16px;
                    margin-top: -22px;
                    color: white;
                    font-weight: bold;
                    font-size: 18px;
                    transition: 0.6s ease;
                    border-radius: 0 3px 3px 0;
                    
                }
                    .preview-btn:hover, .next-btn:hover {
                    background - color: rgba(0, 0, 0, 0.8);
                }
                    .next-btn{
                    right: 4rem;
                    border-radius: 3px 0 0 3px;
                }
                    .preview-btn{
                    left: -2rem;
                    border-radius: 3px 0 0 3px;
                }
                    @media only screen and (max-width: 300px) {
                    .preview-btn, .next-btn{font-size: 11px}
                }
                </style>
              
                <div class="slideshow-container">
                    <div class="slider">
                      <slot></slot>
  <!--<div class="numbertext">1 / 3</div>
  <img src="https://i.pinimg.com/originals/57/7e/c5/577ec5279a42b30e3101d698ec51364c.jpg" alt="...." style="width:100%">
  <div class="text">Caption Text</div>
</div>

<div class="slider">
  <div class="numbertext">2 / 3</div>
  <img src="https://i.pinimg.com/originals/27/7f/7d/277f7de296757492750bd3a435040966.jpg" alt="..." style="width:100%">
  <div class="text">Caption Two</div>
</div>

<div class="slider">
  <div class="numbertext">3 / 3</div>
  <img src="https://3.bp.blogspot.com/-TOB0p76BOw0/WhT4Pl1O52I/AAAAAAAACYg/AmCgAQ01VSU0mD3GqV0meuISBvV9j-NSQCLcBGAs/s1600/DCS09JLtag.jpg" alt="..." style="width:100%">
  <div class="text">Caption Three</div>
</div>-->

<a class="preview-btn">&#10094</a>
<a class="next-btn" >&#10095</a>
<!--
</div>
<br>

<div style="text-align:center">
  <span class="dot"></span> 
  <span class="dot"></span> 
  <span class="dot"></span> 
</div>-->
</div>
                
                
                
              <!--  <div className="slider">
                    <button className="preview-btn">&#10094;</button>
                    <button className="next-btn">&#10095;</button>

                </div>
           -->

`;
            /!*this.prevBtn=null;
        this.nextBtn=null;
        //this.bild=[];
        this.slideElement= null;
        this._currentIndex = 1;
        //holen der Template-Element und Inhalt
        const template= document.querySelector('#slider-template');
        this.attachShadow({mode:"open"});
        //hinzufügen der Template Inhalt zu shadow-Dom
        this.shadowRoot.appendChild(template.content.cloneNode(true));*!/

       //this.interval=parseInt(this.getAttribute("interval"))|| 5000;


    }
    connectedCallback(){
        this.nextBtn=this.shadowRoot.querySelector('.next-btn');
        this.changeImage();
       /!* setTimeout("this.changeImage",1000)
        ;
        this.nextBtn=this.shadowRoot.querySelector('.next-btn');*!/
        this.nextBtn.addEventListener('click', this.changeImage.bind(this));
    }

    changeImage(){
        let i= 0;
        let time=3000;
       const images=[];
        images[0]="https://3.bp.blogspot.com/-TOB0p76BOw0/WhT4Pl1O52I/AAAAAAAACYg/AmCgAQ01VSU0mD3GqV0meuISBvV9j-NSQCLcBGAs/s1600/DCS09JLtag.jpg";
        images[1]="https://i.pinimg.com/originals/27/7f/7d/277f7de296757492750bd3a435040966.jpg";
        images[2]="https://i.pinimg.com/originals/57/7e/c5/577ec5279a42b30e3101d698ec51364c.jpg";
        const slider = this.shadowRoot.querySelector('.slider');
            //const img=  this.bild=[this.currentIndex]
            this.slideElement = document.createElement('img');
            this.slideElement.setAttribute('alt','image alt');
            this.slideElement.setAttribute('class','navbar-brand')
            this.slideElement.src =images[i];
            this.slideElement.style.width = '300px';
            slider.appendChild(this.slideElement);
            console.log("next",images[i]);
            console.log(images.length)
    }

 /!*loadData(){
        const slides=[
            {
            image:"https://i.pinimg.com/originals/57/7e/c5/577ec5279a42b30e3101d698ec51364c.jpg"
        },
            {image:"https://3.bp.blogspot.com/-TOB0p76BOw0/WhT4Pl1O52I/AAAAAAAACYg/AmCgAQ01VSU0mD3GqV0meuISBvV9j-NSQCLcBGAs/s1600/DCS09JLtag.jpg"},
            {image:"https://i.pinimg.com/originals/27/7f/7d/277f7de296757492750bd3a435040966.jpg"}]

      this._bild=slides;
   // this._renderImages(images.items)

        this._slider = this.shadowRoot.querySelector('.slider');
        slides.forEach(item=>{
            //const img=  this.bild=[this.currentIndex]
            this.slideElement=document.createElement('img');
            this.slideElement.src=item.image;
            this.slideElement.style.width='300px';
            this._slider.appendChild(this.slideElement);

        })

    }
connectedCallback(){
        //initialisierung der Elemente
this.loadData();
    this.prevBtn= this.shadowRoot.querySelector('.preview-btn');
    this.nextBtn=this.shadowRoot.querySelector('.next-btn');
    this.slideElement= document.querySelector('.slider img');

    this.prevBtn.addEventListener('click', this.previewSlider.bind(this));
    this.nextBtn.addEventListener('click', this.nextSlide.bind(this));
    }

previewSlider(){
 this._currentIndex=(this._currentIndex===0) ? this._bild.length -1 : this._currentIndex -1;
    this._slider= this._bild[this._currentIndex];
    console.log("PreviweSlider",this._slider)
    console.log(this._currentIndex)


    }
    nextSlide(){

       // const slider = this.shadowRoot.querySelectorAll('.slider img');
        this._currentIndex=(this._currentIndex===this._bild.length -1) ? 0 : this._currentIndex +1;
        this._slider = this._bild[this._currentIndex];
        console.log("next slider:", this._slider )
        console.log(this._currentIndex)

    }
*!/
    disconnectedCallback(){
        //this.shadowRoot.removeEventListener('click',this.previewSlider.bind(this));
        this.shadowRoot.removeEventListener('click',this.changeImage().bind(this));
    }

}
customElements.define('ba-slider', Swicht);*/
