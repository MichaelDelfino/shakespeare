import React from 'react';
import {useEffect, useState, useRef} from 'react';

// Import helpers
import {addTypingListener} from '../helpers/typingListener';
import {generateTemplate} from '../helpers/generateTemplate';

export default function Words() {
    const [listening, setListening] = useState(false);
    const words = useRef(null);
    const template = useRef(null);

    useEffect(() => {
        if (!listening) {
            setListening(true);
            // Set ref to typed words
            words.current = document.querySelector('.words-typed')
            // Generate template and set ref
            generateTemplate(); // Function not written yet
            template.current = document.querySelector('.words-template')
            // Add listener for keyboard strokes
            // Compare to template in this function?
            addTypingListener(words.current, template.current);        }
    }, [])
    return (
        <div>
            <p className="words words-typed preserve-whitespace"> </p>
            <p className="words words-template preserve-whitespace"> I wonder if this will work</p>
        </div>
    )
}