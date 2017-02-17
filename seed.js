var mongoose    = require('mongoose'),
    Room  = require('./models/room');
    
function seedDB(){
    //remove rooms
    Room.remove({}, function(err){
       if(err){console.log(err)}
    });
    //add a few Rooms
    var data    = [
            {name: "FootBall",
            status: 'Available',
            users: 0,
            type: 'Games'},
            {name: "Chess",
            status: 'Available',
            users: 0,
            type: 'Games'},
            {name: "Basketball",
            status: 'Available',
            users: 0,
            type: 'Games'},
            {name: "Silent",
            status: 'Available',
            users: 0,
            type: 'Quiet-time'},
            {name: "Shuushii!",
            status: 'Available',
            users: 0,
            type: 'Quiet-time'},
            {name: "Andela",
            status: 'Available',
            users: 0,
            type: 'Meeting'},
             {name: "Bootcamp",
            status: 'Available',
            users: 0,
            type: 'Meeting'},
             {name: "Greetings",
            status: 'Available',
            users: 0,
            type: 'Meeting'},
             {name: "JavaScript",
            status: 'Available',
            users: 0,
            type: 'Learning'},
             {name: "Code",
            status: 'Available',
            users: 0,
            type: 'Collab'},
            {name: "Book",
            status: 'Available',
            users: 0,
            type: 'Learning'},
            {name: "Code",
            status: 'Available',
            users: 0,
            type: 'Working'},
            {name: "Project",
            status: 'Available',
            users: 0,
            type: 'Working'},
        ];
    data.forEach(function(obj, i){
        Room.create( obj, function(err, created){
        if(err){console.log(err)}else{
            console.log('done');
        }
        });
    }); 
}

module.exports = seedDB;