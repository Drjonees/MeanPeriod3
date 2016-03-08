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


##### BASE as Consistency Mode
Relational databases uses the ACID consistency mode:


* Atomicity
    A transaction is succesfully commited, or the whole transaction is rolled-back.
    
    
* Consistency
    The consistency property ensures that any transaction will bring the database from one valid state to another.
    For instance, when changing data, it will make sure that the updated data still follows the rules for our database.
    
    
* Isolation
    Transactions won't affect other transactions by changing data that another operation is counting on.
    
    
* Durability
    The durability property ensures that once a transaction has been committed, it will remain so, even in the event of power loss, crashes, or errors.

NoSQL databases uses the BASE consistency mode:

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
    * Scalability
    * Big data
    * Economics
    * Flexable data model

* Cons
    * Maturity - Still very young technology
    * Expertise - Hard to find experts

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

#Resources
http://martinfowler.com/articles/schemaless
http://www.ignoredbydinosaurs.com/2013/05/explaining-non-relational-databases-my-mom
https://www.mongodb.com/nosql-explained
http://www.techrepublic.com/blog/10-things/10-things-you-should-know-about-nosql-databases/
http://www.pc-freak.net/images/horizontal-vs-vertical-scaling-vertical-and-horizontal-scaling-explained-diagram.png
http://js2016.azurewebsites.net/mongoDB/mongo.html