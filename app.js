const express=require('express');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const faker=require('faker');
const axios = require('axios');
const app=express();

app.use(express.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const doctors=[];
for(var i=0;i<5;i++){
    // Function to fetch a random human image from Unsplash
    let image='';
async function getRandomHumanImage() {
    try {
        const response = await axios.get('https://source.unsplash.com/200x200/?person');
        return response.request.res.responseUrl;
    } catch (error) {
        console.error('Error fetching random human image:', error.message);
        return null;
    }
}

// Example usage
getRandomHumanImage().then((imageUrl) => {
    // console.log('Random Human Image URL:', imageUrl);
    const data={
        Name: `Dr. ${faker.name.findName()}`,
        Experience: `${Math.floor(Math.random()*15)} years of experience`,
        Address: faker.address.streetAddress(),
        Fee: `${(Math.floor(Math.random()*4))*100+200} Consultation fee at clinic`,
        doctorImage : imageUrl,
        like: Math.floor(Math.random() * (100 - 80 + 1)) + 80
    }
    doctors.push(data);
});
    // const data={
    //     Name: `Dr. ${faker.name.findName()}`,
    //     Experience: `${Math.floor(Math.random()*15)} years of experience`,
    //     Address: faker.address.streetAddress(),
    //     Fee: `${(Math.floor(Math.random()*4))*100+200} Consultation fee at clinic`,
    //     doctorImage : image
    // }
    // doctors.push(data);
}


app.get('/', (req,res)=>{
// res.send('CareJar Home Page!');
res.render('welcome');
console.log(doctors);
});
app.get('/home', (req,res)=>{
res.render('home');
});
app.get('/dentist', (req,res)=>{
res.render('dentist', {doctors:doctors});
});
app.get('/gynecologist', (req,res)=>{
res.render('gynecologist', {doctors:doctors});
});
app.get('/Pulmonologist', (req,res)=>{
res.render('pulmo', {doctors:doctors});
});
app.get('/cardiologist', (req,res)=>{
res.render('cardio', {doctors:doctors});
});
app.get('/Neurologist', (req,res)=>{
res.render('neuro', {doctors:doctors});
});
app.get('/Dermatologist', (req,res)=>{
res.render('dera', {doctors:doctors});
});
app.get('/success', (req,res)=>{
res.render('success');
});

app.listen(3000, ()=>{
console.log('Server started at 3000');
});