export const addTypingListener = (words, template) => {
    // Keydown to handle backspace
    window.addEventListener("keydown", (e)=>{
        if(words?.textContent.length > 1){
            if(e.key === 'Backspace'){
                words.textContent = words?.textContent?.slice(0,-1);
            }
        }
    })
    // Keypress to type on std alpha keys, eg: not ctrl, tab, esc, etc
    window.addEventListener("keypress", (e)=>{
        if(e.key !== 'Enter'){
            if(words?.textContent){
                words.textContent += e.key;
            }
            // if blank text, set to first key press
            else if (words?.textContent === ''){
                words.textContent = e.key;
            }
        }
    })
}