const express = require('express');
const questions = require('./questions.json');

const app=express();
const cors= require('cors');

app.use(cors());
app.use(express.json());

app.get('/get-questions', (req,res) =>{
    let onlyQuestions = questions.map(({answerIndex, ...q}) => q);
    res.send(onlyQuestions);
});

app.post('/verify-question', (req,res)=> {
    let questionIndex = req.body.questionIndex;
    let optionIndex= req.body.optionIndex;
    res.send(questions[questionIndex].answerIndex==optionIndex);
})

app.post('/verify-all-questions',(req,res)=>{
    let userAnswers = req.body.userAnswers;
    let score=0;
    userAnswers.forEach(answer =>{
        score += (questions[answer.questionIndex].answerIndex==answer.optionIndex)? 1:0;
    });

    res.send({total: questions.length, score: score});
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});