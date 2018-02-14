const mongoose = require('mongoose');

const passport = require('passport');

const Activity = mongoose.model('activities');

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = app => {

  app.get('/api/activities',requireAuth, (req, res, next) => {
    console.log(req.user);
    Activity.find({user: req.user}).then(activities => {
      if(!activities){
        return res.send({});
      }
      return res.send(activities);
    })
  })

  app.post('/api/activities', requireAuth, (req, res, next) => {
    const { name, type, date, time} = req.body;

    if ( !name || !type || !date || !time){
      return res.status(409).send({error: 'Missing parameters'})
    }

    const activity = new Activity({name, type, date, time, user:req.user.id});
    
    activity.save().then(() => {
        res.send(activity);
      }).catch(error => {
        return res.status(422).send({error: error._message});
      })
  });

}