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
So the schema-less way increate the overall flexability of our database.

When looking at it like this, the schema-less approach seems way better than using schemas.
But there are some arguments whether fully schema-less is actually a good thing.
Lets look at some examples using mongoDB:

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
todo

##### Non-relational
todo

##### Horizontally Scalable
todo

##### BASE as Consistency Mode
todo


History of the term
"Definition"


#### Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.

Pros


Cons


#### Explain how databases like MongoDB and redis would be classified in the NoSQL world

Document Oriented

Key Value


#### Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB

TODO


#### Explain, using relevant examples, the strategy for querying MongoDB (all CRUD operations)

TODO

#### Demonstrate, using a REST-API, how to perform all CRUD operations on a MongoDB

TODO


#### Explain the benefits from using Mongoose, and provide an example involving all CRUD operations

TODO


#### Explain how redis "fits" into the NoSQL world, and provide an example of how to use it.

Key Value


#### Explain, using a relevant example, a full MEAN application including relevant test cases to test the REST-API (not on the production database)

TODO