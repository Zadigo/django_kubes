from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.layers import channel_layers
import requests


class ConsumerMixin:
    def format_message(self, message_type: str, **kwargs):
        return {'action': message_type, **kwargs}

    def parse_message(self, message: dict[str, str]):
        message_type = message.pop('action')
        return message_type, message


class GroupMixin:
    diffusion_group_name = 'mycelery'

    async def update_cache(self, content):
        """Do something when a message is sent
        to the endpoints connected to this channel"""


class SchoolEndpoint(ConsumerMixin, GroupMixin, AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send_json(self.format_message('connection', message='Welcome'))
        await self.channel_layer.group_add(self.diffusion_group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        message_type, content = self.parse_message(content)

        if message_type == 'read_data':
            pass

    async def disconnect(self, code):
        await self.send_json(self.format_message('disconnection', message='Bye bye!'))
        await self.close(code=1000)

    async def update_cache(self, content):
        await self.send_json(self.format_message('update', results=content))


class GovernmentEndpoint(ConsumerMixin, GroupMixin, AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send_json(self.format_message('connection', message='Welcome'))
        await self.channel_layer.group_add(self.diffusion_group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        message_type, content = self.parse_message(content)

        if message_type == 'start_requests':
            self.channel_layer.group_send(self.diffusion_group_name, {
                'type': 'update.cache',
            })

    async def disconnect(self, code):
        await self.send_json(self.format_message('disconnection', message='Bye bye!'))
        await self.close(code=1000)
