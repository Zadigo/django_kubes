import requests
from asyncio import Queue
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from urllib.parse import quote, urlencode, urljoin


class ConsumerMixin:
    @staticmethod
    def format_message(message_type: str, **kwargs):
        return {'action': message_type, **kwargs}

    @staticmethod
    def parse_message(message: dict[str, str]):
        message_type = message.pop('action')
        return message_type, message

    async def send_error(self, message, error_type='error'):
        await self.send_json({
            'action': error_type,
            'error': message
        })


class GroupMixin(ConsumerMixin):
    diffusion_group_name = 'mycelery'

    async def update_cache(self, content):
        """Do something when a message is sent
        to the endpoints connected to this channel"""


class SchoolEndpoint(GroupMixin, AsyncJsonWebsocketConsumer):
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


class GovernmentEndpoint(GroupMixin, AsyncJsonWebsocketConsumer):
    collected_data = Queue()
    url_params = {
        'limit': 20,
        'offset': 0,
        'select': 'objectid,name,state,website'
    }

    async def _send_request(self, url: str):
        try:
            response = requests.get(url, headers={'user-agent': 'Django/5'})
        except:
            await self.send_error('Error on request')
        else:
            if response.ok:
                return response.json()['results']
            return None

    async def connect(self):
        await self.accept()
        await self.send_json(self.format_message('connection', message='Welcome'))
        await self.channel_layer.group_add(self.diffusion_group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        message_type, content = self.parse_message(content)

        if message_type == 'start_requests':
            url = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/us-colleges-and-universities/records'

            self.url_params['offset'] += 20

            query = urlencode(self.url_params)
            data = await self._send_request(url + f'?{query}')

            self.channel_layer.group_send(self.diffusion_group_name, {
                'type': 'update.cache',
                'results': data or []
            })

            await self.send_json(self.format_message('update', results=data))

    async def disconnect(self, code):
        await self.send_json(self.format_message('disconnection', message='Bye bye!'))
        await self.close(code=1000)
