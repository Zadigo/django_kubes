
import pydantic
from mcp_server import ModelQueryToolset

from books.models import Book


class CreateBookModel(pydantic.BaseModel):
    title: str = pydantic.Field(..., json_schema_extra={})


class BookQueryTool(ModelQueryToolset):
    model = Book
    search_fields = ('title',)

    def get_queryset(self):
        qs = super().get_queryset()
        return qs
