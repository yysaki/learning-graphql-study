const { GraphQLScalarType } = require(`graphql`)

module.exports = {
  Photo: {
    id: parent => parent.id || parent._id,
    url: parent => `/img/photos/${parent._id}.jpg`,
    postedBy: (parent, args, { db }) =>
      db.collection(`users`).findOne({ githubLogin: parent.userID })
  },
  User: {
    postedPhotos: parent => {
      return photos.filter(p => p.githubUser === parent.githubUser)
    }
  },
  DateTime: new GraphQLScalarType({
    name: `DateTime`,
    description: `A valid date time value`,
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.value
  })
}
