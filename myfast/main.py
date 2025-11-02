from fastapi import FastAPI, HTTPException
from typing import Any, Union
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str


ITEMS = []


@app.get('/')
async def get_items() -> dict[str, str | bool | list[Item]]:
    return {'results': ITEMS}


@app.post('/create')
async def create_item(item: Item, response_model=Item) -> Item:
    ITEMS.append(item)
    return item


@app.get('/items/{item_id}')
async def get_item(item_id: int, response_model=Item) -> Item:
    if item_id < 0 or item_id >= len(ITEMS):
        raise HTTPException(status_code=404, detail="Item not found")
    return ITEMS[item_id]
