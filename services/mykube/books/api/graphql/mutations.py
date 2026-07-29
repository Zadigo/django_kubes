import graphene

from books.api.graphql.query_types import BookType
from books.models import Book
from graphql import GraphQLResolveInfo


class BookMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)

    book = graphene.Field(BookType)

    def mutate(root, info: GraphQLResolveInfo, title: str):
        book = Book(title=title)
        book.save()
        return BookMutation(book=book)
