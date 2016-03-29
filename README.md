# MeanPeriod3


#### Explain, generally, what is meant by a NoSQL database.

There is no clear definition of what NoSQL is. Often NoSQL databases are:
* Schema-less
* Open source
* Non-relational
* Horizontally scalable
* BASE as consistency mode.

Let's dive into that:

##### Schema-less
In order to understand schema-less we have to understand how the relational database uses schemas.
In a relational database, we have tables that have predefined columns. 
We can for instance have a column with a 'firstname', and we tell the database that this column can only contain text.
Or we can have a date of birth column where the database knowns that only Date objects can fit into.

So with relational databases, we define a schmea for the data we put in, so we have a structured layer for all the data.
If we try to insert some data that doesn't fit the structure we have defined, we will simply get an error.
The schema way of structuring your data, can both be good and bad. 
If we have data that has very consistent structure and fits well with the relational database, it's no problem, but as soon as we want to change the structure of the data, it often leeds to downtime or annoying complications. 

This is where the schema-less databases comes in.
By not defining what kind of data needs to be in our database, we are alot more free to choose what data to store.
We can for example have a person where we only have the firstname stored, but also store another person with both firstname, lastname, date of birth without any problems.
If we later on want to add extra information to our persons, this can easily be achieved, by simply adding the data to the person.
So the schema-less way increase the overall flexability of our database.

When looking at it like this, the schema-less approach seems way better than using schemas.
But there are some arguments whether fully schema-less is actually a good thing.
Lets look at an example using mongoDB:

We have a database filled with addresses, some of them are like this: 

{'firstname': 'Jonas', 'lastname': 'Bjoern', '**zip**': '2860'}

and some like this:

{'firstname': 'Lars', 'lastname': 'Mortensen', '**zipcode**': '2860'}

This is perfectly legal to do in our database, but gives us some problems when we want to manipulate the data.
Lets say we want to find all persons that live in zipcode 2860:
persons.find({'zip': '2860'})
This would however only give us 'Jonas', because 'Lars' doesn't have a field called "zip", but instead it's called "zipcode".

So even though we're using a schema-less database, we still need to have an implicit schema, so we all know that a person should have a zipcode and not zip (or vise verca).

One could argue that by using a schema-less database, we're not actually schema-less, we have just moved the schema logic from the database to the application layer.

In node.js we would do this by using the mongoose module, where the schemas are used.


##### Open Source
Open source means that the source code is publicly avaiable, and that everyone can add or change its original design. The changes can be used locally or requested to be part of the original code. So it often ends up with a collaborative product, where multiple programmers have been a part of the final product.


##### Non-relational
Let's look at how a relational database works by using an example:
We have a blog where we write about stuff.
Of course we need to persist all the blog posts we make, so we have a relational database with a 'Post' table, where we store our posts.
It could look like this:

|Post_ID|Author|Post_body   |
|:------|------|:-----------|
| 1     | Jonas| Post text..|
| 2     | Jonas| Post text..|
| 3     | Jonas| Post text..|

Later in our development of the blog, we decide that we want to implement comments from the readers.
So we make a table in our database to store these comments:


|Comment_ID |FKPost_ID |User  |Comment_Body  |
|:----------|:---------|:-----|:-------------|
| 1         |2         | Lars | Comment text.|
| 2         |2         | Jensa| Comment text.|
| 3         |3         | Bob  | Comment text.|

Notice that we now have a column called "FKPost_ID", which holds the foreign key to the post table. So we know which comment belongs to which post.
In order to get for instance post 2, with all it's comments we have to do joins:
```sql
SELECT * FROM Post P JOIN Comment C ON P.Post_ID = C.FKPost_ID WHERE P.Post_ID = 2;
```
It seems like getting something so related as a post and its comments, is a bit too complicated. 

And this is where non-relational helps us.
Instead of dividing something like a post and a comment into two seperate things, we can simply store them together!
```javascript
{
    'author': 'Jonas', 
    'body': 'Post text...', 
    'comments': [{'user':'Jensa',
                'comment':'Comment text..'},
                {'user':'Lars',
                'comment':'Great job'}]
}
```
Now we have our posts and comments stored together, which often would make more sense.


