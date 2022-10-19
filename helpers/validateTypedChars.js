export const validateTypedChars = (words, template, index) => {
    if(words[index] === template[index]){
        console.log('correct')
        return true;
    }
    else {
        console.log('incorrect');
        return false;
    }
}