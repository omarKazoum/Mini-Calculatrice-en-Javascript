/**
 * basic math functions
 */
function add(a,b){
    a=Number(a);
    b=Number(b);
    return a+b;
}
function minus(a,b){
    a=Number(a);
    b=Number(b);
    return a-b;
}
function multiply(a,b){
    a=Number(a);
    b=Number(b);
    return a*b;
}
function divide(a,b){
    a=Number(a);
    b=Number(b);
    if(b===0) {
        throw 'divide by 0 not allowed !';
    }
    return a/b;
}
function operation(operator,a,b){
    switch(operator){
        case '+':
            return add(a,b);
        case '-':
            return minus(a,b);
        case '/':
            try{
            return divide(a,b);
            }catch (e){ throw e;};
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
let activeOperation=document.getElementsByClassName('active-operation')[0];
//reflects the states of execution flow
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
 * (for debugging purposes)
 * prints the stats so far
 */
let printStat=()=>{
    console.log('stats:\nfirst nbr: '+nbr1+' , second nbr: '+nbr2+' , selectedOperation: '+selectedOperation+' , result: '+result+' , progress: '+progress+'\n');
}
/**
 * updates the ui to reflect stored information
 */
let updateInput=()=>{
    switch(progress) {
        case ProgressEnum.START:
            //the first nbr is clicked on
            calcInput.innerText='0';
            nbr1='';
            nbr2='';
            result='';
            selectedOperation='';
            activeOperation.innerText=' ';
            break;
        case ProgressEnum.NUMBER_1_ENTERING:
            //the next number for nbr1 is clicked on
            calcInput.innerText=nbr1;
            selectedOperation='';
            activeOperation.innerText=' ';
            break;
        case ProgressEnum.OPERATION_CLICKED:
            calcInput.innerText=nbr1;
            activeOperation.innerText=selectedOperation;
            break;
        case ProgressEnum.NUMBER_2_ENTERING:
            calcInput.innerText=nbr2;
            activeOperation.innerText=selectedOperation;
            break;
        case ProgressEnum.EQUAL_CLICKED:
            calcInput.innerText=result;
            activeOperation.innerText="=";
            break;
    }
}
/**
 * handles clicks on all btns
 */
let btnClicked=(e)=>{
    let btnInnerText=e.target.innerText;
    if(e.target.classList.contains('calc-btn--nbr')){
        console.log(btnInnerText+" clicked has inner text "+btnInnerText);
        switch(progress) {

            case ProgressEnum.NUMBER_1_ENTERING:
                //the next number for nbr1 is clicked on

                if(! (btnInnerText=="0")) {
                    if(nbr2=="0")
                        nbr2='';
                    nbr1 = nbr1.concat(btnInnerText);
                }
                console.log('a has:'+nbr1);
                break;
            case ProgressEnum.START:
                //the first nbr is clicked on
                progress = ProgressEnum.NUMBER_1_ENTERING;
                nbr1=btnInnerText;
                break;
            case ProgressEnum.OPERATION_CLICKED:
                progress=ProgressEnum.NUMBER_2_ENTERING;
                nbr2=btnInnerText;
                break;
            case ProgressEnum.NUMBER_2_ENTERING:
                if(!(btnInnerText=="0")) {
                    if(nbr2=="0")
                        nbr2='';
                    nbr2=nbr2.concat(btnInnerText);
                }
                break;
            case ProgressEnum.EQUAL_CLICKED:
                progress=ProgressEnum.NUMBER_1_ENTERING;
                nbr1=btnInnerText;
                break;
        }
    }else if(e.target.classList.contains('calc-btn--operator')){
        console.log('opeartor '+e.target.innerText+' is clicked');
        switch(progress) {
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
                try{
                    progress=ProgressEnum.OPERATION_CLICKED;
                    nbr1=operation(selectedOperation,nbr1,nbr2);
                    result='';
                    nbr2='';
                    selectedOperation=btnInnerText;
                }catch (e){
                    // so we have an arithmetic error
                    alert(e);
                }
                break;
        }
    }else if(e.target.classList.contains('calc-btn--equal')){
        console.log('equal is clicked');
        switch(progress) {
            case ProgressEnum.NUMBER_2_ENTERING:
                // here we should display the result
                progress=ProgressEnum.EQUAL_CLICKED;
                try {
                    result =operation(selectedOperation,nbr1,nbr2);
                }catch (e){
                    progress=ProgressEnum.OPERATION_CLICKED;
                    alert(e);
                }
                break;
        }

    }else if(e.target.classList.contains('calc-btn--clear')){
        console.log('clear is clicked');
        progress=ProgressEnum.START;
        nbr1='';
        nbr2='';
        selectedOperation='';
    }else if(e.target.classList.contains('calc-btn--operator-dot')){
        console.log("dot clicked");
        switch(progress) {
            case ProgressEnum.START:
            case ProgressEnum.EQUAL_CLICKED:
                progress = ProgressEnum.NUMBER_1_ENTERING;
                nbr1 = '0' + btnInnerText;
                break;
            case ProgressEnum.NUMBER_1_ENTERING:
                //the next number for nbr1 is clicked on
                if(!nbr1.includes('.'))
                    nbr1=nbr1.concat(btnInnerText);
                break;
            case ProgressEnum.OPERATION_CLICKED:
                progress = ProgressEnum.NUMBER_2_ENTERING;
                nbr2 = '0' + btnInnerText;
                break;
            case ProgressEnum.NUMBER_2_ENTERING:
                if(!nbr2.includes('.'))
                    nbr2=nbr2.concat(btnInnerText);
                break;
        }
    }
    printStat();
    updateInput();
}
for(let btn of document.getElementsByClassName('calc-btn'))
    btn.addEventListener('click',(e)=>{
        btnClicked(e);
    });

//printStat();


