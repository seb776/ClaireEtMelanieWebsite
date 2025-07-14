import { useEffect, useRef, useState } from "react";

export interface IMenuSubCategory {
    image: string;
    angle: number;
    linkTo?: string;
    title?: string;
    callback?: () => void;
}

interface IMenuItemProps {
    onEnter: (index: number) => void;
    onLeaveSubMenu: () => void;
    image: string;
    index: number;
    linkTo?: string;
    subCategories?: IMenuSubCategory[];
    scale: number;
    askConfirm?: boolean;
    onAskConfirm: (url: string, hint?: string) => void;
    hint?: string;
}


export default function MenuItem(props: IMenuItemProps) {
    const [selected, setSelected] = useState(false);
    const [categories, setCategories] = useState<IMenuSubCategory[]>();
    const refAudio = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (props.subCategories) {
            setCategories([...props.subCategories,
            {
                image: 'back.png',
                angle: props.subCategories[props.subCategories.length - 1].angle + 0.7,
                callback: props.onLeaveSubMenu,
            }
            ])

        }
    }, [])

    const RADIUS = 35;
    async function onClickButton() {
        if (refAudio.current) {
            if (!props.linkTo) // avoid cutting the sound when page redirects 
                refAudio.current.play();
            setTimeout(() => {
                if (props.linkTo) {
                    //window.location.href = props.linkTo;
                }
            }, refAudio.current.duration);
            if (!props.linkTo) {
                setSelected(true);
                if (props.onEnter) {
                    props.onEnter(props.index);
                }
                console.log(categories)
                if (categories) {
                    for (let i = 0; i < categories.length; ++i) {
                        const elem = document.getElementById("subCategory" + i + props.image);
                        elem?.animate([
                            { top: '0vh', left: '0vw' },
                            { top: `calc(${Math.sin(categories[i].angle) * RADIUS}vh*0.75)`, left: `calc(${Math.cos(categories[i].angle) * RADIUS}vw)` },
                        ], { duration: 500, iterations: 1, fill: 'forwards', easing: 'ease-out' })
                    }
                }
            }
        }

    }
    function onClickButtonCategory(menu: IMenuSubCategory) {
        // menu.linkTo
        if (menu.linkTo) {
            window.location.href = menu.linkTo;
        }
        if (menu.callback) {
            menu.callback();
            setSelected(false);
        }
    }



    return <div>

        <div style={{ transform: `scale(${props.scale})` }}>
            {props.askConfirm &&  <a  target="_top" onClick={()=>props.onAskConfirm(props.linkTo!, props.hint)} id={"divMenuItem" + props.index} className="menuItem" style={{ cursor: 'pointer', width: "min(40vw, 30vh) ", aspectRatio: 1, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${props.image})`, backgroundSize: 'contain' }}>
            </a>}
            {!props.askConfirm && <a href={props.linkTo} target="_top" onClick={onClickButton} id={"divMenuItem" + props.index} className="menuItem" style={{ cursor: 'pointer', width: "min(40vw, 30vh) ", aspectRatio: 1, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundImage: `url(${props.image})`, backgroundSize: 'contain' }}>
            </a>}
            <audio ref={refAudio} src="JINGLE_CLAIRE_MELANIE.wav" preload="auto" />
        </div>
        {<div style={{ position: 'absolute' }}>
            {categories && categories.map((el, i) =>
                <div id={"subCategory" + i + props.image} style={{ visibility: selected ? 'visible' : 'hidden', position: 'absolute' }}>
                    <div onClick={() => { onClickButtonCategory(el) }} className="menuItem water-wave" style={{ cursor: 'pointer', width: "calc(min(50vw, 30vh)) ", aspectRatio: 1, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', maskPosition: 'center', maskRepeat: 'no-repeat', maskSize: 'contain', maskImage: `url(./Maskblob.png)`, backgroundImage: `url(${el.image})`, backgroundSize: 'cover' }}>
                    </div>
                        <div style={{position: 'absolute', pointerEvents: 'none', fontSize: '20pt', color:'#3AFF47', fontWeight: 'bold', zIndex: 99, left: '50%', top: '50%', textAlign: 'center', textWrap: 'wrap', transform: 'translate(-50%, -50%)', filter: 'drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5))'}}>
                            {el.title}
                        </div>
                </div>
            )}
        </div>}
    </div>
}