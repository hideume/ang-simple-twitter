const express = require('express');
const Twitter = require('twit');

const app = express();
const client = new Twitter({
  consumer_key: process.env.Twitter_CONSUMER_KEY,
  consumer_secret: process.env.Twitter_CONSUMER_SECRET,
  access_token: process.env.Twitter_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.Twitter_ACCESS_TOKEN_SECRET
});

app.use(require('cors')());
app.use(require('body-parser').json());

app.get('/api/user', (req, res) => {
  client
    .get('account/verify_credentials')
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.send(error);
    });
});


app.get('/api/users', (req, res) => {
  const params = { screen_name: req.query.screen_name };
  client
    .get('users/show',params)
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.send(error);
    });
});

app.get('/api/list', (req, res) => {
  const params = { screen_name: req.query.screen_name };
  client
    .get('lists/list',params)
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.send(error);
    });
});



app.get('/api/retweet', (req, res) => {
  const params = {count: 100};
  //console.log("id="+req.query.id)
  client
    .get('statuses/retweets/'+req.query.id,params)
    .then(tres => {
      //console.log(tres);
      res.send(tres);
    })
    .catch(error => {
      //console.log(error);
      res.send(error);
    });
});

app.get('/api/search', (req, res) => {
  const params = {q: req.query.query};
  console.log("q="+req.query.query)
  if(req.query.query.substr(0,3)!='23'){
    client
      .get('search/tweets',params)
      .then(tres => {
        //console.log(tres);
        res.send(tres);
      })
      .catch(error => {
        //console.log(error);
        res.send(error);
      });
  }else{
    wd = req.query.query.substr(2);
    console.log("hashtag/search wd="+wd);
    client
      .get('hashtag/search/'+wd+'?src=hashtag_click')
      .then(tres => {
        //console.log(tres);
        res.send(tres);
      })
      .catch(error => {
        //console.log(error);
        res.send(error);
      });
  }
});
let cache = [];
let cacheAge = 0;

app.get('/api/home', (req, res) => {
  if (Date.now() - cacheAge > 60000) {
    cacheAge = Date.now();
    const params = { tweet_mode: 'extended', count: 200 };
    if (req.query.since) {
      params.since_id = req.query.since;
    }
    client
      .get(`statuses/home_timeline`, params)
      .then(timeline => {
        cache = timeline;
        res.send(timeline);
      })
      .catch(error => res.send(error));
  } else {
    res.send(cache);
  }
});

app.get('/api/userhome', (req, res) => {
    const params = { screen_name: req.query.screen_name };
    //const params = { screen_name: "hawaii_hahaha" };
    client
      .get(`statuses/user_timeline`, params)
      .then(xxx => {
        //console.log(req.screen_name)
        res.send(xxx);
        //console.log("xxx="+xxx);
      })
      .catch(error => {
        res.send(error);
        console.log("erre="+error);
      });
});

app.get('/api/status_show', (req, res) => {
  const params = { id: req.query.id };
  //const params = { screen_name: "hawaii_hahaha" };
  client
    .get(`statuses/show`, params)
    .then(xxx => {
      //console.log("show ok")
      res.send(xxx);
      //console.log("xxx="+xxx);
    })
    .catch(error => {
      res.send(error);
      console.log("erre="+error);
    });
});


app.get('/api/limit',(req,res) => {
    //console.log("call limit");
    const params = { };
    client
    .get('application/rate_limit_status',params)
    .then(data => {
      //console.log("call limit ok");
      //console.log("resource=");
      //console.log(data.data.resources);
      res.send(data)
    })
    .catch(error => res.send(error));  
});

app.get('/api/trends',(req,res) => {
  //console.log("trends call");
  //const params = {id: '23424856'}; //japan
  const params = {id: '1118370'}; //tokyo
  client
  .get('trends/place',params)
  .then(data => {
    res.send(data);
    //console.log("trends out="+data);
  })
  .catch(
    error => {
      res.send(error);
      console.log("trend error="+error);
    }
  );  
});

app.post('/api/favorite/:id', (req, res) => {
  const path = req.body.state ? 'create' : 'destroy';
  client
    .post(`favorites/${path}`, { id: req.params.id })
    .then(tweet => res.send(tweet))
    .catch(error => res.send(error));
});

app.post('/api/retweet/:id', (req, res) => {
  const path = req.body.state ? 'retweet' : 'unretweet';
  client
    .post(`statuses/retweet/${req.params.id}`)
    .then(tweet => res.send(tweet))
    .catch(error => res.send(error));
});

app.get('/api/tweet', (req, res) => {
  const params = { status: req.query.msg };
  //console.log('tweet:'+req.params.msg);
  client
    .post(`statuses/update`,params)
    .then(tweet => {
      //console.log("tweet ok"+req.params.status);
      res.send(tweet)})
    .catch(error => {
      console.log("tweet erre = "+error);
      res.send(error)});
});


app.listen(3000, () => console.log('Server running'));
