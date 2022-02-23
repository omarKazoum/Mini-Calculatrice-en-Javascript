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
/**
 * global variables to keep of the program stats
 */
let nbr1='';
let nbr2='';
let selectedOperation='';
let result='';
let calcInput=document.getElementsByClassName('calc-input')[0];
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
    console.log('stats:\nfirst nbr: '+nbr1+' , second nbr: '+nbr2+' , selectedOperation: '+selectedOperation+' , result: '+result+' , progress: '+progress+'\n');
}
let updateInput=()=>{
    switch(progress) {
        case ProgressEnum.START:
            //the first nbr is clicked on
            calcInput.innerText='0';
            break;
        case ProgressEnum.NUMBER_1_ENTERING:
            //the next number for nbr1 is clicked on
            calcInput.innerText=nbr1;
            break;
        case ProgressEnum.OPERATION_CLICKED:
            calcInput.innerText=nbr1;
            break;
        case ProgressEnum.NUMBER_2_ENTERING:
            calcInput.innerText=nbr2;
            break;
        case ProgressEnum.EQUAL_CLICKED:
            calcInput.innerText=result;
            break;
    }
}
let getResult=()=>{
    return operation(selectedOperation,nbr1,nbr2);
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
            case ProgressEnum.OPERATION_CLICKED:
                progress=ProgressEnum.NUMBER_2_ENTERING;
                nbr2=nbr2.concat(btnInnerText);
                break;
            case ProgressEnum.NUMBER_2_ENTERING:
                nbr2=nbr2.concat(btnInnerText);
                break;
            case ProgressEnum.EQUAL_CLICKED:
                progress=ProgressEnum.NUMBER_1_ENTERING;
                nbr1=btnInnerText;
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
            case ProgressEnum.EQUAL_CLICKED:
                nbr1=getResult();
                result=nbr1;
                nbr2='';
                progress=ProgressEnum.OPERATION_CLICKED;
                selectedOperation=btnInnerText;
                break;
        }

    }else if(e.target.classList.contains('calc-btn--equal')){
        console.log('equal is clicked');
        switch(progress) {
            case ProgressEnum.START:
                //do nothing
                break;
            case ProgressEnum.NUMBER_1_ENTERING:
                //do nothing
                progress=ProgressEnum.OPERATION_CLICKED;
                //do nothing
                break;
            case ProgressEnum.OPERATION_CLICKED:
                //do nothing
                break;
            case ProgressEnum.NUMBER_2_ENTERING:
                // here we should display the result
                progress=ProgressEnum.EQUAL_CLICKED;
                result=operation(selectedOperation,nbr1,nbr2);
                break;
            case ProgressEnum.EQUAL_CLICKED:
                //do nothing
                break;
        }

    }else if(e.target.classList.contains('calc-btn--clear')){
        console.log('clear is clicked');
        //TODO:handle this
    }
    printStat();
    updateInput();
}
for(let btn of document.getElementsByClassName('calc-btn'))
        btn.addEventListener('click',(e)=>{
            btnClicked(e);
        });

printStat();