##### Horizontally Scalable
This picture shows it very well:
![Horizontally Scaling vs Vertical Scaling](http://www.pc-freak.net/images/horizontal-vs-vertical-scaling-vertical-and-horizontal-scaling-explained-diagram.png)

So noSQL databases are often easy to scale OUT instead of scaling UP.


##### BASE as Consistency Model
Relational databases uses the ACID consistency model:


* Atomicity
    A transaction is succesfully commited, or the whole transaction is rolled-back.
    
    
* Consistency
    The consistency property ensures that any transaction will bring the database from one valid state to another.
    For instance, when changing data, it will make sure that the updated data still follows the rules for our database.
    
    
* Isolation
    Transactions won't affect other transactions by changing data that another operation is counting on.
    
    
* Durability
    The durability property ensures that once a transaction has been committed, it will remain so, even in the event of power loss, crashes, or errors.

NoSQL databases uses the BASE consistency model:

* Basic Availability
    The database guarantee availability
    
    
* Soft-state
    The state of the system may change over time, even without input. This is because of the eventual consistency model.
    
    
* Eventual consistency
    After a certain time all nodes are consistent, but at any given time this might not be the case.
    
###### The CAP Theorem
* Consistency
    All the servers in the system will have the same data so anyone using the system will get the same copy regardless of which server answers their request. 
    
    
* Availability
    The system will always respond to a request (even if it's not the latest data or consistent across the system or just a message saying the system isn't working).
    
    
* Partition Tolerance
    The system continues to operate as a whole even if individual servers fail or can't be reached.


The CAP theorem states:
It's theoretically impossible to have all 3 requirements met, so a combination of 2 must be chosen and this is usually the deciding factor in what technology is used.

Relational prioritize Consistency and Partition Tolerance.
NoSQL prioritize Availability and Partition Tolerance.

![CAP Theorem](http://js2016.azurewebsites.net/mongoDB/images/cap.PNG)

## 
## 

#### Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.

Most of this is answered in the previous question.
So i will only summarize:

* Pros
    * Scalability - Easy to have clusters of databases.
    * Big data - Easier to store big data.
    * Economics - Often cheaper than relational databases.
    * Flexable data model - Schema-less model provides more flexable data models.

* Cons
    * Maturity - Still very young technology
    * Expertise - Hard to find experts

#### Explain how databases like MongoDB and redis would be classified in the NoSQL world

NoSQL databases are often classified by which data model they use.

There are 4 primary categories:

##### Document Oriented
In a document oriented database, the data is stored in documents.
These documents typically use a structure like JSON.
Compared to relational databases, documents provides an intuitive and natual way to model data.
It's closer to the OO programming, because each document is effectively an object.
Instead of spreading data across multiple tables and columns, that are connecting through foreign keys, each record and its associated data are stored together in a single document.
Documents contains fields, that each contains a value(string,date,binary,array).
In a document database, the notion of a schema is dynamic: each document can contain different fields. This flexibility can be particularly helpful for modeling unstructured and polymorphic data. It also makes it easier to evolve an application during development, such as adding new fields. 

Used in:
* MongoDB
* CouchDB

![Document Oriented](http://scraping.pro/res/nosql/document_database.png)

##### Key-Value
Key-Value is the simplest form of database. The data is stored and retrieved by a key. 
It can be thought off as a hashmap, but instead of laying in server memory, it's persistet.

Used in:
* Redis
* Riak

![Key-Value](http://scraping.pro/res/nosql/keyvalue_database.png)

##### Graph Model
Graph databases, uses a graph like structure with nodes, edges and properties to represent data. The data is modeled as a network of replationships between different elements. It can be hard to understand how and when to use Graph model, but for relation dependent data it can be great to model the relationships between entities in an application.

Used in:
* Neo4j
* Infinite Graph

![Graph Model](http://scraping.pro/res/nosql/graph_database.png)

##### Wide Column Models
Wide Column databases has some similarity to relational databases in its use of rows, columns and tables. The important difference is that columns are created for each row rather than being predefined by the table structure. It can sometimes be helpful to think of them as a key-value collection where each value in the collection is either a simple data type or another key-value collection.

Used in:
* Cassandra
* HBase

![Wide Column Model](http://scraping.pro/res/nosql/column_database.png)

MongoDB belongs to the Document Oriented, and Redis belongs to te Key-Value.


#### Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB

One of the first things you'll hear about MongoDB is that it's schema-less!

In order to understand schema-less we have to understand how the relational database uses schemas.
In a relational database, we have tables that have predefined columns. 
We can for instance have a column with a 'firstname', and we tell the database that this column can only contain text.
Or we can have a date of birth column where the database knowns that only Date objects can fit into.

So with relational databases, we define a schmea for the data we put in, so we have a structured layer for all the data.
If we try to insert some data that doesn't fit the structure we have defined, we will simply get an error.
The schema way of structuring your data, can both be good and bad. 
If we have data that has very consistent structure and fits well with the relational database, it's no problem, but as soon as we want to change the structure of the data, it often leeds to downtime or annoying complications. 

This is where the schema-less databases comes in.
By not defining what kind of data needs to be in our database, we are alot more free to choose what data to store.
We can for example have a person where we only have the firstname stored, but also store another person with both firstname, lastname, date of birth without any problems.
If we later on want to add extra information to our persons, this can easily be achieved, by simply adding the data to the person.
So the schema-less way increase the overall flexability of our database.

When looking at it like this, the schema-less approach seems way better than using schemas.
But there are some arguments whether fully schema-less is actually a good thing.
Lets look at an example using mongoDB:

We have a database filled with addresses, some of them are like this: 

{'firstname': 'Jonas', 'lastname': 'Bjoern', '**zip**': '2860'}

and some like this:

{'firstname': 'Lars', 'lastname': 'Mortensen', '**zipcode**': '2860'}

This is perfectly legal to do in our database, but gives us some problems when we want to manipulate the data.
Lets say we want to find all persons that live in zipcode 2860:
persons.find({'zip': '2860'})
This would however only give us 'Jonas', because 'Lars' doesn't have a field called "zip", but instead it's called "zipcode".

So even though we're using a schema-less database, we still need to have an implicit schema, so we all know that a person should have a zipcode and not zip (or vise verca). One could argue that by using a schema-less database, we're not actually schema-less, we have just moved the schema logic from the database to the application layer. In node.js we would do this by using the mongoose module.

Mongoose is an Object Document Mapper(ODM) for MongoDB. It's the layer in between our data and our database, and gives us a schema-based way to model our data, and validating the data before putting it in our database.


#### Explain, using relevant examples, the strategy for querying MongoDB (all CRUD operations)

When dealing with a database, you would often like to use the singleton pattern for the connections. This will ensure that you reuse the same connection to the database instead of creating a new for every operation. 

In order to save the precious resource, we have a db module that will have a singleton of the connection:

```javascript
var MongoClient = require('mongodb').MongoClient
var connection;
var connect = function (url, done) {
    if (connection) return done()

    MongoClient.connect(url, function (err, db) {
        if (err) {
            return done(err);
        }
        connection = db;
        console.log("DB connection ready");
        done();
    })
}
var get = function () {
    return connection;
}
var close = function (done) {
    if (connection) {
        connection.close(function (err, result) {
            connection = null;
            done(err)
        })
    }
}
module.exports.connect = connect;
module.exports.get = get;
module.exports.close = close;
```

So we can call the connect, and it will either make a new connection or return the existing one. 
Now we need a model where we use our connection. For this example we'll have a simple joke model, that will store jokes and allow CRUD operations on the jokes.

First we need to require the connection that we just made, and the ObjectID from the BSON module. 
```javascript
var connect = require("../db/db");
var ObjectId = require('mongodb').ObjectID;
```

Now we can use the connect module that we made to create a new joke:
We'll create a function that takes in the new joke object, and a callback as parameter.
The function will call the connect.get method to get the connection, and call 'collection("jokes")' on the connection.
This will give us the "jokes" collection of our database. On this collection, we call 'insert', which takes in the new joke object and a function. The function will callback with either an error or data.
We then check if an error was returned or if data was returned, and call the callback function with the result.

```javascript
function _addJoke(jokeToAdd, callback) {
    var db = connect.get();
    db.collection("jokes").insert(jokeToAdd, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}
```

The rest of the CRUD operation pretty much follows the same structure, but calls another function on the collection object.
This is the function for getting all jokes in our database:
```javascript
function _allJokes(callback) {
    var db = connect.get();
    db.collection("jokes").find({}).toArray(function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}
```
Instead of the "insert" function, we use the "find" which will return a cursor(A pointer to the result set of our query). On the cursor we call .toArray to get the result as an array and again call the callback function with the returned data.

This is an Update example using Mongodb:
```javascript
function _editJoke(jokeToEdit, callback) {
    var db = connect.get();
    db.collection("jokes").updateOne({
        "_id": new ObjectId(jokeToEdit._id)
    }, {
        $currentDate: {
            lastEdited: true
        },
        $set: {
            joke: jokeToEdit.joke,
            type: jokeToEdit.type
        }
    }, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}
```
For the update, we have to give a few more objects to the "updateOne" method. We give it the id of the joke that we want to update, we also give it an object where we tell it to update the "lastEdited" field and what fields to update.

For the delete we take in the ID of the joke we want to delete:
```javascript
function _deleteJoke(id, callback) {
    var db = connect.get();
    db.collection("jokes").remove({
        "_id": new ObjectId(id)
    }, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    })
}
```

Since we want to use these operations as a module in for instance a REST-API we have to export our functions:
```javascript
exports.allJokes = _allJokes;
exports.addJoke = _addJoke;
exports.editJoke = _editJoke;
exports.deleteJoke = _deleteJoke;
```


#### Demonstrate, using a REST-API, how to perform all CRUD operations on a MongoDB

We can wrap the previous made CRUD operations in a REST-API like this:


We send all api request to our api route object from the app.js file:
```javascript
var api = require('./routes/api');
app.use('/api', api);
```

In our api.js route we require the following modules:
```javascript
var express = require('express');
var router = express.Router();
var jokes = require('../model/jokes');
```

Now can we access the router and send data back and forth between the jokes module that we made in the last question.
We can use the create like this:
```javascript
router.post('/joke', function (req, res, next) {
    jokes.addJoke(req.body, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
```
We will get all HTTP POST request on the '/joke' path and call the jokes.addJoke function.
We wrote the jokes.addJoke so it would take the new joke and a function as parameters. We will get the new joke from the request.body object. The addJoke can both give back and error or the data. So in the callback function we check whether we got an error or data back and send the appropriate data back.

The other CRUD operations follows the same structure:

Read:
```javascript
router.get('/jokes', function (req, res, next) {
    jokes.allJokes(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
```

Update:
```javascript
router.put('/joke', function (req, res, next) {
    jokes.editJoke(req.body, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
```

Delete:
```javascript
router.delete('/joke/:_id', function (req, res, next) {
    jokes.deleteJoke(req.params._id, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
```



#### Explain the benefits from using Mongoose, and provide an example involving all CRUD operations

One of the first things you'll hear about MongoDB is that it's schema-less!

In order to understand schema-less we have to understand how the relational database uses schemas.
In a relational database, we have tables that have predefined columns. 
We can for instance have a column with a 'firstname', and we tell the database that this column can only contain text.
Or we can have a date of birth column where the database knowns that only Date objects can fit into.

So with relational databases, we define a schmea for the data we put in, so we have a structured layer for all the data.
If we try to insert some data that doesn't fit the structure we have defined, we will simply get an error.
The schema way of structuring your data, can both be good and bad. 
If we have data that has very consistent structure and fits well with the relational database, it's no problem, but as soon as we want to change the structure of the data, it often leeds to downtime or annoying complications. 

This is where the schema-less databases comes in.
By not defining what kind of data needs to be in our database, we are alot more free to choose what data to store.
We can for example have a person where we only have the firstname stored, but also store another person with both firstname, lastname, date of birth without any problems.
If we later on want to add extra information to our persons, this can easily be achieved, by simply adding the data to the person.
So the schema-less way increase the overall flexability of our database.

When looking at it like this, the schema-less approach seems way better than using schemas.
But there are some arguments whether fully schema-less is actually a good thing.
Lets look at an example using mongoDB:

We have a database filled with addresses, some of them are like this: 

{'firstname': 'Jonas', 'lastname': 'Bjoern', '**zip**': '2860'}

and some like this:

{'firstname': 'Lars', 'lastname': 'Mortensen', '**zipcode**': '2860'}

This is perfectly legal to do in our database, but gives us some problems when we want to manipulate the data.
Lets say we want to find all persons that live in zipcode 2860:
persons.find({'zip': '2860'})
This would however only give us 'Jonas', because 'Lars' doesn't have a field called "zip", but instead it's called "zipcode".

So even though we're using a schema-less database, we still need to have an implicit schema, so we all know that a person should have a zipcode and not zip (or vise verca). One could argue that by using a schema-less database, we're not actually schema-less, we have just moved the schema logic from the database to the application layer. In node.js we would do this by using the mongoose module.

Mongoose is an Object Document Mapper(ODM) for MongoDB. It's the layer in between our data and our database, and gives us a schema-based way to model our data, and validating the data before putting it in our database.
It consist of 2 core things: Schemas and Models.

A schema is an object that defines the structure of the documents that we want to store in our MongoDB collection. In the schema we can define types and validator for all our data.

A model is an object that gives you access to a collection, allowing you to query the collection and use the Schema to validate any documents you save to that collection. Instances of these models represent documents which can be saved and retrieved from our database.

By using mongoose, we can make the joke REST-API even easier:

In the www file I have:
```javascript
var mongoose = require('mongoose');
mongoose.connect('mongodb://username:password@ds062178.mlab.com:62178/school_db');
```
So now we have a connection to our mongoDB.

Then we have to create our Schema for the jokes collection:
```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JokeSchema = new Schema({
    joke: String,
    type: Array,
    reference: [{
        body: String,
        text: String
    }],
    lastEdited: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Joke', JokeSchema);
```

On the last line, we're actually making the model and exporting that instead of the Schema. Then in the api.js route we can do the following for CRUD operations:

```javascript
var express = require('express');
var router = express.Router();
var Jokes = require('../model/jokesMongoose');

router.get('/jokes', function (req, res, next) {
    Jokes.find({}, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});
```
As you can see, we're now using the find method of our Jokes model.

For creating we do something similar:

```javascript
router.post('/joke', function (req, res, next) {
    Jokes.create(req.body, function (err, joke) {
        if (err) {
            res.send(err);
        } else {
            res.send(joke);
        }
    })
});
```

For delete we do:

```javascript
router.delete('/joke/:_id', function (req, res, next) {
    Jokes.findOneAndRemove({
            _id: req.params._id
        },
        function (err, joke) {
            console.log(req.params._id);
            if (err) {
                res.send(err);
            } else {
                res.send(joke);
            }
        });
});
```

And update:
```javascript

router.put('/joke', function (req, res, next) {
    Jokes.findOne({
        _id: req.body._id
    }, function (err, joke) {

        for (var propertyName in req.body) {
            joke[propertyName] = req.body[propertyName];
        }

        joke.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send(joke);
            }
        })
    });
});
```
The reason is have a for loop, is so i dont have to define which fields to update. Instead it will update all the fields that my req.body(the new joke) has.





#### Explain how redis "fits" into the NoSQL world, and provide an example of how to use it.

NoSQL databases are often classified by which data model they use.
There are 4 primary categories, one of them being 'Key-Value', which redis belongs to.
Key-value stores are probably the simplest form of database management systems. They can only store pairs of keys and values, as well as retrieve values when a key is known.
It's simply put a hashmap that is persistent.

Redis is often used to handle sessions because it's super fast, and makes sessions across multiple node.js servers possible.

This example shows a very simple way of using redis for session.
We start by requiring the express-session and redisstore modules.
Next we adds them as middleware.

```javascript
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

app.use(session({
  store: new RedisStore({
    url: 'redis://redistogo:0e6756160cc4e4eb36304041c1c0c2cd@tarpon.redistogo.com:11986/'
  }),
  secret: "thisismysecret"
}));
```
This silly example will show that the redis database saves our last page.

```javascript
app.get('/route1', function(req, res) {
  console.log(req);
  var tempLastPage = req.session.lastPage;
  req.session.lastPage = "Route 1";
  res.send("You are on route 1, last page: " + tempLastPage);
});
app.get('/route2', function(req, res) {
  var tempLastPage = req.session.lastPage;
  req.session.lastPage = "Route 2";
  res.send("You are on route 2, last page: " + tempLastPage);
});
app.get('/route3', function(req, res) {
  var tempLastPage = req.session.lastPage;
  req.session.lastPage = "Route 3";
  res.send("You are on route 3, last page: " + tempLastPage);
});
```


#### Explain, using a relevant example, a full MEAN application including relevant test cases to test the REST-API (not on the production database)

See 

#Resources
http://martinfowler.com/articles/schemaless

http://www.ignoredbydinosaurs.com/2013/05/explaining-non-relational-databases-my-mom

https://www.mongodb.com/nosql-explained

http://www.techrepublic.com/blog/10-things/10-things-you-should-know-about-nosql-databases/

http://www.pc-freak.net/images/horizontal-vs-vertical-scaling-vertical-and-horizontal-scaling-explained-diagram.png

http://js2016.azurewebsites.net

https://docs.mongodb.org