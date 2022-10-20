import React from 'react';
import {useEffect, useState, useRef} from 'react';

// Import helpers
import {addTypingListener} from '../helpers/typingListener';

// API service imports to pull words
import { getPoetry } from '../services/poetry.api';

// TODO - Move cursor to be based on template, not typed letters.
//        This way the spacing will never be messed up.

export default function Words() {
    const [state, setState] = useState({
        listening: false,
        typedWords: ' ',
        template: ' ',
    });
    const templateIndex = useRef(-1);
    const words = useRef(' ');

    // Function to update state of currently typed words
    const updateWords = (mode, newChar) => {
        switch (mode) {
            case 'add':
                setState(prevState => {
                    return {
                        ...prevState,
                        typedWords: prevState.typedWords + newChar,
                        templateIndex: prevState.templateIndex+1
                    }
                })
                words.current += newChar
                templateIndex.current ++;
                break;
            case 'del':
                // Revert character coloring
                const templateChar = document.getElementById(templateIndex.current.toString());
                if(templateChar){
                    templateChar.style.color = 'rgb(171, 178, 185, 1)';
                }
                if (words.current.length > 1) {
                    setState(prevState => {
                        return {
                            ...prevState,
                            typedWords: prevState.typedWords.slice(0, -1),
                            templateIndex: prevState.templateIndex-1
                        }
                    })
                    words.current = words.current.slice(0, -1);
                    templateIndex.current--;
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
        const templateDOM = document.querySelector('.words-template');
        for (const line of template){
            const linePoetry = document.createElement('div');
            let index = 0;
            for (const char of line) {
                const charSpan = document.createElement('span');
                charSpan.setAttribute('id', index.toString())
                charSpan.textContent = char;
                linePoetry?.appendChild(charSpan);
                index++;
            }
            templateDOM?.appendChild(linePoetry);
        }
    }

    const validateTypedChars = (words, template, index) => {
        const templateChar = document.getElementById(index);
        console.log(words[index], template[index], console.log(index))
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

    const generateTemplate = (response) => {
        setState(prevState => {
            return {
                ...prevState,
                template: ' ' + response.lines.join(),
            }
        });
        renderTemplateByChar(response.lines);
      };

    useEffect(() => {
        if (!state.listening) {
            setState(prevState => {
                return {
                    ...prevState,
                    listening: true,
                }
                // Generate words for template from some API
            });
            const randomNum = Math.floor(Math.random() * 154);
            getPoetry(randomNum, generateTemplate);

            // Add listener for keyboard strokes,
            // passing in updatewords function that will update state
            addTypingListener(updateWords);
        }

        // Validate typed characters vs template
        validateTypedChars(words.current, state.template, templateIndex.current);
    }, [state.typedWords])
    
    return (
        <div className='poetry-container'>
            <div className="words "><p className="words-typed preserve-whitespace">{state.typedWords}</p></div>
            <div className="words-template"><p className="words-template preserve-whitespace"></p></div>
        </div>
    )
}