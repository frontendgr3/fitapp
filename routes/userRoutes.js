const mongoose = require('mongoose');

const passport = require('passport');

const Activity = mongoose.model('activities');

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = app => {

  /**
   * Zwraca wszystkie aktywności użytkownika
   */
  app.get('/api/activities',requireAuth, (req, res, next) => {
    console.log(req.user);
    Activity.find({user: req.user}).then(activities => {
      if(!activities){
        return res.send({});
      }
      return res.send(activities);
    })
  })

  /**
   * Dodaje aktywność zalogowanego użytkownika
   */
  app.post('/api/activity', requireAuth, (req, res, next) => {
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

  /**
   * Pobiera aktywność zalogowanego użytkownika
   */
  app.get('/api/activity', requireAuth, (req, res, next) => {
    const { id } = req.body;

    if(!id) {
      return res.status(409).send({error: 'Missing id'});
    }

    Activity.findById(id).then(activity => {

      if (!activity) {
        return res.status(404).send({ error: 'Activity not found' })
      }

      if (activity.user != req.user.id) {
        return res.status(403).send({ error: 'Fetch forbidded' })
      }

      return res.status(200).send(activity);

    }).catch(error => {
      return res.status(400).send(error)
    });

  });

  /**
   * Usuwa aktywność zalogowanego użytkownika
   */
  app.delete('/api/activity', requireAuth, (req, res, next) => {
    const { id } = req.body;

    if (!id) {
      return res.status(409).send({error: 'Missing id'});
    }

    Activity.findById(id).then(activity => {

      if (!activity) {
        return res.status(404).send({ error: 'Activity not found' })
      }

      if (activity.user != req.user.id) {
        return res.status(403).send({ error: 'Delete forbidded' })
      }

      return Activity.findByIdAndRemove(id);

    }).then(() => {
      return res.status(204).send();
    }).catch(error => {
      return res.status(400).send()
    });
  });

}