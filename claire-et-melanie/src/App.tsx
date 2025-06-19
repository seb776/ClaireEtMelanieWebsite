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
}

const menuItems: IMenuItem[] = [
  {
    image: './objects/bouche.png',
    top: 10, left: -10,
    scale: 1.2,
    subCategories: [
      {
        linkTo: 'variete.html',
        image: './objects/cheminee.jpg',
        angle: 1.5
      },
      {
        linkTo: 'sketch.html',
        image: './objects/cheminee.jpg',
        angle: 2.5
      }
    ]
  },
  {
    image: './objects/BOY.png',
    top: -10, left: -20,
    scale: 0.7,
    linkTo: 'boy.com'
  },
  {
    image: './objects/chaussette.png',
    top: 15, left: 23,
    scale: 1.2,
    subCategories: [
      {
        linkTo: 'theatre1.html',
        image: './objects/cheminee.jpg',
        angle: 0
      },
      {
        linkTo: 'theatre2.html',
        image: './objects/cheminee.jpg',
        angle: 0.7
      }
    ]
  },
  {
    image: './objects/Brain.png',
    top: -10, left: 20,
    scale: 1.,
    linkTo: 'bio.html'

  },
  {
    image: './objects/glacepistache.png',
    top: -10, left: 10,
    scale: 1.4,
    linkTo: 'pistache.html'
  },
]

function App() {
  const refClairDiv = useRef<HTMLDivElement>(null);
  const [ subMenuIndex, setSubMenuIndex ] = useState(-1);
  function onEnterSubMenu(index: number) {
    setSubMenuIndex(index);
  }

  function onQuitSubMenu() {
    setSubMenuIndex(-1);
  }

  useEffect(()=>{
    if (refClairDiv.current) {
      refClairDiv.current.addEventListener("animationend", ()=>{
        for (let i = 0; i < menuItems.length; ++i) {
          const elem = document.getElementById("divMenuItemParent" + i);
          if (elem) {
            const centerOffX = '50px'
            const centerOffY = '65%'
            const globOffX = '100px'
            const globOffY = '120px'
            const offX = menuItems[i].left;
            const offY = menuItems[i].top;
            elem.animate([
              {top: `calc(${centerOffY})`, left: `calc(50% - ${centerOffX})`, visibility: 'hidden', transform: 'scale(0)'},
              {top: `calc(50%  - 1.5 * ${offY}% - ${globOffY})`, left: `calc(50% - 1.5 * ${offX}% - ${globOffX})`, visibility: 'visible', transform: 'scale(1)'}
            ], {delay: 500+i*1000*0.8, duration: 1000, iterations: 1, fill: 'forwards', easing: 'ease-out'})
          }
        }
      });
    }
  }, []);

  return (
      <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', zIndex: 99, color: 'white', fontFamily: 'Fulldozer', fontSize: '30pt', marginTop: '50px', left: '50%', transform: 'translateX(-50%)'}}>
          Claire & Mélanie
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
