import React from 'react';
import {useEffect, useState, useRef} from 'react';

// Import helpers
import {addTypingListener} from '../helpers/typingListener';
import {generateTemplate} from '../helpers/generateTemplate';
import {validateTypedChars} from '../helpers/validateTypedChars';

export default function Words() {
    const [state, setState] = useState({
        listening: false,
        words: ' ',
        template: ' I wonder if this will work',
        templateIndex: 0,
    });

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
                break;
            case 'del':
                if (state.words.length > 0) {
                    setState(prevState => {
                        return {
                            ...prevState,
                            words: prevState.words.slice(0, -1),
                            templateIndex: prevState.templateIndex-1
                        }
                    })
                }
                break;
        }
    }

    useEffect(() => {
        const template = document.querySelector('.words-template');
        if (!state.listening) {
            setState(prevState => {
                return {
                    ...prevState,
                    listening: true,
                }
            });
            generateTemplate(); // Function not written yet
            // Add listener for keyboard strokes,
            // passing in updatewords function that will update state
            addTypingListener(updateWords);
        }
        // Validate typed characters vs template
        validateTypedChars(state.words, state.template, state.templateIndex);
    }, [state.words])
    return (
        <div>
            <p className="words words-typed preserve-whitespace">{state.words}</p>
            <p className="words words-template preserve-whitespace">{state.template}</p>
        </div>
    )
}