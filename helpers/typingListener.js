export const addTypingListener = (updateWords) => {
    // Keydown to handle backspace
    window.addEventListener("keydown", (e) => {
        if (e.key === 'Backspace') {
            updateWords('del', e.key)
        }
    })
    // Keypress to type on std alpha keys, eg: not ctrl, tab, esc, etc
    window.addEventListener("keypress", (e) => {
        if (e.key !== 'Enter') {
            updateWords('add', e.key);
        }
    })
}