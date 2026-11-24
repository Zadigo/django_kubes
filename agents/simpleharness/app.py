import json
from typing import Sequence

from openai.types.chat import ChatCompletionMessageParam
import pydantic
from pydantic import Field
import turboenv
from deepseek import DeepSeekAPI
from openai import OpenAI
import pathlib

env = turboenv.TurboEnv()
env.load_envs(".env")

env.conditional("BASE_URL").depends_on(["DEEPSEEK_API_KEY", "OPEN_API_KEY"])

BASE_DIR: pathlib.Path = pathlib.Path(__file__).parent

API_KEY = env.string("DEEPSEEK_API_KEY")
BASE_URL = env.url("BASE_URL", secured=True)


SYSTEM_PROMPT = """
You are a weather expert
"""

client = OpenAI(base_url=BASE_URL, api_key=API_KEY)


def read_file(path: str) -> str:
    fullpath = BASE_DIR / path
    with open(fullpath, mode="r") as f:
        return f.read()


user_input = input("Ask something: ")

messages: Sequence[ChatCompletionMessageParam] = [
    {"role": "system", "content": SYSTEM_PROMPT},
    {"role": "user", "content": user_input},
]

response = client.chat.completions.create(
    model="deepseek-flash",
    messages=messages,
    tools=[
        {
            "type": "function",
            "function": {
                "name": "read_file",
                "description": "Allows you to read files",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "path": {
                            "type": "string",
                            "description": "The file path to read",
                        }
                    },
                    "required": ["path"],
                },
            },
        }
    ],
)

output = response.choices[0].message

if output.tool_calls:
    messages.append(output)

    for tool_call in output.tool_calls:
        if tool_call.function.name == "read_file":
            func_args: dict = json.loads(tool_call.function.arguments)
            file_content = read_file(func_args["path"])

            messages.append(
                {
                    "role": "tool",
                    "content": file_content,
                    "name": "read_file",
                    "tool_call_id": tool_call.id,
                }
            )

    final_output = client.chat.completions.create(
        model="deepseek-flash", messages=messages
    )
    print(final_output)
else:
    print(output)
