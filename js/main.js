/**
 * basic functions
 */
function add( a,b){
    return a+b;
}
function minus(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}
function operation(operator,a,b){
    switch(operator){
        case '+':
            return add(a,b);
        case '-':
            return minus(a,b);
        case '/':
            return divide(a,b);
        case 'x':
            return multiply(a,b);
        default:throw "operator '"+operator+"' not supported";
    }

}

document.getElementsByClassName('calc-btn--equal')[0].addEventListener('click',function(e){
    //handle the click on the equal btn
    console.log(operation('+',1,2));
});
/**
 * global variables to keep of the program stats
 */
let nbr1='';
let nbr2='';
let selectedOperation='';
const ProgressEnum={
    START:'start',
    NUMBER_1_ENTERING:'nbr1Entering',
    OPERATION_CLICKED:'operationClicked',
    NUMBER_2_ENTERING:'nbr2Entering',
    EQUAL_CLICKED:'equalClicked'
}
Object.freeze(ProgressEnum);
let progress=ProgressEnum.START;

/**
 * prints the stats so far
 */
let printStat=()=>{
    console.log({stats:{'first nbr':nbr1,'second nbr':nbr2,progress:progress}});
}
/**
 * handels clicks on btns
 * @param e
 */
let btnClicked=(e)=>{
    let btnInnerText=e.target.innerText;
    if(e.target.classList.contains('calc-btn--nbr')){
        console.log(btnInnerText+" clicked has inner text "+btnInnerText);
        switch(progress) {
            case ProgressEnum.START:
                //the first nbr is clicked on
                progress = ProgressEnum.NUMBER_1_ENTERING;
                nbr1=btnInnerText;
            break;
            case ProgressEnum.NUMBER_1_ENTERING:
                //the next number for nbr1 is clicked on
                nbr1=nbr1.concat(btnInnerText);
                console.log('a has:'+nbr1);
            break;
        }

    }else if(e.target.classList.contains('calc-btn--operator')){
        console.log('opeartor '+e.target.innerText+' is clicked');
        switch(progress) {
            case ProgressEnum.START:
                //do nothing
                break;
            case ProgressEnum.NUMBER_1_ENTERING:
                // so we already have at least on number stored in a
                progress=ProgressEnum.OPERATION_CLICKED;
                selectedOperation=btnInnerText;
                break;
            case ProgressEnum.OPERATION_CLICKED:
                selectedOperation=btnInnerText;
                break;
            case ProgressEnum.NUMBER_2_ENTERING:
                break;
            case ProgressEnum.EQUAL_CLICKED:
                break;
        }

    }else if(e.target.classList.contains('calc-btn--equal')){
        console.log('equal is clicked');
    }else if(e.target.classList.contains('calc-btn--clear')){
        console.log('clear is clicked');
    }
    printStat();

}
for(let btn of document.getElementsByClassName('calc-btn'))
        btn.addEventListener('click',(e)=>{
            btnClicked(e);
        });


