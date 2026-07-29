import graphene
from graphene import ObjectType

from books.api.graphql.query import BookQuery


class Query(BookQuery, ObjectType):
    pass

schema = graphene.Schema(query=Query)
