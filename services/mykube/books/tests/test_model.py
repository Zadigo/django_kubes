import json

import pytest
from graphene_django.utils.testing import GraphQLTestCase

from books.models import Book


@pytest.mark.django_db
def test_book_model():
    book = Book.objects.create(title="Test Book")
    assert book.title == "Test Book"


class TestGraphqlQuery(GraphQLTestCase):
    GRAPHQL_URL = '/graphql/'
    
    def test_some_query(self):
        response = self.query(
            '''
            query {
                books {
                    id
                    title
                }
            }
            '''
        )

        self.assertNotIn('Not Found', response.content.decode())

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)

        self.assertIn('data', content)
