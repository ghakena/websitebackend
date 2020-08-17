// import all models from server.js

var models = require('./server.js').models;

var toSave = [
  {name: 'irie', email: 'irie@gmail.com'},
  {name: 'irie1', email: 'irie1@gmail.com'},
  {name: 'irie2', email: 'irie2@gmail.com'},
  {name: 'irie3', email: 'irie3@gmail.com'},
  {name: 'irie4', email: 'irie4@gmail.com'},
  {name: 'irie5', email: 'irie5@gmail.com'},
  {name: 'irie6', email: 'irie6@gmail.com'},
  {name: 'irie7', email: 'irie7@gmail.com'},
  {name: 'irie8', email: 'irie8@gmail.com'},
  {name: 'irie9', email: 'irie9@gmail.com'},
  {name: 'irie10', email: 'irie10@gmail.com'},
  {name: 'irie11', email: 'irie11@gmail.com'},
];

// filter(an object) -> where(takes in an object), order, limit, skip, fields.
var filter = {
  where: {
    name: {like: 'Irie'},
  }, // Kind of like the MySQL Where clause.
  order: 'id DESC',
  limit: 10,
  skip: 0, // skips from the first upwards.
  fields: {
    email: true,
  },
};

/*
models.Profile.findOne({where: {name: 'irie7'}}, (err, found) => {
  console.log('Found?', err, found);
});
*/

// you can also use the filter to avoid making direct changes to your query.
// You only need to change the filter.
/*
models.Profile.find(filter, (err, found) => { // find returns an array.
  console.log('Found?', err, found);
});
*/

/*
// filter to find by Id.
// then destroy using found.destroy() method.
models.Profile.findById('5f30b27af1dc5f13a44b4c0f', (err, found) => {
  console.log('Found?', err, found);
  found.destroy();
});

*/

/*
// another way to destroy model instances.
models.Profile.destroyAll(filter.where, (err, found) => {
  console.log('Found? ', err, found);
});
*/

// yet another way to destroy model instances is using destroyById.
models.Profile.destroyById('5f2a863ff606755391b4d3d4', (err, found) => {
  console.log('Found?', err, found);
});

/*
// could also destroy a model's instance using;
models.Profile.findById('5f2a863ff606755391b4d3d4', {include: 'Posts'}, (err, found) => {
  console.log('Found?', err, found);
  found.Posts.destroyAll({date: {lte: new Date('2019-04-02')}});
})
*/

/*
  Example of an include filter.

  include: {
    relation: 'Posts',
    scope: {
      limit: 5,
      order: 'date DESC',
      include: {
        relation: 'Image',
        where: {type: 'thumbnail'},
        limit: 1,
      },
    },

  },
*/

/*
toSave.map(obj => {
  models.Profile.create(obj, (err, created) => {
    console.log('Created?', created);
  });
});
*/

/*
could use create, upsert, findOrCreate to create data
models.Profile.findOrCreate({name: 'Irie Roku'}, (err, profile) => {
  if (err) {
    console.log('There was an error', err);
  } else if (profile) {
    profile.email = 'roku@rokuirie.com';
    profile.save((ue, updated) => {
      console.log('Updated?', updated);
    });
  }
});

else if (profile) section could also take in this.
profile.updateAttributes({
    email: 'irie2@irievibes.com',
  }, (updateError, updated) => {
    console.log('Saved?', updateError, updated);
  });
*/
