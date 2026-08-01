import pydantic


class ReceiveMessage(pydantic.BaseModel):
    action: str
    message: str


class SendMessage(pydantic.BaseModel):
    action: str = None
    message: str = None
    data: dict = None


class Todo(pydantic.BaseModel):
    userId: int
    id: int
    title: str
    completed: bool
