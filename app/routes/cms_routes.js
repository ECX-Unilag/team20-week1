const { json } = require("body-parser");
const cors = require("cors");

module.exports = function(app , db) {
    
    const circularStructureStringify = require('circular-structure-stringify');
    app.post('/api/admin/dashboard', cors(), (req, res) =>{
        if(req.body.username === 'administrator' && req.body.password === 'team-20'){
            db.collection('data').find({}).toArray((err, allData) => {
                if(err){
                    res.send({'error':'No data to display.'})
                }else{
                  res.send({"response":circularStructureStringify(allData)}); 
                }
            })
            
        }else {
            res.send({'error':'Invalid credentials!'});
        }
    });
 

    

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

        const data = {state: req.body.state, population:req.body.number, homes: 1, yoruba: yoruba, igbo: igbo, hausa: hausa};
       
       
        db.collection('data').findOne({state: data.state}, (err, item) => {
            if(err){
                res.json({'error':'An error occured. Please try again.'});
            }else{
                if(item !== null){
                    const update = {state: data.state, population: parseInt(data.population) + parseInt(item.population), homes: item.homes + 1, 
                        yoruba: item.yoruba + data.yoruba, igbo: item.igbo + data.igbo, hausa: item.hausa + data.hausa};
                    db.collection('data').update({state: data.state}, update, (err, updatedData)=>{
                        if(err){
                            res.json({'error':'An error has occured 0000'}) 
                        }else{
                            res.json({'success':'Family data upload successful.'})
                        }
                    })

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