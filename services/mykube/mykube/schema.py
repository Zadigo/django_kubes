import graphene
from graphene import ObjectType

from books.api.graphql.mutations import BookMutation
from books.api.graphql.query import BookQuery


class Query(BookQuery, ObjectType):
    pass

class Mutation(ObjectType):
    create_book = BookMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
