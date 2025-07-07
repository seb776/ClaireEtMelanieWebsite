import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MenuItem, { type IMenuSubCategory } from './MenuItem';

interface IMenuItem {
  image: string;
  scale: number;
  top: number;
  left: number;
  linkTo?: string;
  subCategories?: IMenuSubCategory[];
  categoryName?:string;
}

const menuItems: IMenuItem[] = [
  {
    image: './objects/bouche.png',
    top: 10, left: -10,
    scale: 1.2,
    categoryName: "Le théatre",
    subCategories: [
      {
        linkTo: 'https://www.claire-et-melanie.com/articles/boulevard-du-queer',
        image: './menuImages/BoulevardDuQueer.jpg',
        angle: 2.0,
        title: 'Boulevard du Queer'
      },
      {
        linkTo: 'https://www.claire-et-melanie.com/articles/au-theatre-ce-soir',
        image: './menuImages/fisheye.png',
        angle: 2.8,
        title: 'Boulevard Augmenté'
      }
    ]
  },
  {
    image: './objects/BOY.png',
    top: -10, left: -20,
    scale: 0.7,
    linkTo: 'https://www.claire-et-melanie.com/articles/qui-sont-claire-melanie'
  },
  {
    image: './objects/chaussette.png',
    top: 15, left: 23,
    scale: 1.2,
    linkTo: 'https://www.claire-et-melanie.com/articles/tv-de-clairemelanie'

  },
  {
    image: './objects/BrainWebsite.png',
    top: -10, left: 20,
    scale: 1.,
    linkTo: 'https://www.tiktok.com/@claireetmelanie?_t=ZN-8xOHostvrYU&_r=1'

  },
  {
    image: './objects/glacepistache.png',
    top: -10, left: 10,
    scale: 1.4,
    linkTo: 'https://www.instagram.com/claireetmelanie/'
  },
]

function App() {
  const refClairDiv = useRef<HTMLDivElement>(null);
  const [ subMenuIndex, setSubMenuIndex ] = useState(-1);
  const [ categoryName, setCategoryName ] = useState("");
  function onEnterSubMenu(index: number) {
    setSubMenuIndex(index);
  }

  function onQuitSubMenu() {
    setSubMenuIndex(-1);
  }
  useEffect(()=>{
    if (subMenuIndex < 0)
      setCategoryName("");
    else
      setCategoryName(menuItems[subMenuIndex].categoryName ?? "");
  }, [subMenuIndex])

  useEffect(()=>{
    if (refClairDiv.current) {
      refClairDiv.current.addEventListener("animationend", ()=>{
        for (let i = 0; i < menuItems.length; ++i) {
          const elem = document.getElementById("divMenuItemParent" + i);
          if (elem) {
            const centerOffX = '50px'
            const centerOffY = '65%'
            const globOffX = '50px'
            const globOffY = 'min(25vh, 25vw)'
            const offX = menuItems[i].left;
            const offY = menuItems[i].top;
            elem.animate([
              {top: `calc(${centerOffY})`, left: `calc(50% - ${centerOffX})`, visibility: 'hidden', transform: 'scale(0)'},
              {top: `calc(50%  - 1.5 * ${offY}% - ${globOffY})`, left: `calc(50% - 1.5 * ${offX}% - ${globOffX})`, visibility: 'visible', transform: 'scale(1)'}
            ], {delay: 100+i*1000*0.5, duration: 850, iterations: 1, fill: 'forwards', easing: 'linear(0, 0.417 25.5%, 0.867 49.4%, 1 57.7%, 0.925 65.1%, 0.908 68.6%, 0.902 72.2%, 0.916 78.2%, 0.988 92.1%, 1)'})
          }
        }
      });
    }
  }, []);

  return (
      <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', zIndex: 99, color: 'white', textAlign: 'center', width: "max(300px, 50%)", fontFamily: 'Fulldozer', fontSize: '200%', marginTop: '16px', left: '50%', transform: 'translateX(-50%)'}}>
        <div>
            Claire & Mélanie
          </div>
          <div style={{fontSize: '70%', textAlign: 'center'}}>
            {categoryName}
          </div>
        </div>
        <div id="claireEtMelFaces" style={{}}>
          <div ref={refClairDiv} style={{animation: 'claireanim', top: -50, animationDuration: '2s', animationFillMode: 'forwards', position: 'absolute', left:'100%', width:1500, aspectRatio: 1, backgroundSize: 'cover', backgroundImage: 'url(./Claire.png)'}}></div>
          <div style={{animation: 'melanim', top: -80, animationDuration: '2s', animationFillMode: 'forwards', position: 'absolute', left:'100%', width:1250, aspectRatio: 1, backgroundSize: 'cover', backgroundImage: 'url(./Melanie.png)'}}></div>
        </div>
        {/* <div style={{position: 'absolute', transform: 'translateX(-50%)', width:1500, aspectRatio: 1, backgroundSize: 'cover', backgroundImage: 'url(./Melanie.png)'}}></div> */}
        {menuItems.map((el, i)=> 
        <div key={"divMenuItemParent" + i} id={"divMenuItemParent" + i} style={{position: 'absolute', top: '50%', left: '50%', visibility: 'hidden'}}>
          <div style={{display: subMenuIndex === -1 ? 'block' : (i === subMenuIndex ? 'block' : 'none')}}>
          <MenuItem scale={el.scale} onEnter={onEnterSubMenu} onLeaveSubMenu={onQuitSubMenu} index={i} image={el.image} linkTo={el.linkTo} subCategories={el.subCategories}/>
          </div>
          </div>
        )}
      </div>
  )
}

export default App
