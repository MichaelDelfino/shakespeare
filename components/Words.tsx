import React from 'react';
import {useEffect, useState} from 'react';
export default function Words() {
    const [listening, setListening] = useState(false);
    useEffect(()=>{
        if(!listening){
            setListening(true);
            const words = document.querySelector('.words');
            // Keydown to handle backspace
            window.addEventListener("keydown", (e)=>{                  
                if(words?.textContent){
                    if(e.key === 'Backspace'){
                        words.textContent = words?.textContent?.slice(0,-1);   
                    }
                } 
            })
            // Keypress to type on std alpha keys, eg: not ctrl, tab, esc, etc
            window.addEventListener("keypress", (e)=>{   
                if(words?.textContent){
                    words.textContent += e.key;
                }
                // if blank text, set to first key press
                else if (words?.textContent === ''){
                    words.textContent = e.key;
                }     
            })
        }
    },[])
    return (
        <div>
            <p className="words preserve-whitespace">.</p>
        </div>
    )
}