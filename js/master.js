// gloable variables
// select landing page element
let landingPage=document.querySelector('.landing-page');


//Get array of images
let imgsArray=['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'];

let index=0;
let mainColor=localStorage.getItem('mainColor');
let  backgroundInterval;
let backgroundOption=true;

// geting list li colors items 
const colorList=document.querySelectorAll('.colors-list li');

// toggel spin class on icon
document.querySelector('.setting-box .fa-gear').onclick=function(){
    this.classList.toggle('fa-spin');
    document.querySelector('.setting-box').classList.toggle('open');
}



// getting main color from loacla storage and index of the target li

if(mainColor!==null)
{
    document.documentElement.style.setProperty('--main--color',mainColor)
    colorList.forEach(li=>{
      //li.dataset.color is custom data atribute
        if(li.dataset.color===mainColor)
        li.classList.add('active');
        else li.classList.remove('active')
    })

  

}


//looping on list of li
colorList.forEach(li=>{

// adding click event on li item
li.addEventListener('click',(e)=>{
    
    //set --main--color by li background color on root in css file
    document.documentElement.style.setProperty('--main--color',e.target.dataset.color);
    

  
    //storing click color on loacal storage
    localStorage.setItem("mainColor",e.target.dataset.color);

    changeActive(e)
})
});

//getting yes no buttons
document.querySelectorAll('.random-background span').forEach(
    button=>{
        button.addEventListener('click',(e)=>{
            changeActive(e)

                if(e.target.dataset.background==='yes'){
                    backgroundOption=true;
                    // storing true value for backgroud option on loca Storage

                    localStorage.setItem('backgroundOption',backgroundOption);
                    normlizeInterval()
                }
                else{
                    backgroundOption=false

                    // storing false value for backgroud option on loca Storage
                    localStorage.setItem('backgroundOption',backgroundOption);
                    //clearing the interval
                    clearInterval(backgroundInterval)
                    normlizeInterval()
                }
                
        })
    }
);
 

//getting background option from local storage

if(localStorage.getItem('backgroundOption')!==null)
{

    //removing active class from yes no buttons
    document.querySelectorAll('.random-background span').forEach(
        item=>{item.classList.remove('active')}
    )

    //checking the value from local storage is true string because that returns string value
     if(localStorage.getItem('backgroundOption') == 'true')
    {
    
        //adding active class to yes button
        document.querySelector('.yes').classList.add('active')
        backgroundOption=true

    }
    else
    {
        // adding active class to no button
        document.querySelector('.no').classList.add('active')
        backgroundOption=false


    }
}



function normlizeInterval()
{
    if(backgroundOption===true){
   
        backgroundInterval=setInterval(()=>{
        // let randomNumber=Math.floor(Math.random()*imgsArray.length);
        let indicatorsArr=document.getElementsByClassName('indicator-item');
        for(var x=0;x<indicatorsArr.length;x++)
         indicatorsArr[x].classList.remove('active')
        if(index+1>=imgsArray.length)
        index=0
        else
        index++
        indicatorsArr[index].classList.add('active');
        landingPage.style.backgroundImage="url('images/"+imgsArray[index]+"')" 
    },2000);
}
}

const navLinksList=document.querySelectorAll('.landing-page .header-area .links li a')
 navLinksList.forEach(a=>{
     a.onclick=function(e){
         navLinksList.forEach(a=>{a.classList.remove('active')});
         a.classList.add('active')
     }
 })

 
normlizeInterval();


//create popup box for gallary

//select images selector


let imagesGallary=document.querySelectorAll(".gallary img");

// adding click on image

imagesGallary.forEach(image=>{
    image.addEventListener("click",(e)=>{
        //create overlay element
        let overlay=document.createElement("div");
        //adding class to overlay
        overlay.className="popup-overlay";
        //append overlay to body
        document.body.appendChild(overlay);
        
        //create popupbox
        let popupBox=document.createElement("div");
        popupBox.className="popup-box"

        //create heading
        if(image.alt!==null)
        {
            let imageHeading=document.createElement("h3");
            let imageText=document.createTextNode(image.alt);
            imageHeading.appendChild(imageText);
            popupBox.appendChild(imageHeading);
        }
        //create image element
        let popupImage=document.createElement("img");
        popupImage.src=image.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);
   
        // create close button
        let closeButton=document.createElement("span");
        let closeTex=document.createTextNode("X");
        closeButton.appendChild(closeTex);
        closeButton.className="close-button";
        popupBox.appendChild(closeButton)
    });
});

