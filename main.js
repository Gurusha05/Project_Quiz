//getting all the consts

const start_btn= document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
var exit_btn= info_box.querySelector(".buttons .quit");
var continue_btn= info_box.querySelector(".buttons .restart");
const quiz_box= document.querySelector(".quiz_box");
const timeCount= quiz_box.querySelector(".timer .timer_sec");
const timeLine= quiz_box.querySelector("header .time_line");

const option_list=document.querySelector(".option_list");

// after clicking start
start_btn.onclick = ()=> {
    info_box.classList.add("activeInfo");
}

//after starting if exit clicked
exit_btn.onclick =()=> {
    info_box.classList.remove("activeInfo");
}

//after clicking continue
continue_btn.onclick =()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);

}

let ques_count=0;
let ques_num=1;
let counter;
let counterLine;
let timeValue = 15;
let widthvalue =0;
let userScore = 0;


//If next button is clicked
const next_btn=quiz_box.querySelector(".next_btn");
const result_box=document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

quit_quiz.onclick = ()=>{
    window.location.reload();
}
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
     ques_count=0;
     ques_num=1;
     timeValue = 15;
     widthvalue =0;
     userScore = 0;
    showQuestions(ques_count);
    queCounter(ques_num);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthvalue);
    next_btn.style.display = "none";
}

next_btn.onclick= ()=>{
    if(ques_count<questions.length - 1){
        ques_count++;
        ques_num++;
        showQuestions(ques_count);
        queCounter(ques_num);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthvalue);
        next_btn.style.display = "none";
    }else{
        console.log("QUESTIONS COMPLETED");
        showResultBox();
    }
}
//getting questions from array

function showQuestions(index){
    const ques_text=document.querySelector(".ques_text");
    let ques_tag= '<span>'+ questions[index].num + "). "+questions[index].question+'</span>';
    let option_tag ='<div class="option">'+ questions[index].options[0]+ '<span></span></div>'
                     +'<div class="option">'+ questions[index].options[1]+ '<span></span></div>'
                     +'<div class="option">'+ questions[index].options[2]+ '<span></span></div>'
                     +'<div class="option">'+ questions[index].options[3]+ '<span></span></div>';
    ques_text.innerHTML=ques_tag;


    option_list.innerHTML=option_tag;
    
    const option=option_list.querySelectorAll(".option");
    for(let i =0 ; i< option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer){
    queCounter(ques_num);
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns= questions[ques_count].answer;
    
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct ");
    }else{
        
        answer.classList.add("incorrect");
        console.log("Anwer is Wrong");
    
    //if answer is incorrect show right correct 
        for(let i =0; i < option_list.children.length; i++){
            if(option_list.children[i].textContent == correctAns){
               option_list.children[i].setAttribute("class", "option correct");
            }
        }
    }

    for(let i =0; i < option_list.children.length ; i++){
        option_list.children[i].classList.add("disabled");
    }

    next_btn.style.display = "block";
    
}

function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if(userScore>3){
        let scoreTag= '<span> You got <p>'+ userScore+'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML=scoreTag;
    }else if(userScore>1){
        let scoreTag= '<span> You got <p>'+ userScore+'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML=scoreTag;
    }else{
        let scoreTag= '<span> You got <p>'+ userScore+'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML=scoreTag;
    }
}








function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 0 ){
            clearInterval(counter);
            timeCount.textContent= "00";

            let correctAns= questions[ques_count].answer;

            for(let i =0; i < option_list.children.length; i++){
                if(option_list.children[i].textContent == correctAns){
                   option_list.children[i].setAttribute("class", "option correct");
                }
            }
            for(let i =0; i < option_list.children.length ; i++){
                option_list.children[i].classList.add("disabled");
            }
        
            next_btn.style.display = "block";
        }

    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time+=1;
        timeLine.style.width= time + "px";
        if(time >549 ){
            clearInterval(counterLine);
            
        }

    }
}


function queCounter(index){
    const bottom_ques_counter =quiz_box.querySelector(".total_ques");
    let totalQuesCountTag = '<span><p>'+ index + '</p> Of <p>'+ questions.length + '</p> Questions </span>';
    bottom_ques_counter.innerHTML=totalQuesCountTag;
}
