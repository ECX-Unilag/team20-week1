const { json } = require("body-parser");
const cors = require("cors");

module.exports = function(app , db) {
    
    const circularStructureStringify = require('circular-structure-stringify');
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.EMAIL_KEY);

    app.post('/api/admin/dashboard', cors(), (req, res) =>{
       
        if(req.body.username === process.env.Admin && req.body.password === process.env.Password){
            db.collection('data').find({}).toArray((err, allData) => {
                if(err){
                    res.send({'error':'Something went wrong.'})
                }else{
                    if(JSON.parse(circularStructureStringify(allData)).length === 0){
                        res.send({'error':'No data to display.'})
                    }else{
                        res.send({"response":JSON.parse(circularStructureStringify(allData))});
                    }
                   
                }
            })
            
        }else {
            res.send({'error':'Invalid credentials!'});
        }
    }); 
 

    app.post('/api/user/message', cors(), (req, res)=>{
        const msg = {
            to: 'charlesugbana04@gmail.com',
            from: 'developmenthub123@gmail.com',
            subject: req.body.name+ ' ' + '|' + ' '+req.body.subject,
            html: '<p>From: '+req.body.name +'<br>Email: '+req.body.email +'<br>Message:<br>'+req.body.message+ '</p>'
        };
        sgMail.send(msg).then(() => {
            res.send({"success": "Your message was sent successfully"});
        }).catch(error => {
            res.send({"error": "An error occured. Please try agian."});
        })
    })

    app.get('/', (req, res) => {
        res.send({'success': 'Census Management System API designed by Charles Ugbana'})
    })


    app.post('/api/data-upload', cors(), (req, res) => {
        if (req.body.language === 'Yoruba'){``
            var yoruba = 1;
            var igbo = 0;
            var hausa = 0;
        }else if (req.body.language === 'Igbo'){
            var yoruba = 0;
            var igbo = 1;
            var hausa = 0;
        }else if(req.body.language === 'Hausa'){
            var yoruba = 0;
            var igbo = 0;
            var hausa = 1;
        }

        //families: [{ name: req.body.name, number: parseInt(req.body.number)}],

        const data = {state: req.body.state, population:req.body.number, homes: 1, yoruba: yoruba, igbo: igbo, hausa: hausa};
       
       
        db.collection('data').findOne({state: data.state}, (err, item) => {
            if(err){
                res.json({'error':'An error occured. Please try again.'});
            }else{
                if(item !== null){
                   // item.families.forEach(function(family){
                      //  if(family.name === req.body.name && family.number === req.body.number){
                       //     res.json({'error':'Sorry, the family name and size already exists in our database.'})
                       // }else{
                            const update = {state: data.state, population: parseInt(data.population) + parseInt(item.population), homes: item.homes + 1, 
                                yoruba: item.yoruba + data.yoruba, igbo: item.igbo + data.igbo, hausa: item.hausa + data.hausa
                               };
                            db.collection('data').update({state: data.state}, update, {upsert: true}, (err, updatedData)=>{
                                if(err){
                                    console.log(err)
                                    res.json({'error':'An error has occured 0000'}) 
                                }else{
                                    res.json({'success':'Family data upload successful.'})
                                }
                            })
                      //  }
                   // })
                }else{
                    db.collection('data').insert(data, (err, results) =>{
                        if(err){
                            res.json({'error':'An error occured. Please try again.'})
                        }else{
                            res.json({'success':'Family data upload successful. YESS'})
                        }
                    })
                }
            }
        })
        
    })



}