//adding click event on close button
document.addEventListener("click",function(e){

    if(e.target.className=="close-button")
    {
        e.target.parentElement.remove();
        document.querySelector(".popup-overlay").remove();
    }

});


//this section for scrolling to item in smooth

let bullets=document.querySelectorAll(".nav-bullets .bullet");
let links=document.querySelectorAll('.links a');

function scrollToElemnt(elements)
{
    
    elements.forEach(element=>{
        element.addEventListener("click",(e)=>{
            e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView(
          {  behavior:'smooth'}
        );
    
    });
    
    });
}

scrollToElemnt(bullets);
scrollToElemnt(links);

//this section to show button up scroll
let scrollButton=document.querySelector('.scrolltop-button')
// select skills selector
let oursSkills=document.querySelector(".skills");

window.onscroll=function()
{

    // skills offset top

let skillOffsetTop=oursSkills.offsetTop;
this.console.log(skillOffsetTop)

// skills outer Height
let skillsOffsetHeight=oursSkills.offsetHeight;
//  this.console.log("height"+skillsOffsetHeight)


//window height
let windowHeight=this.innerHeight;
// this.console.log(windowHeight)

//window scrollTop
let windowScrollTop=this.pageYOffset;
// this.con sole.log('scroll to top '+windowScrollTop)

if(windowScrollTop>=(skillOffsetTop+skillsOffsetHeight-windowHeight-200))
{
    // this.console.log("+++++++")

    // this.console.log("reached")
    // this.console.log("========")
    let allskills=document.querySelectorAll(".skills .skill-box .skill-progress span");

    allskills.forEach(skill=>{
        skill.style.width=skill.dataset.progress;
    })

}
if(windowScrollTop>=700)
scrollButton.style.display='block';
else 
scrollButton.style.display='none';

};

// window.onscroll=function(){

//     let scrolltop=this.pageYOffset;
//     // console.log('scroll '+scrolltop)
   
// };

scrollButton.addEventListener('click',(e)=>{
    document.querySelector(".landing-page").scrollIntoView(
        {
            behavior:'smooth'
        }
    )
})

//handle active state
function changeActive(event){
    event.target.parentElement.querySelectorAll('.active').forEach(
        elemnt=>{elemnt.classList.remove('active')}
    );
    //adding active class to clicked li 
    event.target.classList.add('active')
}

let bulletsOptions=document.querySelectorAll('.bullets-option span');
let bulletsContainer=document.querySelector('.nav-bullets')
let bulltesLocalItem=localStorage.getItem('bulletsOption');

if(bulltesLocalItem!==null)
{
    console.log(bulltesLocalItem)
    
    bulletsOptions.forEach(span=>{span.classList.remove('active')});
        if(bulltesLocalItem==='block'){
            document.querySelector('.bullets-option .yes').classList.add('active')
            bulletsContainer.style.display="block";
        }else{
            document.querySelector('.bullets-option .no').classList.add('active')
            bulletsContainer.style.display="none"
        }
}

bulletsOptions.forEach(option=>{
    option.addEventListener('click',(ev)=>{
        if(ev.target.dataset.display==='show'){

        bulletsContainer.style.display="block"
        localStorage.setItem('bulletsOption','block')
    }
    else{
        bulletsContainer.style.display="none"
        localStorage.setItem('bulletsOption','none')
    }
    changeActive(ev)
    })
})

//select rest button
document.querySelector('.rest-button').onclick=function(e){
    e.stopPropagation();    
    localStorage.clear();
    window.location.reload();
}

//select toggel button
let toggelBtn=document.querySelector(".toggel-menu");
let menuLinks=document.querySelector('.links');
toggelBtn.onclick=function(){
  //toggel class menu-active on menu button
    this.classList.toggle('menu-active');
    //toggel class open on menu links
    menuLinks.classList.toggle('open')
}

// click any where Outside menu and toggel menu
document.addEventListener('click',(e)=>{

    if(e.target!==toggelBtn&&e.target!==menuLinks)
    {
        if(menuLinks.classList.contains('open'))
            {
                 //toggel class menu-active on menu button
                 toggelBtn.classList.toggle('menu-active');
                 //toggel class open on menu links
                 menuLinks.classList.toggle('open')
            }
    }
});
menuLinks.onclick=function(e){
    e.stopPropagation();
}