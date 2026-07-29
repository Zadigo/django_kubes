import graphene

from books.api.graphql.query_types import BookType
from books.models import Book
from graphql import GraphQLResolveInfo


class BookQuery(graphene.ObjectType):
    books = graphene.List(BookType)

    def resolve_books(root, info: GraphQLResolveInfo):
        return Book.objects.all()
