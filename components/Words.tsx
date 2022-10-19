import React from 'react';
import {useEffect, useState, useRef} from 'react';

// Import helpers
import {addTypingListener} from '../helpers/typingListener';
import {generateTemplate} from '../helpers/generateTemplate';

export default function Words() {
    const [state, setState] = useState({
        listening: false,
        words: ' ',
        template: ' I wonder if this will work',
    });
    const templateIndex = useRef(0);

    // Function to update state of currently typed words
    const updateWords = (mode, newChar) => {
        switch (mode) {
            case 'add':
                setState(prevState => {
                    return {
                        ...prevState,
                        words: prevState.words + newChar,
                        templateIndex: prevState.templateIndex+1
                    }
                })
                templateIndex.current ++;
                break;
            case 'del':
                // Revert character coloring
                const templateChar = document.getElementById(templateIndex.current.toString());
                if(templateChar){
                    templateChar.style.color = 'rgb(171, 178, 185, 1)';
                }
                if (state.words.length > 0) {
                    setState(prevState => {
                        return {
                            ...prevState,
                            words: prevState.words.slice(0, -1),
                            templateIndex: prevState.templateIndex-1
                        }
                    })
                    templateIndex.current --;
                }
                break;
        }
    }

    const updateTemplate = (template) => {
        setState(prevState => {
            return {
                ...prevState,
                template : template,
            }
        })
    }

    const renderTemplateByChar = (template) => {
        let index = 0;
        const templateDOM = document.querySelector('.words-template');

        for (const char of template) {
            const charSpan = document.createElement('span');
            charSpan.setAttribute('id', index.toString())
            charSpan.textContent = char;
            templateDOM?.appendChild(charSpan);
            index++;
        }
    }

    const validateTypedChars = (words, template, index) => {
        const templateChar = document.getElementById(index.toString());
        if (words[index] === template[index]) {
          if(templateChar){
              templateChar.style.color = 'rgb(0,255,0)';
          }
        } else {
          if(templateChar){
            templateChar.style.color = 'rgb(255,0,0)';
            }
        }
      };  

    useEffect(() => {
        if (!state.listening) {
            setState(prevState => {
                return {
                    ...prevState,
                    listening: true,
                }
            });
            // Generate words for template from some API
            // generateTemplate(updateTemplate); 

            // Render template to screen as a span per char for coloring
            renderTemplateByChar(state.template);

            // Add listener for keyboard strokes,
            // passing in updatewords function that will update state
            addTypingListener(updateWords);
        }
        // Validate typed characters vs template
        validateTypedChars(state.words, state.template, templateIndex.current);
    }, [state.words])
    return (
        <div>
            <div className="words words-typed preserve-whitespace"><p>{state.words}</p></div>
            <div className="words words-template preserve-whitespace"></div>
        </div>
    )
}