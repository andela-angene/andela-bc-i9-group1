var express         = require('express'),
    bodyParser      = require('body-parser'),
    app             = express(),
    passport        = require('passport'),
    flash           = require('connect-flash'),
    Room            = require('./models/room');
    methodOverride  = require('method-override'),
    LocalStrategy   =require('passport-local'),
    User            = require('./models/user'),
    Middleware      = require('./middleware'),
    mongoose        = require('mongoose'); 
    // seedDB      = require('./seed');

var PORT    = process.env.PORT || 3889,
    IP      = process.env.IP || '127.0.0.1';
    
var authenticationRoutes    = require('./routes/auths');
    
//config
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://tonymontaro:anthonidas12@ds015574.mlab.com:15574/yelp_camp');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(flash());
// seedDB();

//passport config
app.use(require('express-session')({
    secret: 'montaro is a wonderful name',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware* for all routes
app.use(function(req, res, next){
   res.locals.user = req.user;
   res.locals.flashSuccess = req.flash('success');
    res.locals.flashError = req.flash('error');
   return next();
});

//landing page route
app.get('/', function(req, res){
    Room.find({}, function(err, rooms){
        var search = req.query.s;
        var type = req.query.type;
        if(err){
            console.log('error');
        }else{
            if (search) {
                rooms = rooms.filter(function(room){
                return room.name.toLowerCase() == search.toLowerCase();
                });
            }
            if (type) {
                rooms = rooms.filter(function(room){
                return room.type.toLowerCase() == type.toLowerCase();
                });
            }
            res.render('home', {rooms: rooms});
        }
    });
});

//Room Page
app.get('/room/:id', function(req, res){
    Room.findById(req.params.id, function(err, room){
      if(err){
          console.log(err);
          res.redirect('/');
      }else{
          res.render('room', {room: room});
      } 
   });
});

//Check-in or Check-out
app.put('/room/:id', Middleware.isLoggedIn, function(req, res){
    var room = req.body.room;
    room.users = (room.users < 0) ? 0 : room.users;
    if (room.users >= 10){
        room.status = 'Un-Available';
        room.users = 10;
    }else{
        room.status = "Available";
    }
    Room.findByIdAndUpdate(req.params.id, room, function(err, room){
       if(err){console.log(err); return res.redirect('/')}else{
           res.redirect('/room/'+ req.params.id);
       }
    });
});

app.use(authenticationRoutes);

//If invalid address, redirect to signup page
app.all('*', function(req, res) {
  res.redirect("/");
});

app.listen(PORT, IP, function(){
    console.log('Room App started...');
});